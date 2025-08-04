import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

function ProfessionalLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Professional login:", user, password);


    navigate("/Professional-Home");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px", position: "relative", padding: "2rem" }}>
      <button className="backButton" onClick={() => navigate("/")} style={{
        position: "fixed",
        top: "250px",
        right: "30px",
        backgroundColor: "transparent", 
        border: "none",
        cursor: "pointer",
        fontSize: "24px",
        color:  "#5C80BC",
      }}
        title="Back"
      >
        <TbArrowBackUp />
      </button>
      <h2>Login as Professional</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default ProfessionalLogin;
