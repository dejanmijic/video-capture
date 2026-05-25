import { type JSX, type ReactNode } from 'react'
import './Button.css'

type ButtonProps = {
  width: number
  height: number
  onClick: () => void
  children: ReactNode
}

export const Button = ({
  width,
  height,
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="button"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
