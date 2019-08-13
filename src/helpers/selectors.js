export default function getAppointmentsForDay(state, day) {
  const days = state.days;

  let result = [];
  for (const eachDay of days) {
    if (eachDay.name === day) {
      result = eachDay.appointments;
    }
  }
  return result.map(id => state.appointments[id]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  let key = interview.interviewer;
  let bookedInterview = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[key].id,
      name: state.interviewers[key].name,
      avatar: state.interviewers[key].avatar
    }
  };
  return bookedInterview;
}

export function getInterviewersForDay(state, day) {
  const days = state.days;

  let result = [];
  for (const eachDay of days) {
    if (eachDay.name === day) {
      result = eachDay.interviewers;
    }
  }
  const output = result.map(id => state.interviewers[id]);
  return output;
}