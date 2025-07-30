import { Link } from "react-router-dom";

function SubmissionConfirmation() {
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Message sent successfully ✅</h2>
      <p>
        Thank you for sharing. We’ve received your message, and please remember,
        you are not alone. Your therapist will review your message and address
        it with care during your upcoming session.
      </p>

      <Link to="/patient/logs">
        <button style={{ marginTop: "20px" }}>View history</button>
      </Link>
    </div>
  );
}

export default SubmissionConfirmation;
