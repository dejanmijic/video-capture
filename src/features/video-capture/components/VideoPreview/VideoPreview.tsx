import { useState, type JSX } from 'react'
import './VideoPreview.css'

export const VideoPreview = (): JSX.Element => {
  const [error, setError] = useState(false)

  return (
    <div className="wrapper">
      {error ? (
        <div role="alert" className="error-message">
          Camera access was denied. Please allow camera permissions.
        </div>
      ) : (
        <>
          <h2>Live video preview</h2>

          <video
            id="webcam"
            autoPlay
            playsInline
            muted
            width="640"
            height="360"
          />
        </>
      )}
    </div>
  )
}
