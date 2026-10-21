import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import FormField from "../components/common/FormField";
import ErrorMessage from "../components/common/ErrorMessage";
import { useForm } from "../hook/useForm";
import { validateLogin } from "../utils/validators";

function LoginPage() {
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
    <div>
      <h1>Decision Journal</h1>
      <h2>Log in</h2>
      <form onSubmit={form.handleSubmit} noValidate>
        <FormField
          id="login-email"
          label="Email"
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

        {form.submitError && <ErrorMessage error={form.submitError} />}

        <button type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default LoginPage;