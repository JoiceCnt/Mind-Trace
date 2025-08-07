import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/ProfessionalCalendar.css";

function formatLocalDate(d) {
  const date = d instanceof Date ? d : new Date(d);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function ProfessionalCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [startOffset, setStartOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ patientId: "", note: "" });

  const hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const getMonday = (startOffset = 0) => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const base = new Date(now);
    base.setDate(now.getDate() + diff + startOffset);
    base.setHours(0, 0, 0, 0);
    return base;
  };

  const monday = getMonday(startOffset);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday.getTime());
    d.setDate(d.getDate() + i);
    return formatLocalDate(d);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [apptRes, patientRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_JSONSERVER_URL}/appointments`),
        axios.get(`${import.meta.env.VITE_JSONSERVER_URL}/patients`),
      ]);
      setAppointments(apptRes.data);
      setPatients(patientRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const getPatientName = (patientId) => {
    const found = patients.find((p) => p.id == patientId);
    return found ? found.name : "—";
  };

  const handleCellClick = (date, time) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDateTime < now.setHours(0, 0, 0, 0)) return;

    const existing = appointments.find(
      (a) => a.date === date && a.time === time
    );

    setSelectedSlot(existing ? { ...existing } : { date, time });
    setFormData({
      patientId: existing?.patientId || "",
      note: existing?.note || "",
    });
  };

  const handleSave = async () => {
    if (!selectedSlot) return;
    const slot = {
      date: selectedSlot.date,
      time: selectedSlot.time,
      status: formData.patientId ? "booked" : "available",
      patientId: formData.patientId || null,
      note: formData.note,
    };

    try {
      if (selectedSlot.id) {
        await axios.put(
          `${import.meta.env.VITE_JSONSERVER_URL}/appointments/${
            selectedSlot.id
          }`,
          { ...slot, id: selectedSlot.id }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_JSONSERVER_URL}/appointments`,
          slot
        );
      }
      setSelectedSlot(null);
      setFormData({ patientId: "", note: "" });
      fetchData();
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      let appointmentId = selectedSlot.id;
      if (!appointmentId) {
        const found = appointments.find(
          (a) =>
            a.date === selectedSlot.date &&
            a.time === selectedSlot.time &&
            a.patientId === selectedSlot.patientId
        );
        appointmentId = found?.id;
      }
      if (appointmentId) {
        await axios.delete(
          `${import.meta.env.VITE_JSONSERVER_URL}/appointments/${appointmentId}`
        );
        alert("Appointment deleted successfully.");
      }
      setSelectedSlot(null);
      setFormData({ patientId: "", note: "" });
      fetchData();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Error deleting appointment.");
    }
  };
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" }); // ex: "Monday"
  };
  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Agenda</h2>

      <div className="button-group">
        <button
          onClick={() => setStartOffset(startOffset - 7)}
          className="calendar-button"
        >
          ⏮ Last Week
        </button>
        <button onClick={() => setStartOffset(0)} className="calendar-button">
          Today
        </button>
        <button
          onClick={() => setStartOffset(startOffset + 7)}
          className="calendar-button"
        >
          ⏭ Next Week
        </button>
      </div>

      <div className="calendar-table-wrapper">
        <table className="calendar-table">
          <thead>
            <tr>
              <th></th>
              {days.map((day) => (
                <th key={day}>{getDayName(day)}</th>
              ))}
            </tr>
            <tr>
              <th>Hour</th>
              {days.map((day) => (
                <th key={`date-${day}`}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="hour-cell">{hour}</td>
                {days.map((day) => {
                  const slot = appointments.find(
                    (a) => a.date === day && a.time === hour
                  );
                  const isBooked = slot && slot.status === "booked";
                  return (
                    <td
                      key={`${day}-${hour}`}
                      onClick={() => handleCellClick(day, hour)}
                      className={
                        isBooked
                          ? "booked-slot"
                          : slot
                          ? "available-slot"
                          : "empty-slot"
                      }
                      title="Click to edit"
                    >
                      {slot ? (
                        isBooked ? (
                          <>
                            <br />
                            <strong>{getPatientName(slot.patientId)}</strong>
                          </>
                        ) : (
                          " Available"
                        )
                      ) : (
                        "—"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedSlot && (
          <div className="edit-container">
            <h3>Edit Appointment</h3>
            <p>
              <strong>Date:</strong> {selectedSlot.date}
              <br />
              <strong>Time:</strong> {selectedSlot.time}
            </p>

            <div className="form-group">
              <label>Patient:</label>
              <select
                value={formData.patientId}
                onChange={(e) =>
                  setFormData({ ...formData, patientId: e.target.value })
                }
              >
                <option value="">-- Available --</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Note:</label>
              <textarea
                rows="3"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>

            <div className="edit-button-group">
              <button onClick={handleSave} className="calendar-button">
                💾 Save
              </button>
              {selectedSlot.id && (
                <button onClick={handleDelete} className="calendar-button">
                  🗑️ Delete
                </button>
              )}
              <button
                onClick={() => setSelectedSlot(null)}
                className="calendar-button"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfessionalCalendar;
