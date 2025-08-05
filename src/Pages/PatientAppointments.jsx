import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/PatientAppointments.css";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    if (!patientId) return;

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.JSONSERVER_URL}/appointments`
        );

        console.log("ALL APPOINTMENTS:", response.data);
        console.log("PATIENT LOGGED ID:", patientId);

        const filteredAppointments = response.data.filter(
          (appt) =>
            appt.status === "booked" &&
            String(appt.patientId) === String(patientId)
        );

        console.log("Patient Appointments:", filteredAppointments);
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error findng appointments:", error);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const now = new Date();

  return (
    <div
      className="appointments-container"
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
      <h2 className="appointments-title">Appointments</h2>

      {appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {appointments.map((appt) => {
            const appointmentDateTime = new Date(`${appt.date}T${appt.time}`);
            const isFuture = appointmentDateTime > now;
            const isPending = appt.status === "booked" && isFuture;
            const rowClass = `appointment-item ${
              isPending ? "pending" : "done"
            }`;

            return (
              <div key={appt.id} className={rowClass}>
                <div>{isPending ? "Pending" : "Done"}</div>
                <div>
                  {appt.date} – {appt.time}
                </div>
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
