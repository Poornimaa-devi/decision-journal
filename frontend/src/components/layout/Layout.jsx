import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ErrorBoundary from "../common/Errorboundary";

function Layout() {
  const location = useLocation();

  return (
    <div className="container">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <ErrorBoundary key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default Layout;