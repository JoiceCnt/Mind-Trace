import { Link } from "react-router-dom";

function SubmissionConfirmation() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#F9FAFB",
        height: "90%",
        fontFamily: "Segoe UI', Tahoma, Geneva, Verdana, sansSerif",
      }}
    >
      <div
        style={{
          width: "70%",
          maxWidth: "1000px",
          backgroundColor:" #ffffff",
          padding: "40px 60px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
