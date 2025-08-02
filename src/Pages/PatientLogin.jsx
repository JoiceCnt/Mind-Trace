import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Login as Patient</h2>
      {logged ? (
        <p>Login successful. Redirecting...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User"
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
      )}
    </div>
  );
}

export default PatientLogin;
