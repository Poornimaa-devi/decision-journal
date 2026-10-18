import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>Goals</NavLink>{" | "}
      <NavLink to="/decisions">Decisions</NavLink>{" | "}
      <NavLink to="/insights">Insights</NavLink>{" | "}
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}

export default Navbar;