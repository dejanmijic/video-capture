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
      <h2 className="video-preview-title">Live video preview</h2>
      <p
        className={`snapshot-message ${
          countdown === 0 && !isRunning ? 'snapshot-message-hidden' : ''
        }`}
      >
        Snapshot in {countdown} second{countdown === 1 ? '' : 's'}...
      </p>
      {error ? (
        // handle errors + semantic <p
        <div role="alert" className="error-message">
          Camera access was denied. Please allow camera permissions.
        </div>
      ) : (
        <>
          <div className="video-container">
            {(!isRunning || hasPhoto) && (
              <div className="video-overlay">
                <p>Camera preview will appear here after you click Start.</p>
              </div>
            )}
            <video ref={videoRef} autoPlay playsInline muted />
          </div>
        </>
      )}
    </div>
  )
}
