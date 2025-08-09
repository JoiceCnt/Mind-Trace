import Home from "./Pages/Home.jsx";
import "../src/Styles/App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import EmotionSelectorPage from "./Pages/EmotionSelectorPage";
import PatientLogin from "./Pages/PatientLogin";
import EmotionLog from "./Pages/EmotionLog.jsx";
import { useEffect, useLocation } from "react";


import PatientLogs from "./Pages/PatientLogs.jsx";
import SubmissionConfirmation from "./Pages/SubmissionConfirmation.jsx";
import ProfessionalCalendar from "./Components/ProfessionalCalendar.jsx";
import ProfessionalHome from "./Pages/ProfessionalHome";
import ProfessionalLogin from "./Pages/ProfessionalLogin";
import PatientAppointments from "./Pages/PatientAppointments";
import CreatePatient from "./Pages/CreatePatient.jsx";
import PatientReschedule from "./Pages/PatientReschedule.jsx";
import TermsOfUse from "./Pages/TermsOfUse.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import CheckPatientsHistory from "./Pages/CheckPatientsHistory.jsx";
import EditProfile from "./Pages/EditProfile.jsx";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    const scrollableRoutes = [
      "/CheckPatientsHistory",
      "/emotion-log",
      "/EmotionSelectorPage",
      "/appointments",
      "/reschedule",
      "/privacy-policy",
      "/terms-of-use",
      "/patient/Logs",
      "/patient/logs",
      "/ProfessionalCalendar"
    ];

  const isScrollable = scrollableRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  console.log("Pathname:", location.pathname);
  console.log("Is scrollable:", isScrollable);

    document.body.classList.remove("scroll-enabled", "scroll-disabled");
    document.body.classList.add(isScrollable ? "scroll-enabled" : "scroll-disabled");
  }, [location.pathname]);


  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* PATIENT ROUTES */}
          <Route
            path="/EmotionSelectorPage"
            element={<EmotionSelectorPage />}
          />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/emotion-log" element={<EmotionLog />} />

          <Route path="/patient/logs" element={<PatientLogs />} />
          <Route
            path="/submission-confirmation"
            element={<SubmissionConfirmation />}
          />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* PROFESSIONAL ROUTES */}
          <Route
            path="/ProfessionalCalendar"
            element={<ProfessionalCalendar />}
          />
          <Route path="/professional-home" element={<ProfessionalHome />} />
          <Route path="/login/professional" element={<ProfessionalLogin />} />
          <Route path="/appointments" element={<PatientAppointments />} />
          <Route path="/create-patient" element={<CreatePatient />} />
          <Route
            path="/reschedule/:appointmentId"
            element={<PatientReschedule />}
          />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/CheckPatientsHistory"
            element={<CheckPatientsHistory />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
