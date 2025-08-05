import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, useNavigate } from "react-router-dom";

function formatLocalDate(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function PatientReschedule() {
  const { appointmentId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableHours, setAvailableHours] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:5005/appointments/${appointmentId}`)
      .then((res) => {
       setCurrentAppointment(res.data);
       // Construir date local para evitar desfase de zona horaria
        const parts = res.data.date.split("-");
        const localDate = new Date(
          Number(parts[0]),
          Number(parts[1]) - 1,
          Number(parts[2])
        );
        setSelectedDate(localDate);
      })
      .catch((err) => {
       console.error("Error fetching current appointment:", err);
     });  
  }, [appointmentId]);


  useEffect(() => {
    if (!currentAppointment) return;

     const formattedDate = formatLocalDate(selectedDate); 

    axios
      .get(`http://localhost:5005/appointments?date=${formattedDate}`)
      .then((res) => {
        const occupied = res.data.filter(
        (appt) =>
          appt.id !== currentAppointment.id && appt.status === "booked"
      );

      const occupiedTimes = occupied.map((appt) => appt.time);

      const TIME_SLOTS = [
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

      let available = TIME_SLOTS.filter(
        (slot) => !occupiedTimes.includes(slot)
      );

      const appointmentDateFormatted = formatLocalDate(
          currentAppointment.date);

      if (
        appointmentDateFormatted === formattedDate && 
        !available.includes(currentAppointment.time)
      ) {
         available.push(currentAppointment.time);
        available.sort(); // orden opcional
      }

        setAvailableHours(available);
      })
      .catch((err) => {
        console.error("Erro ao buscar horários disponíveis:", err);
      });
  }, [selectedDate, currentAppointment]);

 

  const handleReschedule = async (time) => {
  try {
    const formattedDate = formatLocalDate(selectedDate);
    
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

const displayDate = formatLocalDate(selectedDate);

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
        tileDisabled={({ date }) => isWeekend(date)}
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
        <em>Available Hours on {displayDate}</em>
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
