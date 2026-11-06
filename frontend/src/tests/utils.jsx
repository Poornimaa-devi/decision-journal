/* eslint-disable react-refresh/only-export-components -- test helper, fast refresh does not apply */
import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { AuthProvider } from '../auth/AuthProvider'
import App from '../App'

const API = 'http://localhost:3000'

// Replaces the browser's fetch with a fake backend.
//   handlers: { 'GET /api/goals': [...], 'POST /api/goals': ({ body }) => ({ status: 201, body: {...} }) }
// A handler may return plain data (status 200), { status, body }, or throw to simulate "server unreachable".
// Returns `calls`, a list of every request the app made, so tests can check what was sent.
export function mockApi(handlers = {}) {
  const calls = []
  globalThis.fetch = vi.fn(async (url, options = {}) => {
    const fullPath = String(url).replace(API, '')
    const path = fullPath.split('?')[0]
    const method = (options.method || 'GET').toUpperCase()
    const body = options.body ? JSON.parse(options.body) : undefined
    calls.push({ method, path: fullPath, headers: options.headers || {}, body })

    const handler = handlers[`${method} ${path}`]
    const result = typeof handler === 'function' ? handler({ body }) : handler
    if (result === undefined) {
      return { ok: false, status: 404, json: async () => ({ message: `not mocked: ${method} ${path}` }) }
    }
    // { status: 404, body: {...} } is an HTTP response. Anything else is a 200 body
    // (a decision also has a "status" field, so we only unwrap when status is a number AND body exists).
    const isWrapped = typeof result?.status === 'number' && 'body' in result
    const status = isWrapped ? result.status : 200
    const data = isWrapped ? result.body : result
    return { ok: status < 400, status, json: async () => data }
  })
  return calls
}

function Where() {
  return <div data-testid="where">{useLocation().pathname}</div>
}

// Renders the whole app at `path`. By default the visitor is logged in.
export function renderApp(path, { loggedIn = true } = {}) {
  if (loggedIn) localStorage.setItem('dj_token', 'fake-token')
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <App />
        <Where />
      </AuthProvider>
    </MemoryRouter>,
  )
}

export const currentPath = () => document.querySelector('[data-testid="where"]').textContent