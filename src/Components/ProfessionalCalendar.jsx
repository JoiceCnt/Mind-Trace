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
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + startOffset + i);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [apptRes, patientRes] = await Promise.all([
        axios.get("http://localhost:5005/appointments"),
        axios.get("http://localhost:5005/patients"),
      ]);
      setAppointments(apptRes.data);
      setPatients(patientRes.data);
      console.log(patientRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const getPatientName = (patientId) => {
    const found = patients.find((p) => p.id === patientId);
    return found ? found.name : "—";
  };

  const handleCellClick = (date, time) => {
    console.log(date, time);
    const existing = appointments.find(
      (a) => a.date === date && a.time === time
    );
    setSelectedSlot({ date, time, ...existing });
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
          `http://localhost:3001/appointments/${selectedSlot.id}`,
          {
            ...slot,
            id: selectedSlot.id,
          }
        );
      } else {
        await axios.post("http://localhost:5005/appointments", slot);
      }
      setSelectedSlot(null);
      setFormData({ patientId: "", note: "" });
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedSlot.id) {
        await axios.delete(
          `http://localhost:5005/appointments/${selectedSlot.id}`
        );
      }
      setSelectedSlot(null);
      setFormData({ patientId: "", note: "" });
      fetchData();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Agenda do Profissional</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setStartOffset(startOffset - 5)}>
          ⏮ Last Week
        </button>
        <button onClick={() => setStartOffset(0)} style={{ margin: "0 1rem" }}>
          Today
        </button>
        <button onClick={() => setStartOffset(startOffset + 5)}>
          ⏭ Next Week
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                background: "#f0f0f0",
              }}
            >
              Hora
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
                {new Date(day).toLocaleDateString()}
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
                      padding: "8px",
                      border: "1px solid #ccc",
                      backgroundColor: isBooked
                        ? "#ffd6d6"
                        : slot
                        ? "#eaffea"
                        : "#f9f9f9",
                      textAlign: "center",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                    }}
                    title="Clique para editar"
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

      {selectedSlot && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #ccc",
            background: "#f9f9f9",
            maxWidth: "400px",
          }}
        >
          <h3>Editar agendamento</h3>
          <p>
            <strong>Date:</strong> {selectedSlot.date}
            <br />
            <strong>Hours:</strong> {selectedSlot.time}
          </p>
          <label>Patiente:</label>
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
            style={{ width: "100%" }}
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          ></textarea>
          <br />
          <br />
          <button onClick={handleSave}>💾 Salvar</button>{" "}
          {selectedSlot.id && (
            <button onClick={handleDelete}>🗑️ Excluir</button>
          )}{" "}
          <button onClick={() => setSelectedSlot(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default ProfessionalCalendar;
