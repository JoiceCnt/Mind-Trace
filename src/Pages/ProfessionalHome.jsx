import "./../Styles/ProfessionalHome.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function ProfessionalHome() {
  const navigate = useNavigate();

  return (
    <div className="professional-container">
      <header className="professional-header">
        <img src={logo} alt="Mind Trace Logo" className="logo" />
      </header>

      <main className="professional-main">
        <h2>Welcome to the Mind Trace professional view.</h2>
        <div className="menu-buttons">
          <button onClick={() => navigate("/ProfessionalCalendar")}>
            Manage your calendar and check your agenda
          </button>
          <button>Check Patient’s History</button>

          <button onClick={() => navigate("/create-patient")}>
            Create a New Patient
          </button>
        </div>
      </main>

      <footer className="professional-footer"></footer>
    </div>
  );
}

export default ProfessionalHome;
