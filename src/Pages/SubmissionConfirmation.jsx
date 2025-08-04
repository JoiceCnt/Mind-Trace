import { Link } from "react-router-dom";

function SubmissionConfirmation() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px", fontSize: "1.5rem" }}>
      <h2>Message sent successfully ✅</h2>
      <p>
        Thank you for sharing. We’ve received your message, and please remember,
        you are not alone. <br />
        Your therapist will review your message and address it with care during
        your upcoming session.
      </p>

      <Link to="/patient/logs">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            backgroundColor: "#a8d5ba",
            border: "none",
            borderRadius: "8px",
            fontSize: "20px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          View history
        </button>
      </Link>
    </div>
  );
}

export default SubmissionConfirmation;
