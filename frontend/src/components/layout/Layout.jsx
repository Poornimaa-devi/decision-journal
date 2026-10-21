import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ErrorBoundary from "../common/Errorboundary";

function Layout() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Navbar />
      <ErrorBoundary key={location.pathname}>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default Layout;