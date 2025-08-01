import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/App.css";

const DropdownMenu = ({ handleLogout, menuRef, dropdownBgColor }) => {
  const navigate = useNavigate();

  const goToPatientLogs = () => {
    navigate("/patient/Logs");
  }
  
  return (
        <div className="dropdown-menu" ref={menuRef} style={{ backgroundColor: dropdownBgColor }}>
            <label className="dropdown-title">Select the option ▼</label>
            <ul className="dropdown-list">
              <li onClick={goToPatientLogs}>Check your history</li>
              <li onClick={() => navigate("/edit-profile")}>Edit profile</li>
              <li onClick={() => navigate("/ProfessionalCalendar")}>
                Appointments</li>
              <li className="logout" onClick={handleLogout}>
                Log out
                </li>
            </ul>
          </div>      
    );
};

export default DropdownMenu;