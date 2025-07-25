import { useState } from "react";
import "./index.css";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <div>
        <h2>Calendar</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <p>Daily Secctions {selectedDate.toDateString()}</p>
      </div>
    </>
  );
}

export default App;
