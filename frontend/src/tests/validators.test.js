import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validateLogin,
  validateSignup,
  validateGoalForm,
  validateDecisionForm,
} from '../utils/validators'

describe('validateEmail', () => {
  it('requires a value (spaces do not count)', () => {
    expect(validateEmail('')).toBe('Email is required')
    expect(validateEmail('   ')).toBe('Email is required')
  })

  it.each(['abc', 'a@b', 'a b@c.com', '@c.com'])('rejects "%s"', (email) => {
    expect(validateEmail(email)).toBe('Enter a valid email address')
  })

  it('accepts a normal address, ignoring surrounding spaces', () => {
    expect(validateEmail('  me@example.com ')).toBeNull()
  })
})

describe('validateLogin', () => {
  it('returns no errors for a valid login', () => {
    expect(validateLogin({ email: 'me@example.com', password: 'x' })).toEqual({})
  })

  it('only requires a password to be present (older accounts may have other rules)', () => {
    expect(validateLogin({ email: 'me@example.com', password: '' })).toEqual({ password: 'Password is required' })
  })
})

describe('validateSignup', () => {
  it('enforces the 6-character minimum exactly at the boundary', () => {
    expect(validateSignup({ email: 'me@example.com', password: '12345' }).password).toMatch(/at least 6/)
    expect(validateSignup({ email: 'me@example.com', password: '123456' })).toEqual({})
  })

  it('reports both fields at once', () => {
    expect(Object.keys(validateSignup({ email: '', password: '' }))).toEqual(['email', 'password'])
  })
})

describe('form validators', () => {
  it('a goal needs a non-blank title', () => {
    expect(validateGoalForm({ title: '   ' })).toEqual({ title: 'Goal title is required' })
    expect(validateGoalForm({ title: 'Learn' })).toEqual({})
  })

  it('a decision needs a title and reasoning', () => {
    expect(validateDecisionForm({ title: '', reasoning: ' ' })).toEqual({
      title: 'Decision title is required',
      reasoning: 'Reasoning is required',
    })
    expect(validateDecisionForm({ title: 'a', reasoning: 'b' })).toEqual({})
  })
})