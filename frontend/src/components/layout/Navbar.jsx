import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav>
      <NavLink to="/" end>Goals</NavLink>{" | "}
      <NavLink to="/decisions">Decisions</NavLink>{" | "}
      <NavLink to="/insights">Insights</NavLink>{" | "}
      <NavLink to="/profile">Profile</NavLink>{" | "}
      <button onClick={logout}>Log out</button>
    </nav>
  );
}

export default Navbar;