import logo from "../assets/logo.png";
import "../Styles/App.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
