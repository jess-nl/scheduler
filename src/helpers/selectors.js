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