import { type JSX } from 'react'
import './VideoPreview.css'
import { Overlay } from '../../../../components/ui/Overlay/Overlay'

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
          (countdown === 0 && !isRunning) || error
            ? 'snapshot-message-hidden'
            : ''
        }`}
      >
        Snapshot in {countdown} second{countdown === 1 ? '' : 's'}...
      </p>
      {error ? (
        // handle errors + semantic <p
        <div role="alert" className="error-message">
          {error}
        </div>
      ) : (
        <>
          <div className="video-container">
            {(!isRunning || hasPhoto) && (
              <Overlay backgroundColor="#0000" textColor="#ffff">
                <p>Camera preview will appear here after you click Start.</p>
              </Overlay>
            )}
            <video ref={videoRef} autoPlay playsInline muted />
          </div>
        </>
      )}
    </div>
  )
}
