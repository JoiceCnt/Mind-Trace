import { Link } from "react-router-dom";

function SubmissionConfirmation() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          minHeight: "25vh",
          width: "150%",
          maxWidth: "700px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Message sent successfully ✅</h2>
        <p>
          Thank you for sharing. We’ve received your message, and please
          remember, you are not alone. <br />
          Your therapist will review your message and address it with care
          during your upcoming session.
        </p>

        <Link to="/patient/logs">
          <button
            style={{
              marginTop: "60px",
              padding: "10px 25px",
              backgroundColor: "#a8d5ba",
              border: "none",
              borderRadius: "8px",
              fontSize: "25px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              gap: "12x",
            }}
          >
            View history
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubmissionConfirmation;
