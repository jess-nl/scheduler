import React, { useEffect, useReducer } from "react";
import axios from "axios";

export function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = function(state, action) {
    const {
      day,
      days,
      appointments,
      interviewers,
      id,
      interview,
      dayFromForm
    } = action;

    switch (action.type) {
      case SET_DAY:
        return { ...state, day };
      case SET_APPLICATION_DATA:
        return { ...state, days, appointments, interviewers };
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: (interview && { ...interview }) || null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = state.days.map(dayObj => {
          if (dayObj.name === dayFromForm && interview) {
            return { ...dayObj, spots: dayObj.spots - 1 };
          } else if (dayObj.name === dayFromForm && action.interview === null) {
            return { ...dayObj, spots: dayObj.spots + 1 };
          } else {
            return { ...dayObj };
          }
        });

        return { ...state, appointments, days };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: null
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers")
    ])
      .then(result => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: result[0].data,
          appointments: result[1].data,
          interviewers: result[2].data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const bookInterview = function(id, interview, dayFromForm) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview, dayFromForm });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeInterview = (id, dayFromForm) => {
    return axios.delete(`/api/appointments/${id}`).then(res => {
      dispatch({ type: SET_INTERVIEW, id, interview: null, dayFromForm });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    removeInterview
  };
}
