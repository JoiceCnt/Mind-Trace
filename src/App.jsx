import { useState } from "react";
import "./App.css";
import Calendar from "react-calendar";
import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import "react-calendar/dist/Calendar.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import EmotionSelectorPage from "./Pages/EmotionSelectorPage";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <div>
        <Navbar/>

        <h2>Calendar</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <p>Daily Secctions {selectedDate.toDateString()}</p>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Select the option below to login:</h1>
                <Link to="/emotion-selector">
                  <button>Patient</button>
                </Link>      
              </div>
            }
          />
          <Route path="/emotion-selector" element={<EmotionSelectorPage/>} />


        </Routes>



        <Footer/>
      </div>
    </>
  );
}

export default App;
