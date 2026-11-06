import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// After every test: remove rendered components, forget any saved login, reset the tab title.
afterEach(() => {
  cleanup()
  localStorage.clear()
  document.title = ''
})