import React from "react";
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { useApplicationData } from "hooks/useApplicationData";
import getAppointmentsForDay, {
  getInterviewersForDay,
  getInterview
} from "helpers/selectors";

/* Application component receives values from the useApplicationData function in hooks/useApplicationData.js (the API/database) and passes them in the list of appointments. */

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    removeInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          removeInterview={removeInterview}
          day={state.day}
        />
      );
    }
  );

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
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
