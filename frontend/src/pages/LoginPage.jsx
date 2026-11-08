
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import FormField from "../components/common/FormField";
import ErrorMessage from "../components/common/ErrorMessage";
import { useForm } from "../hook/useForm";
import { validateLogin } from "../utils/validators";
import { usePageTitle } from "../hook/usePageTitle";

function LoginPage() {
  usePageTitle("Log in");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: validateLogin,
    onSubmit: async (values) => {
      await login(values.email.trim(), values.password);
      navigate("/", { replace: true });
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="auth-screen">
      <div className="auth-shell">
        <section className="auth-brand-panel">
          <div className="auth-brand">
            <div className="auth-brand-icon">D</div>
            <span>Decision Journal</span>
          </div>

          <div className="auth-brand-content">
            <span className="auth-eyebrow">THINK CLEARLY. GROW INTENTIONALLY.</span>
            <h1>Your thoughts deserve a place to grow.</h1>
            <p>
              Reflect on your decisions, organize your goals, and make
              meaningful progress one step at a time.
            </p>
          </div>

          <div className="auth-brand-footer">
            <span className="auth-brand-dot"></span>
            Your personal growth space
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-content">
            <div className="auth-mobile-brand">
              <div className="auth-brand-icon">D</div>
              <span>Decision Journal</span>
            </div>

            <span className="auth-form-eyebrow">WELCOME BACK</span>
            <h2>Log in to your account</h2>
            <p className="auth-form-description">
              Continue where you left off. Your goals and decisions are
              waiting for you.
            </p>

            <form onSubmit={form.handleSubmit} noValidate>
              <FormField
                id="login-email"
                label="Email address"
                type="email"
                name="email"
                autoComplete="email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.email}
              />

              <FormField
                id="login-password"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.password}
              />

              {form.submitError && (
                <ErrorMessage error={form.submitError} />
              )}

              <button
                className="auth-submit-button"
                type="submit"
                disabled={form.isSubmitting}
              >
                {form.isSubmitting ? "Logging in..." : "Log in"}
                {!form.isSubmitting && <span>→</span>}
              </button>
            </form>

            <p className="auth-switch-text">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>

            <div className="auth-bottom-note">
              A little reflection can lead to meaningful progress.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
