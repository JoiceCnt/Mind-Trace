import { useEffect, useState } from "react";
import axios from "axios";

function ProfessionalCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [startOffset, setStartOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    note: "",
  });

  const hours = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const formatDate = (date) => date.toISOString().split("T")[0];

  const getMonday = (startOffset = 0) => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
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
    return formatDate(d);
  });
  console.log("Day calculated as Monday", monday);
  console.log("Days generated for the schedule header:", days);
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
      console.error("Error to load data:", error);
    }
  };

  const getPatientName = (patientId) => {
    const found = patients.find((p) => p.id == patientId);
    return found ? found.name : "—";
  };

  const handleCellClick = (date, time) => {
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

  return (
    <div style={{ padding: "1rem", textAlign: "center", marginBottom: "4rem" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          marginTop: "1rem",
          fontSize: "35px",
        }}
      >
        Agenda
      </h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setStartOffset(startOffset - 7)}>
          ⏮ Last Week
        </button>
        <button onClick={() => setStartOffset(0)} style={{ margin: "0 3rem" }}>
          Today
        </button>
        <button onClick={() => setStartOffset(startOffset + 7)}>
          ⏭ Next Week
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "50rem",
            margin: "0 auto",
            marginBottom: "2rem",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  background: "#f0f0f0",
                }}
              >
                Hour
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    background: "#f0f0f0",
                  }}
                >
                  {new Date(day).toLocaleDateString("en-EN", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "8px",
                    border: "1px solid #ccc",
                  }}
                >
                  {hour}
                </td>
                {days.map((day) => {
                  const slot = appointments.find(
                    (a) => a.date === day && a.time === hour
                  );
                  const isBooked = slot && slot.status === "booked";

                  return (
                    <td
                      key={`${day}-${hour}`}
                      onClick={() => handleCellClick(day, hour)}
                      style={{
                        padding: "3px",
                        border: "1px solid #ccc",
                        backgroundColor: isBooked
                          ? "#ffd6d6"
                          : slot
                          ? "#eaffea"
                          : "#f9f9f9",
                        textAlign: "center",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        minHeight: "30px",
                        height: "30px",
                        verticalAlign: "middle",
                      }}
                      title="Click to edit"
                    >
                      {slot ? (
                        isBooked ? (
                          <>
                            🔒
                            <br />
                            <strong>{getPatientName(slot.patientId)}</strong>
                          </>
                        ) : (
                          "✅ Livre"
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
      </div>

      {selectedSlot && (
        <div
          style={{
            border: "1px solid #ccc",
            background: "#f9f9f9",
            width: "100%",
          }}
        >
          <h3 style={{ marginTop: "1rem", fontSize: "20px" }}>
            Edit Appointment
          </h3>
          <p>
            <strong>Date:</strong> {selectedSlot.date}
            <br />
            <strong>Hour:</strong> {selectedSlot.time}
          </p>
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
          <br />
          <br />
          <label>Note:</label>
          <br />
          <textarea
            rows="3"
            style={{ width: "60%", borderRadius: "3px" }}
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          ></textarea>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={handleSave}
              style={{
                minWidth: "120px",
                padding: "8px 16px",
                marginRight: "10px",
                marginBottom: "1rem",
                borderRadius: "3px",
                borderColor: "#cac4c4ff",
              }}
            >
              💾 Save
            </button>{" "}
            {selectedSlot.id && (
              <button
                onClick={handleDelete}
                style={{
                  minWidth: "120px",
                  padding: "8px 16px",
                  marginRight: "10px",
                  marginBottom: "1rem",
                  borderRadius: "3px",
                  borderColor: "#cac4c4ff",
                }}
              >
                🗑️ Delete
              </button>
            )}{" "}
            <button
              onClick={() => setSelectedSlot(null)}
              style={{
                minWidth: "120px",
                padding: "8px 16px",
                marginRight: "10px",
                marginBottom: "1rem",
                borderRadius: "3px",
                borderColor: "#cac4c4ff",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfessionalCalendar;
