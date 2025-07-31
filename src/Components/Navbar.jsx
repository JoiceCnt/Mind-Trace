import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import blueBurgerIcon from "../assets/blueburger.png";
import greenBurgerIcon from "../assets/greenburger.png";
import "../Styles/App.css";
import DropdownMenu from "./DropdownMenu";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   
  const isPatient = location.pathname.includes("/patient");
  const emotionSelector = location.pathname.includes("/EmotionSelectorPage");
  const emotionLog = location.pathname.includes("/emotion-log");
  const submissionConfirmation = location.pathname.includes("/submission-confirmation");
  const patientLogs = location.pathname.includes("/patient/Logs");
  const professionalCalendar = location.pathname.includes("/ProfessionalCalendar");
  const editProfile = location.pathname.includes("/edit-profile");
  const isProfessional = location.pathname.includes("/professional");
  const isHomePage = location.pathname === "/";

  const showMenuButton = emotionSelector || emotionLog || submissionConfirmation || patientLogs || professionalCalendar || editProfile;

  const navbarBgColor = isPatient || emotionSelector || emotionLog || submissionConfirmation || patientLogs || professionalCalendar || editProfile ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  const buttonBgColor = emotionSelector || emotionLog || submissionConfirmation || patientLogs || professionalCalendar || editProfile ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  const dropdownBgColor = emotionSelector || emotionLog || submissionConfirmation || patientLogs || professionalCalendar || editProfile ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  
  const burgerIcon = emotionSelector || emotionLog || submissionConfirmation || patientLogs || professionalCalendar || editProfile ? blueBurgerIcon : greenBurgerIcon;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  }
  
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: navbarBgColor }}>
        <div>
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="navbar-actions">
          {!isHomePage && (
            <button className="home-button" onClick={() => navigate("/")}>
            Home
            </button>
          )}
          
          {showMenuButton && (
            <button
              className="menu-button"
              style={{ backgroundColor: buttonBgColor }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={burgerIcon} alt="menu" className="menu-icon" />
            </button>
          )}
        </div>

        {isOpen && (
          <DropdownMenu
            handleLogout={handleLogout}
            menuRef={menuRef}
            dropdownBgColor={dropdownBgColor}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
