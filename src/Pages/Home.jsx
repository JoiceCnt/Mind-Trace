import { Link } from "react-router-dom";
import MindTraceLogo from "../assets/logo.png";

function Home() {
  const baseButtonStyle = {
    width: "250px",
    padding: "8px 10px",
    margin: "8px 0",
    fontSize: "16px",
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
    <div className="home-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "40vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        paddingTop: "20px"
      }}
    >
      <img
        src={MindTraceLogo}
        alt="MindTrace Logo"
        style={{
          width: "240px",
          marginBottom: "30px",
          borderRadius: "12px",
        }}
      />

      <p style={{ fontSize: "24px", marginBottom: "30px", marginTop: "10px", color: "#5C80BC" }}>
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
