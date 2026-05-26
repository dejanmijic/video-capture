import { memo, type JSX } from 'react'
import './Instructions.css'
import { Button } from '../../../../components/ui/Button/Button'

type InstructionsProps = {
  error: boolean
  isRunning: boolean
  onStart: () => void
}

export const Instructions = memo(
  ({ onStart, error, isRunning }: InstructionsProps): JSX.Element => {
    return (
      <div className="wrapper">
        <h1>Video capture</h1>

        <p>
          Click the button to allow camera access. A photo will be taken
          automatically after a few seconds.
        </p>

        <Button
          width={240}
          height={56}
          disabled={isRunning || error}
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    )
  }
)

Instructions.displayName = 'Instructions'
