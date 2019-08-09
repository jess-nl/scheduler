import React, { useState } from "react";

export function useVisualMode(param) {
  const [mode, setMode] = useState(param);
  const [history, setHistory] = useState([param]);
  console.log("history-----------~~!:", history)

  const transition = (change, replace) => {
    if (replace) {
      setMode(change);
    } else {
      setHistory(prev => [...prev, change]);
      setMode(change);
    }
  };

  const back = () => {
    if (history.length > 1) {
      // history.pop();
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);

      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
