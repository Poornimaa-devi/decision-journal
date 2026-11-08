
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

  const hasFieldErrors = Object.keys(form.errors).some(
    (key) => form.errors[key]
  );

  return (
    <section className="decision-form-card">
      <div className="decision-form-heading">
        <div>
          <span className="section-eyebrow">THINK IT THROUGH</span>
          <h3>Record a new decision</h3>
          <p>Capture your choice and the reasoning behind it.</p>
        </div>

        <div className="decision-form-icon">◇</div>
      </div>

      <form onSubmit={form.handleSubmit} noValidate>
        <FormField
          id="decision-title"
          label="What did you decide?"
          name="title"
          value={form.values.title}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.title}
          placeholder="e.g. Focus on learning React before moving to Next.js"
        />

        <FormField
          id="decision-reasoning"
          label="Why did you decide this?"
          as="textarea"
          rows={5}
          name="reasoning"
          value={form.values.reasoning}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.reasoning}
          placeholder="Write down your thoughts, reasons, and what influenced your choice..."
        />

        {form.submitError && !hasFieldErrors && (
          <ErrorMessage error={form.submitError} />
        )}

        <div className="decision-form-footer">
          <p>Your reasoning today can guide your future self.</p>

          <button type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? "Saving..." : "＋ Record Decision"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default DecisionForm;
