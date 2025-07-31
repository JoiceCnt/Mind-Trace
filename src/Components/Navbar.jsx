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
  const isProfessional = location.pathname.includes("/professional");

  const showMenuButton = emotionSelector || emotionLog;

  const navbarBgColor = isPatient || emotionSelector || emotionLog ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  const buttonBgColor = emotionSelector || emotionLog ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  const dropdownBgColor = emotionSelector || emotionLog ? "#A8D5BA" : isProfessional ? "#B8B5E0" : "#e0e0e0";
  
  const burgerIcon = emotionSelector || emotionLog ? blueBurgerIcon : greenBurgerIcon;

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

        {showMenuButton && (
          <button className="menu-button" style={{ backgroundColor: buttonBgColor }} onClick={() => setIsOpen(!isOpen)}>
            <img
              src={burgerIcon}
              alt="menu"
              className="menu-icon"
            />
          </button>
        )}

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
