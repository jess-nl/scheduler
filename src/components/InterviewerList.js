import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

/* Displays a list of interviews */

export default function InterviewerList({ interviewers, value, onChange }) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  const interviewList = interviewers.map(eachInterviewer => (
    <InterviewerListItem
      {...eachInterviewer}
      key={eachInterviewer.id}
      selected={eachInterviewer.id === value}
      onChange={() => onChange(eachInterviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewList}</ul>
    </section>
  );
}
