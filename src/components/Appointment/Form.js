import React, { useState } from "react";
import "components/Appointment/styles.scss";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

/* When creating or editing the Form, its field takes an input for student name and passes as a state. It also verifies whether the field is blank or not. */

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const cancel = function() {
    setName("");
    setInterviewer(null);
    props.onCancel();
  };

  const validate = function() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Select an interviewer");
      return;
    }

    setError("");
    props.onSave(name, interviewer, props.day);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
