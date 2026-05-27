import { memo, type JSX } from 'react'
import './Instructions.css'
import { Button } from '../../../../components/ui/Button/Button'

type InstructionsProps = {
  hasError: boolean
  isRunning: boolean
  onStart: () => void
}

export const Instructions = memo(
  ({ onStart, hasError, isRunning }: InstructionsProps): JSX.Element => {
    const isStartDisabled = isRunning || hasError

    return (
      <section
        className="flex-column-centered"
        aria-labelledby="instructions-title"
      >
        <h1>Video capture</h1>
        <p className="instructions-description">
          Click the button to allow camera access. A photo will be taken
          automatically after a few seconds.
        </p>
        <Button
          width={168}
          height={48}
          disabled={isStartDisabled}
          onClick={onStart}
        >
          Start
        </Button>
      </section>
    )
  }
)

Instructions.displayName = 'Instructions'
