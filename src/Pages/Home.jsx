import { Link } from "react-router-dom";
import MindTraceLogo from "../assets/logo.png";

function Home() {
  const baseButtonStyle = {
    width: "450px",
    padding: "16px",
    margin: "10px 0",
    fontSize: "24px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const patientStyle = {
    ...baseButtonStyle,
    backgroundColor: "#A8D5BA",
    color: "#262626ff",
  };

  const professionalStyle = {
    ...baseButtonStyle,
    backgroundColor: "#5C80BC",
    color: "white",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <img
        src={MindTraceLogo}
        alt="MindTrace Logo"
        style={{
          width: "300px",
          marginBottom: "50px",
          borderRadius: "12px",
        }}
      />

      <p style={{ fontSize: "30px", marginBottom: "40px", marginTop: "10px", color: "#5C80BC" }}>
        <strong>Select the option below to login:</strong>
      </p>

      <Link to="/login/patient">
        <button
          style={patientStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#91caa5";
            e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#A8D5BA";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          Patient
        </button>
      </Link>

      <Link to="/login/professional">
        <button
          style={professionalStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4a6ba3";
            e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#5C80BC";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          }}
        >
          Professional
        </button>
      </Link>
    </div>
  );
}

export default Home;
