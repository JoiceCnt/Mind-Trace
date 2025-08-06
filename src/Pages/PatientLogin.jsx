import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

function PatientLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_JSONSERVER_URL}/patients?username=${user}&password=${password}`;
      console.log("URL solicitada:", url);

      const res = await fetch(url);

      // Verificamos si la respuesta es JSON válida
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType || !contentType.includes("application/json")) {
        const text = await res.text(); // Leemos el contenido aunque sea HTML
        console.error("Respuesta inesperada del servidor:", text);
        throw new Error("El servidor respondió con contenido no válido.");
      }

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
        setErrorMsg("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <div
      className="logs-container"
      style={{
        padding: "20px",
        width: "70%",
        margin: "0 auto",
        backgroundColor: "#F9FAFB",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        className="logs-content"
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "40px 60px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <button
          className="backButton"
          onClick={() => navigate("/")}
          style={{
            position: "fixed",
            top: "250px",
            right: "30px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#5C80BC",
          }}
          title="Back"
        >
          <TbArrowBackUp />
        </button>

        <h2
          style={{
            fontSize: "28px",
            marginBottom: "30px",
            color: "#5C80BC",
            textAlign: "center",
          }}
        >
          Login as Patient
        </h2>

        {logged ? (
          <h2
            style={{
              fontSize: "30px",
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
              placeholder="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              style={{
                padding: "12px",
                fontSize: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "70%",
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
                fontSize: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "70%",
                textAlign: "center",
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
                backgroundColor: "#a8d5ba",
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

export default PatientLogin;
