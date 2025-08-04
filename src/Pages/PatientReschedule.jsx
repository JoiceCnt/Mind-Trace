import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useNavigate } from "react-router-dom";

function PatientReschedule() {
  const { appointmentId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableHours, setAvailableHours] = useState([]);
  const navigate = useNavigate();

  const formattedDate = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/appointments?date=${formattedDate}¬status=available`
      )
      .then((res) => {
        const available = res.data.map((appt) => appt.time);
        setAvailableHours(available);
      })
      .catch((err) => {
        console.error("Erro ao buscar horários disponíveis:", err);
      });
  }, [formattedDate]);

  const handleReschedule = async (time) => {
    try {
      // Atualiza o agendamento com nova data/hora
      await axios.patch(`http://localhost:5005/appointments/${appointmentId}`, {
        date: formattedDate,
        time: time,
      });
      alert("Appointment rescheduled successfully.");
      navigate("/appointments");
    } catch (error) {
      console.error("Error rescheduling:", error);
    }
  };

  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        justifyContent: "center",
        minHeight: "25vh",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h3
        style={{
          fontSize: "25px",
          marginBottom: "10px",
          color: "#333",
          textAlign: "center",
        }}
      >
        Reschedule Appointment
      </h3>
      <h2
        style={{
          fontSize: "20px",
          marginBottom: "30px",
          color: "#333",
          textAlign: "center",
          border: "2px solid rgb(224,224,224)",
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "white",
          width: "50%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <em>Select a new date:</em>
      </h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        style={{
          transform: "scale(2.0)",
          transformOrigin: "top center",
        }}
      />
      <h2
        style={{
          fontSize: "20px",
          marginBottom: "30px",
          color: "#333",
          textAlign: "center",
        }}
      >
        <em>Available Hours on {formattedDate}</em>
      </h2>
      {availableHours.length === 0 ? (
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            color: "red",
            textAlign: "center",
          }}
        >
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
