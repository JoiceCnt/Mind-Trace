import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

function PatientLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5005/patients?username=${user}&password=${password}`
      );

      const data = await res.json();

      if (data.length > 0) {
        const patient = data[0];

        localStorage.setItem("patientId", patient.id);
        localStorage.setItem("patientName", patient.name);

        setLogged(true);
        setTimeout(() => {
          navigate("/EmotionSelectorPage");
        }, 1000);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      <h2
        style={{
          fontSize: "25px",
          marginBottom: "30px",
          color: "#333",
          textAlign: "center",
        }}
      >
        Login as Patient
      </h2>
      {logged ? (
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "20x",
            color: "#333",
            textAlign: "center",
          }}
        >
          Login successful. Redirecting...
        </h2>
      ) : (
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
            placeholder="User"
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
              backgroundColor: "#a8d5ba",
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
      )}
    </div>
  );
}

export default PatientLogin;
