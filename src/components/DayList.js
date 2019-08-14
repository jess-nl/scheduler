import React from "react";
import DayListItem from "components/DayListItem";

/* Displays a list of days in the left-hand sidebar */

export default function DayList(prop) {
  const { days, day, setDay } = prop;

  const dayList = days.map(eachDay => (
    <DayListItem
      {...eachDay}
      setDay={setDay}
      selected={eachDay.name === day}
      key={eachDay.id}
    />
  ));

  return <ul>{dayList}</ul>;
}
