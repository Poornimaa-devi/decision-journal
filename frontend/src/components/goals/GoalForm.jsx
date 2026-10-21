import FormField from "../common/FormField";
import ErrorMessage from "../common/ErrorMessage";
import { useForm } from "../../hook/useForm";
import { validateGoalForm } from "../../utils/validators";

function GoalForm({ onAddGoal, decisions = [] }) {
  const form = useForm({
    initialValues: { title: "", priority: "medium", decision: "" },
    validate: validateGoalForm,
    onSubmit: (values) =>
      onAddGoal({
        title: values.title.trim(),
        priority: values.priority,
        decision: values.decision || undefined, // "" would cause a cast error (Day 67)
      }),
  });

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      <FormField
        id="goal-title"
        label="Goal title"
        name="title"
        value={form.values.title}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.errors.title}
        placeholder="e.g. Do 30 minutes of flashcards daily"
      />

      <FormField
        id="goal-priority"
        label="Priority"
        as="select"
        name="priority"
        value={form.values.priority}
        onChange={form.handleChange}
        error={form.errors.priority}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </FormField>

      <FormField
        id="goal-decision"
        label="Linked decision (optional)"
        as="select"
        name="decision"
        value={form.values.decision}
        onChange={form.handleChange}
        error={form.errors.decision}
      >
        <option value="">No linked decision</option>
        {decisions.map((d) => (
          <option key={d._id} value={d._id}>
            {d.title}
          </option>
        ))}
      </FormField>

      {form.submitError && !form.errors.title && <ErrorMessage error={form.submitError} />}

      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? "Adding..." : "Add Goal"}
      </button>
    </form>
  );
}

export default GoalForm;