import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfessionalLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_JSONSERVER_URL;
      const res = await fetch(`${API_URL}/professionals?username=${user}`);

      const contentType = res.headers.get("content-type");
      if (
        !res.ok ||
        !contentType ||
        !contentType.includes("application/json")
      ) {
        const text = await res.text(); // Leemos el contenido aunque sea HTML
        console.error("Respuesta inesperada del servidor:", text);
        throw new Error("El servidor respondió con contenido no válido.");
      }

      const data = await res.json();

      if (data.length > 0) {
        const professional = data[0];
        localStorage.setItem("professionalId", professional.id);
        localStorage.setItem("professionalName", professional.name);
        setLogged(true);
        setTimeout(() => {
          navigate("/Professional-Home");
        }, 1000);
      } else {
        setErrorMsg("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="logs-container"
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        width: "70%",
        margin: "0 auto",
        maxWidth: "600px",
      }}
    >
      <div
        className="logs-content"
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "40px 60px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#5c80bc",
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          Login as Professional
        </h2>

        {logged ? (
          <h2
            style={{
              fontSize: "20px",
              marginBottom: "20px",
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
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "70%",
                textAlign: "center",
                marginBottom: "10px",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "70%",
                textAlign: "center",
                marginBottom: "10px",
              }}
            />

            {errorMsg && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                padding: "10px 25px",
                backgroundColor: "#5c80bc",
                border: "none",
                borderRadius: "8px",
                fontSize: "20px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                width: "40%",
              }}
            >
              Enter
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfessionalLogin;
