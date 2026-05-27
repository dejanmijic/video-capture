import { type JSX, type ReactNode } from 'react'
import './ErrorMessage.css'

type ErrorMessageProps = {
  children: ReactNode
}

export const ErrorMessage = ({ children }: ErrorMessageProps): JSX.Element => {
  return (
    <div role="alert" className="error-message">
      <p>{children}</p>
    </div>
  )
}
