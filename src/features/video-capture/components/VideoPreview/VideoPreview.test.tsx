import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VideoPreview } from './VideoPreview'

describe('VideoPreview', () => {
  const defaultProps = {
    videoRef: createRef<HTMLVideoElement>(),
    error: '',
    isRunning: false,
    countdown: 0,
    hasPhoto: false,
  }

  it('renders heading', () => {
    render(<VideoPreview {...defaultProps} />)

    expect(
      screen.getByRole('heading', {
        name: /live video preview/i,
      })
    ).toBeInTheDocument()
  })

  it('shows placeholder overlay before camera starts', () => {
    render(<VideoPreview {...defaultProps} />)

    expect(
      screen.getByText(/camera preview will appear here after you click start/i)
    ).toBeInTheDocument()
  })

  it('shows countdown text while camera is running', () => {
    render(<VideoPreview {...defaultProps} isRunning={true} countdown={5} />)

    expect(screen.getByText(/snapshot in/i)).toBeInTheDocument()
  })

  it('hides countdown text when countdown is 0', () => {
    render(<VideoPreview {...defaultProps} isRunning={false} countdown={0} />)

    const countdownMessage = screen.getByText(/snapshot in/i)

    expect(countdownMessage).toHaveClass('snapshot-message--hidden')
  })

  it('renders video element with correct attributes', () => {
    render(<VideoPreview {...defaultProps} />)

    const video = document.querySelector('video')

    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveAttribute('playsinline')
    expect(video?.muted).toBe(true)
  })
})
