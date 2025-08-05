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
        `${import.meta.env.JSONSERVER_URL}/appointments?date=${formattedDate}`
      )
      .then((res) => {
        const available = res.data.filter(
          (appt) => appt.status === "available"
        );
        const times = available.map((appt) => appt.time);
        setAvailableHours(times);
      })
      .catch((err) => {
        console.error("Error to find available time:", err);
      });
  }, [formattedDate]);

  const handleReschedule = async (time) => {
    try {
      await axios.patch(
        `${import.meta.env.JSONSERVER_URL}/appointments/${appointmentId}`,
        {
          date: formattedDate,
          time: time,
        }
      );
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
          padding: "10px 20px",
          width: "50%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <em>Select a new date:</em>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          transform: "scale(1.3)",
          transformOrigin: "top center",
        }}
      >
        <Calendar onChange={setSelectedDate} value={selectedDate} />
      </div>
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
