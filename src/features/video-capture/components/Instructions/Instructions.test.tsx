import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Instructions } from './Instructions'

describe('Instructions', () => {
  it('renders title', () => {
    render(
      <Instructions hasError={false} isRunning={false} onStart={vi.fn()} />
    )

    expect(
      screen.getByRole('heading', { name: /video capture/i })
    ).toBeInTheDocument()
  })

  it('renders description', () => {
    render(
      <Instructions hasError={false} isRunning={false} onStart={vi.fn()} />
    )

    expect(
      screen.getByText(/click the button to allow camera access/i)
    ).toBeInTheDocument()
  })

  it('renders Start button', () => {
    render(
      <Instructions hasError={false} isRunning={false} onStart={vi.fn()} />
    )

    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
  })

  it('calls onStart when Start button is clicked', async () => {
    const user = userEvent.setup()
    const onStart = vi.fn()

    render(
      <Instructions hasError={false} isRunning={false} onStart={onStart} />
    )

    await user.click(screen.getByRole('button', { name: /start/i }))

    expect(onStart).toHaveBeenCalledTimes(1)
  })

  it('disables button when isRunning is true', () => {
    render(<Instructions hasError={false} isRunning={true} onStart={vi.fn()} />)

    expect(screen.getByRole('button', { name: /start/i })).toBeDisabled()
  })

  it('disables button when hasError is true', () => {
    render(<Instructions hasError={true} isRunning={false} onStart={vi.fn()} />)

    expect(screen.getByRole('button', { name: /start/i })).toBeDisabled()
  })
})
