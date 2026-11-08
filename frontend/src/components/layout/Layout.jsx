
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import ErrorBoundary from "../common/Errorboundary";

function Layout() {
  const location = useLocation();

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">D</div>
          <div>
            <h2>Decision Journal</h2>
            <p>Your personal growth space</p>
          </div>
        </div>

        <Navbar />
        
        <div className="sidebar-footer">
          <span className="footer-dot"></span>
          <span>Make thoughtful progress</span>
        </div>
      </aside>

      <div className="app-main">
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Header />

        <main id="main" tabIndex={-1}>
          <ErrorBoundary key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default Layout;
