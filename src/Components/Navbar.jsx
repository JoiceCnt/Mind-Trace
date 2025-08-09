import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import blueBurgerIcon from "../assets/blueburger.png";
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

   
  const isPatient =
    location.pathname.includes("/emotion-log") ||
    location.pathname.includes("/submission-confirmation") ||
    location.pathname.includes("/patient/Logs") ||
    location.pathname.includes("/patient/logs") ||
    location.pathname.includes("/edit-profile") ||
    location.pathname.includes("/appointments") ||
    location.pathname.includes("/reschedule");

  const PatientLogin = location.pathname.includes("/login/patient");
  const EmotionSelectorPage = location.pathname.includes("/EmotionSelectorPage")

  const isProfessional = 
    location.pathname.includes("/ProfessionalCalendar") ||
    location.pathname.includes("/create-patient") ||
    location.pathname.includes("/CheckPatientsHistory");

  const ProfessionalLogin = location.pathname.includes("/login/professional");
  const ProfessionalHome = location.pathname.includes("/Professional-Home") || location.pathname.includes("/professional-home");

  const showHomeButton = isPatient || isProfessional;

  const showMenuButton = 
    location.pathname.includes("/EmotionSelectorPage") ||
    location.pathname.includes("/emotion-log") ||
    location.pathname.includes("/submission-confirmation") ||
    location.pathname.includes("/edit-profile") ||
    location.pathname.includes("/appointments") ||
    location.pathname.includes("/patient/Logs") ||
    location.pathname.includes("/patient/logs") ||
    location.pathname.includes("/reschedule");

  const showLogoutButton = 
    location.pathname.includes("/ProfessionalCalendar") ||
    location.pathname.includes("/create-patient") ||
    location.pathname.includes("/Professional-Home") ||
    location.pathname.includes("/CheckPatientsHistory");
    

  const navbarBgColor = isPatient || PatientLogin || EmotionSelectorPage ? "#A8D5BA" : isProfessional || ProfessionalLogin || ProfessionalHome ? "#B8B5E0" : "#e0e0e0";
  const buttonBgColor = isPatient || EmotionSelectorPage ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  const dropdownBgColor = isPatient || EmotionSelectorPage ? "#A8D5BA" : "#e0e0e0";
  
  const burgerIcon = blueBurgerIcon;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login/patient");
  }
  
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: navbarBgColor }}>
        <div>
          <button className="logo-button" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" className="logo" />
          </button>
        </div>

        <div className="navbar-actions">
          {showHomeButton && (
            <button className="home-button" onClick={() => navigate(isPatient ? "/EmotionSelectorPage" : "/Professional-Home")}>
            Home
            </button>
          )}

          {showLogoutButton && (
            <button className="logout-button" onClick={() => navigate("/login/professional")}>
            Logout
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
            onClose={() => setIsOpen(false)}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
