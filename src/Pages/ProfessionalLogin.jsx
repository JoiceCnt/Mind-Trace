import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        justifyContent: "center",
        minHeight: "25vh",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        fontSize: "30px",
        marginBottom: "20x",
        color: "#333",
        textAlign: "center",
      }}
    >
      
      <h2>Login as Professional</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          style={{
            padding: "12px",
            fontSize: "25px ",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "80%",
            textAlign: "center",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "12px",
            fontSize: "25px ",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "80%",
            textAlign: "center",
          }}
        />
        <br />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            backgroundColor: "#5C80BC",
            border: "none",
            borderRadius: "8px",
            fontSize: "30px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            width: "80%",
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default ProfessionalLogin;
