
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import FormField from "../components/common/FormField";
import ErrorMessage from "../components/common/ErrorMessage";
import { useForm } from "../hook/useForm";
import { usePageTitle } from "../hook/usePageTitle";
import { validateSignup } from "../utils/validators";

function SignupPage() {
  usePageTitle("Sign up");

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: validateSignup,
    onSubmit: async (values) => {
      await signup(values.email.trim(), values.password);
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
            <span className="auth-eyebrow">START YOUR JOURNEY</span>
            <h1>Small decisions create meaningful change.</h1>
            <p>
              Create a space for your thoughts, connect your decisions
              with your goals, and see how far you have come.
            </p>
          </div>

          <div className="auth-brand-footer">
            <span className="auth-brand-dot"></span>
            Make thoughtful progress
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-content">
            <div className="auth-mobile-brand">
              <div className="auth-brand-icon">D</div>
              <span>Decision Journal</span>
            </div>

            <span className="auth-form-eyebrow">GET STARTED</span>
            <h2>Create your account</h2>
            <p className="auth-form-description">
              Join Decision Journal and start organizing your goals
              and decisions.
            </p>

            <form onSubmit={form.handleSubmit} noValidate>
              <FormField
                id="signup-email"
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
                id="signup-password"
                label="Password (minimum 6 characters)"
                type="password"
                name="password"
                autoComplete="new-password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.errors.password}
              />

              {form.submitError &&
                !form.errors.email &&
                !form.errors.password && (
                  <ErrorMessage error={form.submitError} />
                )}

              <button
                className="auth-submit-button"
                type="submit"
                disabled={form.isSubmitting}
              >
                {form.isSubmitting ? "Creating account..." : "Create account"}
                {!form.isSubmitting && <span>→</span>}
              </button>
            </form>

            <p className="auth-switch-text">
              Already have an account? <Link to="/login">Log in</Link>
            </p>

            <div className="auth-bottom-note">
              Your personal growth journey starts here.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SignupPage;
