import { type JSX } from 'react'
import './VideoPreview.css'

type VideoPreviewProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  error: string
  isRunning: boolean
}

export const VideoPreview = ({
  videoRef,
  error,
  isRunning,
}: VideoPreviewProps): JSX.Element => {
  return (
    <div className="wrapper">
      {error ? (
        <div role="alert" className="error-message">
          Camera access was denied. Please allow camera permissions.
        </div>
      ) : (
        <>
          <h2>Live video preview</h2>
          {!isRunning && (
            <p>Camera preview will appear here after you click Start.</p>
          )}
          <video ref={videoRef} autoPlay playsInline muted />
        </>
      )}
    </div>
  )
}
