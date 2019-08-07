import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList({days, day, setDay}) {
  const dayList = days.map(eachDay => <DayListItem {...eachDay} setDay={setDay} selected={eachDay.name === day} />);

  return (
    <ul>{dayList}</ul>
  )
}