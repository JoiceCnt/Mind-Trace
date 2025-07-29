import Home from "./Pages/Home.jsx";
import "../src/Styles/App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import EmotionSelectorPage from "./Pages/EmotionSelectorPage";
import PatientLogin from "./Pages/PatientLogin";
import EmotionLog from "./Pages/EmotionLog.jsx";
import CustomCalendar from "./Pages/CustomCalendar.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/EmotionSelectorPage"
            element={<EmotionSelectorPage />}
          />
          <Route path="/login/patient" element={<PatientLogin />} />
          <Route path="/emotion-log" element={<EmotionLog />} />
          <Route path="/Calendar" element={<CustomCalendar />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
