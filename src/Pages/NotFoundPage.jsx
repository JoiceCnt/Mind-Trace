import { useNavigate, Link } from "react-router-dom";
import "../Styles/NotFoundPage.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="nf-wrap">
      <div className="nf-card">
        <h1 className="nf-title">404</h1>
        <p className="nf-subtitle">Page not found</p>
        <p className="nf-text">
          It seems this page doesn't exist. You can return to the previous page
          or visit your Schedule or History.
        </p>

        <div className="nf-actions">
          <button className="nf-btn" onClick={() => navigate(-1)}>
            ← Go back
          </button>
          <Link to="/" className="nf-link-btn">
            Go to Home
          </Link>
        </div>

        <div className="nf-help">
          <p>
            Need something? Go to{" "}
            <Link to="/ProfessionalCalendar">Schedule</Link> or{" "}
            <Link to="/patient/Logs">History</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
