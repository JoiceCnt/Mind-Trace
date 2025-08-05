import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";


function Footer() {
  const location = useLocation();

  const isPatient = location.pathname.includes("/patient");
  const emotionSelector = location.pathname.includes("/EmotionSelectorPage");
  const emotionLog = location.pathname.includes("/emotion-log");
  const submissionConfirmation = location.pathname.includes("/submission-confirmation");
  const editProfile = location.pathname.includes("/edit-profile");
  const appointments = location.pathname.includes("/appointments");
  const PatientReschedule = location.pathname.includes("/reschedule");

  const isProfessional = location.pathname.includes("/professional");
  const professionalCalendar = location.pathname.includes("/ProfessionalCalendar");
  const createPatient = location.pathname.includes("/create-patient");
  const professionalHome = location.pathname.includes("/Professional-Home");
  const checkPatientsHistory = location.pathname.includes("/CheckPatientsHistory");
  const professionalLogin = location.pathname.includes("/ProfessionalLogin");
  
  
 const footerBgColor = isPatient || emotionSelector || emotionLog || submissionConfirmation  || editProfile || appointments || PatientReschedule ? "#A8D5BA" : isProfessional || professionalCalendar || professionalHome || createPatient || checkPatientsHistory || professionalLogin ? "#B8B5E0" : "#e0e0e0";

  return (
    <footer className="footer" style={{ backgroundColor: footerBgColor }}>
      <div className="footer-section">
       <p className="footer-text">
          View the source code on{" "}
            <a
              href="https://github.com/JoiceCnt/Mind-Trace"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub.
            </a>
        </p>

        <p className="footer-text">
          Support: <a href="mailto:support@mindtraceapp.com" className="footer-link">support@mindtraceapp.com</a>
        </p>
        <p className="footer-text">Hours: Mon–Fri, 9:00–18:00 CET</p>
      </div>

      <nav className="footer-links">
        <Link to="/terms-of-use" className="footer-link" style={{ fontSize: "16px" }}>Terms of Use</Link>
      </nav>

      <nav className="footer-links right">
        <Link to="/privacy-policy" className="footer-link" style={{ fontSize: "16px" }}>Privacy Policy</Link>
      </nav>
    </footer>
  );
}

export default Footer;
