import {
  FaTasks,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaUserCircle,
  FaHome
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">

      <div className="nav-left">
        <div className="logo-box">
          <FaTasks className="logo-icon" />
        </div>

        <span className="logo-text">
          Task Manager
        </span>
      </div>

      <div className="nav-right">

        <button
          className="icon-btn"
          onClick={() => navigate("/dashboard")}
          title="Dashboard"
        >
          <FaHome />
        </button>

        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <button
          className="icon-btn"
          onClick={() => navigate("/profile")}
        >
          <FaUserCircle />
        </button>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;