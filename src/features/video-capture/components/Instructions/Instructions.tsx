import type { JSX } from 'react'
import './Instructions.css'

export const Instructions = (): JSX.Element => {
  return (
    <div className="wrapper">
      <h1>Video capture</h1>
      <p>
        Click the button to allow camera access. A photo will be taken
        automatically after a few seconds.
      </p>
      <button type="button">Start</button>
    </div>
  )
}
