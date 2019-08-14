import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

/* useApplicationData function creates API requests to access the database; removes interviews (as null) and edits within a database. It also applies the imported reduce function from reducers/application.js to trigger a state change. */

export function useApplicationData() {
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
    return axios.delete(`/api/appointments/${id}`).then(() => {
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
