import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient login:", user, password);
    setLogged(true);

    setTimeout(() => {
      navigate("/calendar"); // definir a que página vamos a redireccionar el usuario
    }, 1000);
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
