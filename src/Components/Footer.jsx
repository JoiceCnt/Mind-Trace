import React from "react";
import { useLocation } from "react-router-dom";
import "../Styles/App.css";


function Footer() {
  const location = useLocation();

  const isPatient = location.pathname.includes("/patient");
  const emotionSelector = location.pathname.includes("/EmotionSelectorPage");
  const emotionLog = location.pathname.includes("/emotion-log");
  const isProfessional = location.pathname.includes("/professional");


 const footerBgColor = isPatient || emotionSelector || emotionLog ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";

  return (
    <footer className="footer" style={{ backgroundColor: footerBgColor }}>
      <p>
        View the source code on{" "}
        <a
          href="https://github.com/JoiceCnt/Mind-Trace"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>GitHub</strong>
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
