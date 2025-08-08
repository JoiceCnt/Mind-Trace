import { Link } from "react-router-dom";

function SubmissionConfirmation() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1.4rem",
          textAlign: "center",
          minHeight: "20vh",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1 style={{color: "#5c80bc"}}>Message sent successfully ✅</h1>
        <p>
          Thank you for sharing. We’ve received your message, and please
          remember, you are not alone. <br />
          Your therapist will review your message and address it with care
          during your upcoming session.
        </p>

        <Link to="/patient/logs">
          <button
            style={{
              marginTop: "40px",
              padding: "7px 18px",
              backgroundColor: "#a8d5ba",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
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
