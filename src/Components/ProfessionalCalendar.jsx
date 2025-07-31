import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import axios from "axios";

function ProfessionalCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");

  const formattedDate = selectedDate.toISOString().split("T")[0];

  // load daily events
  useEffect(() => {
    axios
      .get(`http://localhost:5005/events?date=${formattedDate}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, [selectedDate, formattedDate]);

  const handleAdd = () => {
    if (newEvent.trim() === "") return;

    const event = {
      id: crypto.randomUUID(),
      date: formattedDate,
      description: newEvent,
    };

    axios
      .post("http://localhost:5005/events", event)
      .then(() => {
        setEvents((prev) => [...prev, event]);
        setNewEvent("");
      })
      .catch((err) => console.error("Erro ao adicionar evento:", err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5005/events/${id}`)
      .then(() => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
      })
      .catch((err) => console.error("Erro ao deletar evento:", err));
  };
  const handleEdit = (id, updatedText) => {
    axios
      .patch(`http://localhost:5005/events/${id}`, { description: updatedText })
      .then(() => {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === id ? { ...event, description: updatedText } : event
          )
        );
      })
      .catch((err) => console.error("Erro ao editar evento:", err));
  };
  return (
    <div
      style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}
    >
      <h2>Professional Agenda</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <h3>Appointments for {formattedDate}</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              defaultValue={event.title}
              onBlur={(e) => handleEdit(event.id, e.target.value)}
              style={{ padding: "5px", width: "70%" }}
            />
            <button
              onClick={() => handleDelete(event.id)}
              style={{ marginLeft: "10px" }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="New appointment..."
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          style={{ padding: "5px", width: "70%" }}
        />
        <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          ➕
        </button>
      </div>
    </div>
  );
}

export default ProfessionalCalendar;
