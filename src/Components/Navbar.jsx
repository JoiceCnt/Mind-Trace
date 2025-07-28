import logo from "../assets/logo.png";
import "../App.css";

const Navbar = () => {
  return (
    <div>
      <nav className="nav">
            <div>
                <img src={logo} alt="Logo" className="logo" />
              
            </div>
        </nav>
    </div>
  )
}

export default Navbar
