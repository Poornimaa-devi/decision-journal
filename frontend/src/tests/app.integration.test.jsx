// Tests the whole React app (router, auth, pages, API layer) against a fake backend.
import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockApi, renderApp, currentPath } from './utils'

const decision = { _id: 'd1', title: 'Switch to active recall', reasoning: 'Testing myself works better', status: 'pending' }
const goal = {
  _id: 'g1', title: 'Learn Spanish', priority: 'high', progress: 40, completed: false,
  decision: { _id: 'd1', title: decision.title },
}
const title = (page) => `${page} \u00b7 Decision Journal`

describe('routing and the Decisions page', () => {
  it('stays on /decisions and lists the decisions (regression: it used to redirect to Goals)', async () => {
    mockApi({ 'GET /api/decisions': [decision] })
    renderApp('/decisions')

    expect(await screen.findByRole('heading', { name: 'Decisions' })).toBeInTheDocument()
    expect(await screen.findByText('Switch to active recall')).toBeInTheDocument()
    expect(currentPath()).toBe('/decisions')
  })

  it('navigates Goals -> Decisions -> a decision -> back, updating the tab title each time', async () => {
    mockApi({ 'GET /api/goals': [goal], 'GET /api/decisions': [decision], 'GET /api/decisions/d1': decision })
    const user = userEvent.setup()
    renderApp('/')

    await screen.findByRole('heading', { name: 'Goals' })
    expect(document.title).toBe(title('Goals'))

    await user.click(screen.getByRole('link', { name: 'Decisions' }))
    await screen.findByRole('link', { name: 'Switch to active recall' })
    expect(currentPath()).toBe('/decisions')
    expect(document.title).toBe(title('Decisions'))

    await user.click(screen.getByRole('link', { name: 'Switch to active recall' }))
    expect(await screen.findByText('Testing myself works better')).toBeInTheDocument()
    expect(currentPath()).toBe('/decisions/d1')
    expect(document.title).toBe(`${decision.title} \u00b7 Decision Journal`)

    await user.click(screen.getByRole('link', { name: /Back to decisions/ }))
    expect(await screen.findByRole('heading', { name: 'Decisions' })).toBeInTheDocument()
    expect(currentPath()).toBe('/decisions')
  })

  it('shows a helpful empty state when there are no decisions', async () => {
    mockApi({ 'GET /api/decisions': [] })
    renderApp('/decisions')
    expect(await screen.findByText('No decisions recorded yet')).toBeInTheDocument()
  })

  it('shows the not-found page for unknown URLs', async () => {
    mockApi()
    renderApp('/nonsense')
    expect(await screen.findByText('Page not found')).toBeInTheDocument()
  })

  it('the Insights page shows analytics and notifications', async () => {
    mockApi({
      'GET /api/goals/analytics': { overall: { totalGoals: 3, completedGoals: 1 }, byPriority: [{ _id: 'high', count: 2, avgProgress: 62.4 }] },
      'GET /api/decisions/analytics': { overall: { totalDecisions: 2 }, byStatus: [{ _id: 'pending', count: 2 }] },
      'GET /api/notifications': { count: 1, notifications: [{ type: 'goal_almost_done', itemId: 'g1', message: "You're close! \"Learn Spanish\" is at 85%." }] },
    })
    renderApp('/insights')

    expect(await screen.findByText('1 of 3 goals completed')).toBeInTheDocument()
    expect(screen.getByText('high: 2 goals, avg progress 62%')).toBeInTheDocument()
    expect(await screen.findByText(/You're close!/)).toBeInTheDocument()
  })
})

describe('authentication in the browser', () => {
  it('sends logged-out visitors to /login', async () => {
    mockApi()
    renderApp('/decisions', { loggedIn: false })
    await waitFor(() => expect(currentPath()).toBe('/login'))
  })

  it('logs in, stores the token, and uses it on later requests', async () => {
    const calls = mockApi({
      'POST /api/auth/login': { token: 'new-token', user: { id: 'u1', email: 'me@example.com' } },
      'GET /api/goals': [goal],
      'GET /api/decisions': [decision],
    })
    const user = userEvent.setup()
    renderApp('/login', { loggedIn: false })

    await user.type(screen.getByLabelText('Email'), 'me@example.com')
    await user.type(screen.getByLabelText('Password'), 'secret123')
    await user.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByRole('heading', { name: 'Goals' })).toBeInTheDocument()
    expect(currentPath()).toBe('/')
    expect(localStorage.getItem('dj_token')).toBe('new-token')

    const login = calls.find((c) => c.path === '/api/auth/login')
    expect(login.body).toEqual({ email: 'me@example.com', password: 'secret123' })
    expect(login.headers.Authorization).toBeUndefined() // login must NOT send a token
    const goalsRequest = calls.find((c) => c.path.startsWith('/api/goals'))
    expect(goalsRequest.headers.Authorization).toBe('Bearer new-token')
  })

  it("shows the server's message and stays on the login page after a wrong password", async () => {
    mockApi({ 'POST /api/auth/login': { status: 401, body: { message: 'Invalid email or password' } } })
    const user = userEvent.setup()
    renderApp('/login', { loggedIn: false })

    await user.type(screen.getByLabelText('Email'), 'me@example.com')
    await user.type(screen.getByLabelText('Password'), 'wrong-pass')
    await user.click(screen.getByRole('button', { name: 'Log in' }))

    expect(await screen.findByText(/Invalid email or password/)).toBeInTheDocument()
    expect(currentPath()).toBe('/login')
    expect(localStorage.getItem('dj_token')).toBeNull()
  })

  it('signup validates in the browser and sends nothing when the form is empty', async () => {
    const calls = mockApi()
    const user = userEvent.setup()
    renderApp('/signup', { loggedIn: false })

    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
    expect(calls).toHaveLength(0)
  })

  it('an expired token (401) clears the login and redirects to /login', async () => {
    mockApi({
      'GET /api/goals': { status: 401, body: { message: 'Invalid or expired token' } },
      'GET /api/decisions': { status: 401, body: { message: 'Invalid or expired token' } },
    })
    renderApp('/')

    await waitFor(() => expect(currentPath()).toBe('/login'))
    expect(localStorage.getItem('dj_token')).toBeNull()
  })

  it('Log out clears the token and returns to /login', async () => {
    mockApi({ 'GET /api/goals': [], 'GET /api/decisions': [] })
    const user = userEvent.setup()
    renderApp('/')

    await user.click(await screen.findByRole('button', { name: 'Log out' }))

    await waitFor(() => expect(currentPath()).toBe('/login'))
    expect(localStorage.getItem('dj_token')).toBeNull()
  })
})

describe('the Goals page', () => {
  it('shows a friendly message when the backend is down, and recovers with Try again', async () => {
    let backendUp = false
    mockApi({
      'GET /api/goals': () => {
        if (!backendUp) throw new TypeError('Failed to fetch')
        return [goal]
      },
      'GET /api/decisions': [],
    })
    const user = userEvent.setup()
    renderApp('/')

    expect(await screen.findByText(/Cannot reach the server/)).toBeInTheDocument()

    backendUp = true
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(await screen.findByRole('heading', { name: 'Learn Spanish' })).toBeInTheDocument()
  })

  it('creates a goal: sends the right body and shows the new card', async () => {
    const calls = mockApi({
      'GET /api/goals': [],
      'GET /api/decisions': [],
      'POST /api/goals': { status: 201, body: { _id: 'g2', title: 'Read a book', priority: 'medium', progress: 0, completed: false, decision: null } },
    })
    const user = userEvent.setup()
    renderApp('/')

    await screen.findByText('No goals yet')
    await user.type(screen.getByLabelText('Goal title'), 'Read a book')
    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(await screen.findByRole('heading', { name: 'Read a book' })).toBeInTheDocument()
    expect(calls.find((c) => c.method === 'POST').body).toEqual({ title: 'Read a book', priority: 'medium' })
  })

  it('marks a goal complete', async () => {
    const calls = mockApi({
      'GET /api/goals': [goal],
      'GET /api/decisions': [],
      'PATCH /api/goals/g1': { ...goal, completed: true },
    })
    const user = userEvent.setup()
    renderApp('/')

    await user.click(await screen.findByRole('button', { name: 'Mark complete' }))

    expect(await screen.findByRole('button', { name: 'Reopen' })).toBeInTheDocument()
    expect(calls.find((c) => c.method === 'PATCH').body).toEqual({ completed: true })
  })

  it('deletes a goal only after confirmation, then shows the empty state', async () => {
    const calls = mockApi({
      'GET /api/goals': [goal],
      'GET /api/decisions': [],
      'DELETE /api/goals/g1': { message: 'Goal deleted' },
    })
    const user = userEvent.setup()
    renderApp('/')

    await user.click(await screen.findByRole('button', { name: 'Delete' }))
    expect(calls.some((c) => c.method === 'DELETE')).toBe(false) // not yet

    await user.click(screen.getByRole('button', { name: 'Confirm delete' }))
    expect(await screen.findByText('No goals yet')).toBeInTheDocument()
    expect(calls.some((c) => c.method === 'DELETE' && c.path === '/api/goals/g1')).toBe(true)
  })

  it('a failed delete shows an error but keeps the goal list on screen', async () => {
    mockApi({
      'GET /api/goals': [goal],
      'GET /api/decisions': [],
      'DELETE /api/goals/g1': { status: 500, body: { message: 'Server exploded' } },
    })
    const user = userEvent.setup()
    renderApp('/')

    await user.click(await screen.findByRole('button', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Confirm delete' }))

    expect(await screen.findByText(/Server exploded/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Learn Spanish' })).toBeInTheDocument()
  })

  it('searching asks the backend for matching goals', async () => {
    const calls = mockApi({ 'GET /api/goals': [goal], 'GET /api/decisions': [] })
    const user = userEvent.setup()
    renderApp('/')

    await screen.findByRole('heading', { name: 'Learn Spanish' })
    await user.type(screen.getByLabelText('Search goals'), 'span')

    await waitFor(() => expect(calls.some((c) => c.path.includes('search=span'))).toBe(true))
  })
})