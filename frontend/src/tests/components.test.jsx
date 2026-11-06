import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GoalCard from '../components/goals/GoalCard'
import Dashboard from '../components/goals/Dashboard'
import GoalForm from '../components/goals/GoalForm'

describe('GoalCard', () => {
  const baseGoal = { id: 'g1', title: 'Learn Spanish', priority: 'high', progress: 40, completed: false, decision: null }

  function setup(overrides = {}) {
    const onToggleComplete = vi.fn()
    const onDeleteGoal = vi.fn()
    render(<GoalCard {...baseGoal} {...overrides} onToggleComplete={onToggleComplete} onDeleteGoal={onDeleteGoal} />)
    return { onToggleComplete, onDeleteGoal, user: userEvent.setup() }
  }

  it('shows the title, priority, progress and status', () => {
    setup()
    expect(screen.getByRole('heading', { name: 'Learn Spanish' })).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Progress for Learn Spanish' })).toHaveValue(40)
  })

  it('shows the linked decision only when there is one', () => {
    const { unmount } = render(
      <GoalCard {...baseGoal} decision={{ _id: 'd1', title: 'Switch to active recall' }} onToggleComplete={() => {}} onDeleteGoal={() => {}} />,
    )
    expect(screen.getByText('From decision: Switch to active recall')).toBeInTheDocument()
    unmount()

    setup()
    expect(screen.queryByText(/From decision/)).not.toBeInTheDocument()
  })

  it('a completed goal says Completed and offers Reopen', () => {
    setup({ completed: true })
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reopen' })).toBeInTheDocument()
  })

  it('the toggle button reports which goal was clicked', async () => {
    const { user, onToggleComplete } = setup()
    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(onToggleComplete).toHaveBeenCalledWith('g1')
  })

  it('deleting needs a second, explicit confirmation', async () => {
    const { user, onDeleteGoal } = setup()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.getByRole('button', { name: 'Confirm delete' })).toBeInTheDocument()
    expect(onDeleteGoal).not.toHaveBeenCalled() // one click must never delete

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(onDeleteGoal).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Confirm delete' }))
    expect(onDeleteGoal).toHaveBeenCalledTimes(1)
    expect(onDeleteGoal).toHaveBeenCalledWith('g1')
  })
})

describe('Dashboard', () => {
  const goals = [
    { _id: 'g1', title: 'One', priority: 'high', progress: 100, completed: true, decision: null },
    { _id: 'g2', title: 'Two', priority: 'low', progress: 10, completed: false, decision: null },
  ]
  const noop = () => {}

  it('with no goals and no filters, explains how to start', () => {
    render(<Dashboard goals={[]} onToggleComplete={noop} onDeleteGoal={noop} />)
    expect(screen.getByText('No goals yet')).toBeInTheDocument()
  })

  it('with no goals because of filters, says so and offers Clear filters', async () => {
    const onClearFilters = vi.fn()
    render(<Dashboard goals={[]} hasFilters onClearFilters={onClearFilters} onToggleComplete={noop} onDeleteGoal={noop} />)

    expect(screen.getByText('No goals match your search or filters.')).toBeInTheDocument()
    expect(screen.queryByText('No goals yet')).not.toBeInTheDocument()

    await userEvent.setup().click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(onClearFilters).toHaveBeenCalledTimes(1)
  })

  it('shows a card per goal and the completion summary', () => {
    render(<Dashboard goals={goals} onToggleComplete={noop} onDeleteGoal={noop} />)
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByText('1 of 2 goals completed (50%)')).toBeInTheDocument()
  })

  it('labels the summary as a filtered view when filters are on', () => {
    render(<Dashboard goals={goals} hasFilters onToggleComplete={noop} onDeleteGoal={noop} />)
    expect(screen.getByText(/filtered view/)).toBeInTheDocument()
  })
})

describe('GoalForm', () => {
  it('shows an error and sends nothing when the title is empty', async () => {
    const onAddGoal = vi.fn()
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={onAddGoal} />)

    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(await screen.findByText('Goal title is required')).toBeInTheDocument()
    expect(screen.getByLabelText('Goal title')).toHaveAttribute('aria-invalid', 'true')
    expect(onAddGoal).not.toHaveBeenCalled()
  })

  it('treats a whitespace-only title as empty', async () => {
    const onAddGoal = vi.fn()
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={onAddGoal} />)

    await user.type(screen.getByLabelText('Goal title'), '   ')
    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(await screen.findByText('Goal title is required')).toBeInTheDocument()
    expect(onAddGoal).not.toHaveBeenCalled()
  })

  it('the error disappears as soon as the user fixes the field', async () => {
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Add Goal' }))
    expect(await screen.findByText('Goal title is required')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Goal title'), 'x')
    expect(screen.queryByText('Goal title is required')).not.toBeInTheDocument()
  })

  it('submits a trimmed title, omits an empty decision, and clears the form', async () => {
    const onAddGoal = vi.fn().mockResolvedValue()
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={onAddGoal} />)

    await user.type(screen.getByLabelText('Goal title'), '  Learn React  ')
    await user.selectOptions(screen.getByLabelText('Priority'), 'high')
    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(onAddGoal).toHaveBeenCalledWith({ title: 'Learn React', priority: 'high', decision: undefined })
    expect(screen.getByLabelText('Goal title')).toHaveValue('')
  })

  it('links the chosen decision by its id', async () => {
    const onAddGoal = vi.fn().mockResolvedValue()
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={onAddGoal} decisions={[{ _id: 'd1', title: 'Switch to active recall' }]} />)

    await user.type(screen.getByLabelText('Goal title'), 'Flashcards')
    await user.selectOptions(screen.getByLabelText('Linked decision (optional)'), 'Switch to active recall')
    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(onAddGoal).toHaveBeenCalledWith(expect.objectContaining({ title: 'Flashcards', decision: 'd1' }))
  })

  it('disables the button while saving, so it cannot be double-submitted', async () => {
    const onAddGoal = vi.fn(() => new Promise(() => {})) // never finishes
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={onAddGoal} />)

    await user.type(screen.getByLabelText('Goal title'), 'Slow one')
    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(await screen.findByRole('button', { name: 'Adding...' })).toBeDisabled()
  })

  it("shows the server's field error next to the field", async () => {
    const serverError = Object.assign(new Error('Validation failed'), {
      fieldErrors: { title: 'Server says: title is too long' },
    })
    const user = userEvent.setup()
    render(<GoalForm onAddGoal={vi.fn().mockRejectedValue(serverError)} />)

    await user.type(screen.getByLabelText('Goal title'), 'Something')
    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(await screen.findByText('Server says: title is too long')).toBeInTheDocument()
  })
})