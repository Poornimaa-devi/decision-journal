
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar" aria-label="Main">
      <p className="nav-section-title">WORKSPACE</p>

      <NavLink to="/" end>
        <span className="nav-icon">◈</span>
        <span>Goals</span>
      </NavLink>

      <NavLink to="/decisions">
        <span className="nav-icon">◇</span>
        <span>Decisions</span>
      </NavLink>

      <p className="nav-section-title nav-section-spaced">
        PERSONAL
      </p>

      <NavLink to="/insights">
        <span className="nav-icon">▥</span>
        <span>Insights</span>
      </NavLink>

      <NavLink to="/profile">
        <span className="nav-icon">◎</span>
        <span>Profile</span>
      </NavLink>

      <button className="link-button" onClick={logout}>
        <span className="nav-icon">↪</span>
        <span>Log out</span>
      </button>
    </nav>
  );
}

export default Navbar;
