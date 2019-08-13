import React from "react";
import classnames from "classnames";

import "components/Appointment/styles.scss";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const SAVING = "SAVING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview, props.day)
      .then(() => {
        return transition(SHOW);
      })
      .catch(error => {
        return transition(ERROR_SAVE, true);
      });
  };

  const destroy = function(id, dayFromForm) {
    console.log("dayFromForm DESTROY----------~~~~~!", dayFromForm)
    transition(DELETING, true);
    props
      .removeInterview(id, dayFromForm)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <header className="appointment__time">
        <h4 className="text--semi-bold">{props.time}</h4>
        <hr className="appointment__separator" />
      </header>

      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={destroy}
          id={props.id}
          // onConfirm={() => destroy(props.id)}
          onCancel={() => transition(SHOW)}
          day={props.day}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment."
          onClose={() => transition(CONFIRM)}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          id={props.id}
          day={props.day}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
          day={props.day}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
