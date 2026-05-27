import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CapturedPhoto } from './CapturedPhoto'

describe('CapturedPhoto', () => {
  const defaultProps = {
    canvasRef: createRef<HTMLCanvasElement>(),
    hasPhoto: false,
  }

  it('renders heading', () => {
    render(<CapturedPhoto {...defaultProps} />)

    expect(
      screen.getByRole('heading', { name: /captured photo/i })
    ).toBeInTheDocument()
  })

  it('shows placeholder overlay when hasPhoto is false', () => {
    render(<CapturedPhoto {...defaultProps} hasPhoto={false} />)

    expect(
      screen.getByText(/captured photo will appear here/i)
    ).toBeInTheDocument()
  })

  it('hides placeholder overlay when hasPhoto is true', () => {
    render(<CapturedPhoto {...defaultProps} hasPhoto={true} />)

    expect(
      screen.queryByText(/captured photo will appear here/i)
    ).not.toBeInTheDocument()
  })

  it('renders canvas element', () => {
    render(<CapturedPhoto {...defaultProps} />)

    expect(document.querySelector('canvas')).toBeInTheDocument()
  })
})
