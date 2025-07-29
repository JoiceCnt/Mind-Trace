import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <p>Daily Sections {selectedDate.toDateString()}</p>
    </div>
  );
}

export default CustomCalendar;
