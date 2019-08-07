import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "3pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "5pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "7pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "9pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }
//     }
//   },
//   { id: 6 }
// ];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: null
  });

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });

  // const setAppointment = appointment => setState({ ...state, appointment });
  // const setAppointments = appointments => setState({ ...state, appointments });

  // const setInterviewer = interviewer => setState({ ...state, interviewer });
  // const setInterviewers = interviewers => setState({ ...state, interviewers });

  const [error, setError] = useState(null);


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/days"),
      axios.get("http://localhost:3001/api/appointments"),
      axios.get("http://localhost:3001/api/interviewers")
    ])
      .then(result => {
        console.log("result:", result);
        // setDays(result[0].data);
        // setAppointments(result[1].data);
        // setInterviewers(result[2].data);
        setState(prev => ({...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data}))
        // setState(prev => ({...prev, days: setDays(result[0].data), appointments: result[1].data}))
        // setState(prev => ({...prev, days: setDays(result[0].data), appointments: setAppointments(result[1].data), interviewers: setInterviewers(result[2].data)}))        // setState(prev => ({...prev, days: setDays(result[0].data)}))
      })
      .catch(err => {
        console.log(err);
        setError(`Error, ${err.message}`);
      });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map((appointment) => (
    <Appointment key={appointment.id} {...appointment} />
  ));

  // const appointmentList =  appointments.map((appointment) => <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />)


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => setDay(day)}
        />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}
