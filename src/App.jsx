import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CustomCalendar from "./Pages/CustomCalendar.jsx";
import PatientLogin from "./Pages/PatientLogin.jsx";
import ProfessionalLogin from "./Pages/ProfessionalLogin.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CustomCalendar />} />
        <Route path="/login/patient" element={<PatientLogin />} />
        <Route path="/login/professional" element={<ProfessionalLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
