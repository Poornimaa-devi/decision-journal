import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import FormField from "../components/common/FormField";
import ErrorMessage from "../components/common/ErrorMessage";
import { useForm } from "../hook/useForm";
import { validateSignup } from "../utils/validators";

function SignupPage() {
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
    <div>
      <h1>Decision Journal</h1>
      <h2>Create an account</h2>

      <form onSubmit={form.handleSubmit} noValidate>
        <FormField
          id="signup-email"
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
          id="signup-password"
          label="Password (min 6 characters)"
          type="password"
          name="password"
          autoComplete="new-password"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.password}
        />

        {form.submitError && !form.errors.email && !form.errors.password && (
          <ErrorMessage error={form.submitError} />
        )}

        <button type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default SignupPage;