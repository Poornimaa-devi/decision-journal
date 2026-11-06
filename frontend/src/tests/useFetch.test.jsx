import { describe, it, expect } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useFetch } from '../hook/useFetch'

// A promise we can settle by hand, to control exactly when a "request" finishes.
const defer = () => {
  let resolve
  const promise = new Promise((res) => { resolve = res })
  return { promise, resolve }
}

describe('useFetch', () => {
  it('starts loading, then returns the data', async () => {
    const { result } = renderHook(() => useFetch(() => Promise.resolve([1, 2]), []))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeNull()

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toEqual([1, 2])
    expect(result.current.error).toBeNull()
  })

  it('exposes the error when the request fails', async () => {
    const { result } = renderHook(() => useFetch(() => Promise.reject(new Error('boom')), []))

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.error.message).toBe('boom')
    expect(result.current.data).toBeNull()
  })

  it('keeps showing old data while refetching, and ignores a stale response', async () => {
    const requests = []
    const fetcher = () => {
      const request = defer()
      requests.push(request)
      return request.promise
    }
    const { result, rerender } = renderHook(({ q }) => useFetch(() => fetcher(q), [q]), {
      initialProps: { q: 'a' },
    })
    await act(async () => requests[0].resolve('result-a'))
    await waitFor(() => expect(result.current.data).toBe('result-a'))

    rerender({ q: 'ab' }) // request 2 starts
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBe('result-a') // no flicker: old data stays

    rerender({ q: 'abc' }) // request 3 starts; request 2 is now outdated
    await act(async () => requests[2].resolve('result-abc'))
    await act(async () => requests[1].resolve('STALE')) // the outdated one answers late
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toBe('result-abc')
  })

  it('keeps old data when a refetch fails, and reload() recovers', async () => {
    let failing = false
    const fetcher = () => (failing ? Promise.reject(new Error('down')) : Promise.resolve('ok'))
    const { result } = renderHook(() => useFetch(fetcher, []))
    await waitFor(() => expect(result.current.data).toBe('ok'))

    failing = true
    act(() => result.current.reload())
    await waitFor(() => expect(result.current.error?.message).toBe('down'))
    expect(result.current.data).toBe('ok')

    failing = false
    act(() => result.current.reload())
    await waitFor(() => expect(result.current.error).toBeNull())
  })

  it('setData accepts a value or an updater function', async () => {
    const { result } = renderHook(() => useFetch(() => Promise.resolve([1]), []))
    await waitFor(() => expect(result.current.data).toEqual([1]))

    act(() => result.current.setData((previous) => [...previous, 2]))
    expect(result.current.data).toEqual([1, 2])
    act(() => result.current.setData([9]))
    expect(result.current.data).toEqual([9])
  })
})