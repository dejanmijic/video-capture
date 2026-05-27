import { type JSX, type ReactNode } from 'react'
import './Overlay.css'

type OverlayProps = {
  backgroundColor: string
  textColor: string
  border?: string
  children: ReactNode
}

export const Overlay = ({
  backgroundColor,
  textColor,
  border,
  children,
}: OverlayProps): JSX.Element => {
  return (
    <div
      className="overlay flex-column-centered"
      style={{
        background: `${backgroundColor}`,
        color: `${textColor}`,
        border: `${border ? border : 'none'}`,
      }}
    >
      {children}
    </div>
  )
}
