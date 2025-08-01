import Home from "./Pages/Home.jsx";
import "../src/Styles/App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import EmotionSelectorPage from "./Pages/EmotionSelectorPage";
import PatientLogin from "./Pages/PatientLogin";
import EmotionLog from "./Pages/EmotionLog.jsx";
import CustomCalendar from "./Pages/CustomCalendar.jsx";
import PatientLogs from "./Pages/PatientLogs.jsx";
import SubmissionConfirmation from "./Pages/SubmissionConfirmation.jsx";
import ProfessionalCalendar from "./Components/ProfessionalCalendar.jsx";
import ProfessionalHome from "./Pages/ProfessionalHome";
import ProfessionalLogin from "./Pages/ProfessionalLogin";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/EmotionSelectorPage"
            element={<EmotionSelectorPage />}
          />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/emotion-log" element={<EmotionLog />} />
          <Route path="/Calendar" element={<CustomCalendar />} />
          <Route path="/patient/logs" element={<PatientLogs />} />
          <Route
            path="/submission-confirmation"
            element={<SubmissionConfirmation />}
          />
          <Route
            path="/ProfessionalCalendar"
            element={<ProfessionalCalendar />}
          />
          <Route path="/professional-home" element={<ProfessionalHome />} />
          <Route path="/login/professional" element={<ProfessionalLogin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
