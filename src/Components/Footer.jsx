import React from "react";
import { useLocation } from "react-router-dom";
import "../Styles/App.css";


function Footer() {
  const location = useLocation();

  const isPatient = location.pathname.includes("/patient");
  const emotionSelector = location.pathname.includes("/EmotionSelectorPage");
  const emotionLog = location.pathname.includes("/emotion-log");
  const submissionConfirmation = location.pathname.includes("/submission-confirmation");
  const professionalCalendar = location.pathname.includes("/ProfessionalCalendar");
  const editProfile = location.pathname.includes("/edit-profile");
  const isProfessional = location.pathname.includes("/professional");


 const footerBgColor = isPatient || emotionSelector || emotionLog || submissionConfirmation  || editProfile ? "#A8D5BA" : isProfessional || professionalCalendar ? "#B8B5E0" : "#e0e0e0";

  return (
    <footer className="footer" style={{ backgroundColor: footerBgColor }}>
       <p>
          View the source code on{" "}
            <a
              href="https://github.com/JoiceCnt/Mind-Trace"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <strong>GitHub</strong>
            </a>
        </p>

        <nav className="footer-nav">
          <a href="/contact-support" className="footer-link">
            Contact Support
          </a>

          <a href="/terms-of-use" className="footer-link">
            Terms of Use
          </a>

          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>
        </nav>
    </footer>
  );
}

export default Footer;
