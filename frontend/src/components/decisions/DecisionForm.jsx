import FormField from "../common/FormField";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from "../../hook/useForm";
import { validateDecisionForm } from "../../utils/validators";

function DecisionForm({ onAddDecision }) {
  const form = useForm({
    initialValues: { title: "", reasoning: "" },
    validate: validateDecisionForm,
    onSubmit: (values) =>
      onAddDecision({
        title: values.title.trim(),
        reasoning: values.reasoning.trim(),
      }),
  });

  const hasFieldErrors = Object.keys(form.errors).some((key) => form.errors[key]);

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      <FormField
        id="decision-title"
        label="What did you decide?"
        name="title"
        value={form.values.title}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.title}
      />

      <FormField
        id="decision-reasoning"
        label="Why did you decide this?"
        as="textarea"
        rows={3}
        name="reasoning"
        value={form.values.reasoning}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.reasoning}
      />

      {form.submitError && !hasFieldErrors && <ErrorMessage error={form.submitError} />}

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Saving..." : "Record Decision"}
      </button>
    </form>
  );
}

export default DecisionForm;