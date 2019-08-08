import React from "react";
import classnames from "classnames";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import { useVisualMode } from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <header className="appointment__time">
        <h4 className="text--semi-bold">{props.time}</h4>
        <hr className="appointment__separator" />
      </header>

      {mode === EMPTY && <Empty />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
    </article>
  );
}
