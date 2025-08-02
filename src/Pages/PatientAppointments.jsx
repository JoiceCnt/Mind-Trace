import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/PatientAppointments.css";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const patientId = localStorage.getItem("patientId");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!patientId) return;

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/appointments?patientId=${patientId}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">Appointments</h2>

      {appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {appointments.map((appt) => {
            const isFuture = appt.date >= today;
            const isPending = appt.status === "booked" && isFuture;
            const rowClass = `appointment-item ${
              isPending ? "pending" : "done"
            }`;

            return (
              <div key={appt.id} className={rowClass}>
                <div>{isPending ? "Pending" : "Done"}</div>
                <div>{appt.date}</div>
                <div>Professional’s name</div>
                <div>
                  {isPending ? (
                    <button
                      onClick={() => navigate(`/reschedule/${appt.id}`)}
                      className="icon-button"
                      title="Edit"
                    >
                      ✏️
                    </button>
                  ) : (
                    <span className="icon-check">✔️</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PatientAppointments;
