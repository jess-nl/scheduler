import React from "react";
import classnames from "classnames";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  return (

    <article className="appointment">

      <header className="appointment__time">
        <h4 className="text--semi-bold">{props.time}</h4>
        <hr className="appointment__separator" />
      </header>

      {props.interview ?
        <Show student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}/>
      :
        <Empty />
      }

    </article>
  )
}