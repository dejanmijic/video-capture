import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { VideoCaptureFeature } from './VideoCaptureFeature'

describe('VideoCaptureFeature', () => {
  const getUserMediaMock = vi.fn()
  const drawImageMock = vi.fn()
  const stopTrackMock = vi.fn()

  beforeEach(() => {
    vi.useFakeTimers()

    getUserMediaMock.mockReset()
    drawImageMock.mockReset()
    stopTrackMock.mockReset()

    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        getUserMedia: getUserMediaMock,
      },
      writable: true,
    })

    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      (contextId: string) => {
        if (contextId === '2d') {
          return {
            drawImage: drawImageMock,
          } as unknown as CanvasRenderingContext2D
        }

        return null
      }
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('starts camera, shows countdown, captures photo after 5 seconds', async () => {
    getUserMediaMock.mockResolvedValue({
      getTracks: () => [{ stop: stopTrackMock }],
    })

    render(<VideoCaptureFeature />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start/i }))
    })

    expect(getUserMediaMock).toHaveBeenCalledWith({
      video: true,
      audio: false,
    })

    expect(screen.getByText(/snapshot in/i)).toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000)
    })

    expect(drawImageMock).toHaveBeenCalled()
    expect(stopTrackMock).toHaveBeenCalled()

    expect(
      screen.queryByText(/captured photo will appear here/i)
    ).not.toBeInTheDocument()
  })

  it('shows error message when camera access fails', async () => {
    getUserMediaMock.mockRejectedValue(new DOMException('', 'NotAllowedError'))

    render(<VideoCaptureFeature />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start/i }))
    })

    expect(screen.getByText(/camera access was blocked/i)).toBeInTheDocument()
  })
})
