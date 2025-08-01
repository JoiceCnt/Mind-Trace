import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfessionalLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Professional login:", user, password);
    setLogged(true);

    setTimeout(() => {
      navigate("/ProfessionalCalendar");
     }, 1000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Login as Professional</h2>
      {logged ? (
        <p>Login completed successfully.</p>
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

export default ProfessionalLogin;
