const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  const {
    day,
    days,
    appointments,
    interviewers,
    id,
    interview,
    dayFromForm
  } = action;

  switch (action.type) {
    case SET_DAY:
      return { ...state, day };
    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview: (interview && { ...interview }) || null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = state.days.map(dayObj => {
        const edit = state.appointments[id].interview;
        if (dayObj.name === dayFromForm && !edit) {
          return { ...dayObj, spots: dayObj.spots - 1 };
        } else if (dayObj.name === dayFromForm && action.interview === null) {
          return { ...dayObj, spots: dayObj.spots + 1 };
        } else {
          return { ...dayObj };
        }
      });

      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };
