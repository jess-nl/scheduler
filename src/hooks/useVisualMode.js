import { useState } from "react";

/* useVisualMode function tracks the history to create, edit or cancel an interview */

export function useVisualMode(param) {
  const [mode, setMode] = useState(param);
  const [history, setHistory] = useState([param]);

  const transition = (change, replace) => {
    if (replace) {
      setMode(change);
    } else {
      setHistory(prev => [...prev, change]);
      setMode(change);
    }
  };

  /* An issue throughout the process: Originally wrote 'history.length - 1'. However, based on how my Appointment & Application component files are made, I had to replace it with 'history.length - 2' to get the back functionality work. */

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);

      setMode(history[history.length - 2]);
    }
  };

  return { mode, transition, back };
}
