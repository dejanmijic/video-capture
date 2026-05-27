import { type JSX, type ReactNode } from 'react'
import './Button.css'

type ButtonProps = {
  width: number
  height: number
  disabled?: boolean
  background?: string
  onClick: () => void
  children: ReactNode
}

export const Button = ({
  width,
  height,
  disabled,
  background,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="button button--responsive"
      disabled={disabled ?? false}
      style={
        {
          '--btn-width': `${width}px`,
          '--btn-height': `${height}px`,
          background: background ?? '#fdbb30',
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
