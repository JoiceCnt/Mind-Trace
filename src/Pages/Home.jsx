import { Link } from "react-router-dom";
import MindTraceLogo from "../assets/logo.png";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <img src={MindTraceLogo} alt="MindTrace Logo" width="150" />
      <p>
        <strong>Select the option below to login:</strong>
      </p>

      <Link to="/login/patient">
        <button
          style={{
            backgroundColor: "#A5D6A7",
            padding: "10px 20px",
            margin: "10px",
          }}
        >
          Patient
        </button>
      </Link>

      <br />

      <Link to="/login/professional">
        <button
          style={{
            backgroundColor: "#7986CB",
            padding: "10px 20px",
            margin: "10px",
            color: "white",
          }}
        >
          Professional
        </button>
      </Link>
    </div>
  );
}

export default Home;
