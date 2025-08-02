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
      .get(`http://localhost:5005/appointments?date=${formattedDate}`)
      .then((res) => {
        // Mostrar apenas horários não ocupados
        const bookedHours = res.data.map((appt) => appt.time);
        const allHours = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
        const freeHours = allHours.filter(
          (hour) => !bookedHours.includes(hour)
        );
        setAvailableHours(freeHours);
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
      navigate("/PatientAppointments");
    } catch (error) {
      console.error("Error rescheduling:", error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Reschedule Appointment</h2>
      <p>Select a new date:</p>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h3 style={{ marginTop: "30px" }}>Available Hours on {formattedDate}</h3>
      {availableHours.length === 0 ? (
        <p>No hours available</p>
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
