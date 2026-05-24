import { type JSX } from 'react'
import './VideoPreview.css'

type VideoPreviewProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  error: string
  isRunning: boolean
  countdown: number
  hasPhoto: boolean
}

export const VideoPreview = ({
  videoRef,
  error,
  isRunning,
  countdown,
  hasPhoto,
}: VideoPreviewProps): JSX.Element => {
  return (
    <div className="wrapper">
      <h2>Live video preview</h2>
      {error ? (
        <div role="alert" className="error-message">
          Camera access was denied. Please allow camera permissions.
        </div>
      ) : (
        <>
          {!isRunning && !hasPhoto && (
            <p>Camera preview will appear here after you click Start.</p>
          )}
          {countdown > 0 && isRunning && (
            <p>
              Snapshot in {countdown} second{countdown === 1 ? '' : 's'}...
            </p>
          )}
          <video ref={videoRef} autoPlay playsInline muted />
        </>
      )}
    </div>
  )
}
