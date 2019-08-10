import React from "react";
import classnames from "classnames";

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList({interviewers, value, setInterviewer, onChange}) {
  const interviewList = interviewers.map(eachInterviewer => <InterviewerListItem {...eachInterviewer}
    // selected={eachInterviewer.id === interviewer}
    // setInterviewer={() => setInterviewer(interviewers.id)}
    key={eachInterviewer.id}
    selected={eachInterviewer.id === value}
    onChange={event => onChange(eachInterviewer.id)}
  />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewList}</ul>
    </section>
  )
}