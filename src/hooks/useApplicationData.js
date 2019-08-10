import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, {
  getInterviewersForDay,
  getInterview
} from "helpers/selectors";

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: null
});

const setDay = day => setState({ ...state, day });
const setDays = days => setState({ ...state, days });

const [error, setError] = useState(null);

useEffect(() => {
  Promise.all([
    axios.get("http://localhost:3001/api/days"),
    axios.get("http://localhost:3001/api/appointments"),
    axios.get("http://localhost:3001/api/interviewers")
  ])
    .then(result => {
      setState(prev => ({
        ...prev,
        days: result[0].data,
        appointments: result[1].data,
        interviewers: result[2].data
      }));
    })
    .catch(err => {
      console.log(err);
      setError(`Error, ${err.message}`);
    });
}, []);

const appointments = getAppointmentsForDay(state, state.day);
const interviewers = getInterviewersForDay(state, state.day);

const bookInterview = function(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  console.log("apppointments:", appointments);

  return axios
    .put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState(state => ({
        ...state,
        appointments
      }));
    })
    .catch(err => {
      console.log(err);
      setError(`Error, ${err.message}`);
    });
};

const removeInterview = id => {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    appointment
  };
  return axios.delete(`/api/appointments/${id}`).then(res => {
    setState({
      ...state,
      appointments
    });
  });
};

const schedule = appointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      {...appointment}
      key={appointment.id}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      removeInterview={removeInterview}
    />
  );
});