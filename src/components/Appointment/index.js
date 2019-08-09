import React from "react";
import classnames from "classnames";

import "components/Appointment/styles.scss";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const STATUS = "STATUS";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interviewMadeFromChildFormAndToBePassedToParent = {
      student: name,
      interviewer
    };
    transition(STATUS);
    props
      .bookInterview(props.id, interviewMadeFromChildFormAndToBePassedToParent)
      .then(() => transition(SHOW));
  };

  const remove = function(id) {
    props.removeInterview(id).then(() => transition(EMPTY));
  };

  return (
    <article className="appointment">
      <header className="appointment__time">
        <h4 className="text--semi-bold">{props.time}</h4>
        <hr className="appointment__separator" />
      </header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          // student={props.interview.student && props.interview}
          // interviewer={props.interview.interviewer && props.interview.interviewer}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={remove}
          id={props.id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === STATUS && <Status />}
    </article>
  );
}
