import React from "react";
import "../Styles/App.css";

const DropdownMenu = ({ handleLogout, menuRef, dropdownBgColor }) => {
    return (
        <div className="dropdown-menu" ref={menuRef} style={{ backgroundColor: dropdownBgColor }}>
            <label className="dropdown-title">Select the option ▼</label>
            <ul className="dropdown-list">
              <li>Check your history</li>
              <li>Edit profile</li>
              <li>Appointments</li>
              <li className="logout" onClick={handleLogout}>
                Log out
                </li>
            </ul>
          </div>      
    );
};

export default DropdownMenu;