import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useNavigate } from "react-router-dom";

// Função utilitária para formatar a data no formato "YYYY-MM-DD"
function formatLocalDate(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function PatientReschedule() {
  const { appointmentId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableHours, setAvailableHours] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const navigate = useNavigate();

  // Carrega a consulta atual
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_JSONSERVER_URL}/appointments/${appointmentId}`
      )
      .then((res) => {
        setCurrentAppointment(res.data);
        if (res.data.date) {
          const parts = res.data.date.split("-");
          const localDate = new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
          );
          setSelectedDate(localDate);
        }
      })
      .catch((err) => {
        console.error("Error fetching current appointment:", err);
      });
  }, [appointmentId]);

  // Atualiza as horas disponíveis quando a data mudar
  useEffect(() => {
    if (!currentAppointment) return;
    const formattedDate = formatLocalDate(selectedDate);

    axios
      .get(
        `${
          import.meta.env.VITE_JSONSERVER_URL
        }/appointments?date=${formattedDate}`
      )
      .then((res) => {
        // Considera apenas horários marcados como "available"
        const available = res.data
          .filter((appt) => appt.status === "available")
          .map((appt) => appt.time);

        // Garante que o horário atual esteja disponível para não sumir da lista
        if (
          formattedDate === currentAppointment.date &&
          !available.includes(currentAppointment.time)
        ) {
          available.push(currentAppointment.time);
        }

        available.sort(); // ordena os horários
        setAvailableHours(available);
      })
      .catch((err) => {
        console.error("Error fetching available hours:", err);
      });
  }, [selectedDate, currentAppointment]);

  const handleReschedule = async (time) => {
    try {
      const formattedDate = formatLocalDate(selectedDate);
      await axios.patch(
        `${import.meta.env.VITE_JSONSERVER_URL}/appointments/${appointmentId}`,
        {
          date: formattedDate,
          time,
        }
      );
      alert("Appointment rescheduled successfully.");
      navigate("/appointments");
    } catch (error) {
      console.error("Error rescheduling:", error);
      alert("Failed to reschedule.");
    }
  };

  const displayDate = formatLocalDate(selectedDate);

  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        justifyContent: "center",
        minHeight: "25vh",
        flexDirection: "column",
        backgroundColor: "#F9F9F9",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <h3
        style={{ fontSize: "25px", marginBottom: "10px", textAlign: "center" }}
      >
        Reschedule Appointment
      </h3>

      <h2
        style={{
          fontSize: "20px",
          marginBottom: "30px",
          textAlign: "center",
          padding: "10px 20px",
        }}
      >
        <em>Select a new date:</em>
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      <h2
        style={{ fontSize: "20px", marginBottom: "20px", textAlign: "center" }}
      >
        <em>Available Hours on {displayDate}</em>
      </h2>

      {availableHours.length === 0 ? (
        <h2 style={{ color: "red", textAlign: "center" }}>
          No hours available
        </h2>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {availableHours.map((hour) => (
            <button
              key={hour}
              onClick={() => handleReschedule(hour)}
              style={{
                padding: "10px 15px",
                backgroundColor: "#5E7EBE",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {hour}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientReschedule;
