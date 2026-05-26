import { type JSX, type RefObject } from 'react'
import './VideoPreview.css'
import { Overlay } from '../../../../components/ui/Overlay/Overlay'

type VideoPreviewProps = {
  videoRef: RefObject<HTMLVideoElement | null>
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
  const hasError = Boolean(error)
  const shouldHideCountdown = (countdown === 0 && !isRunning) || error
  const shouldShowOverlay = !isRunning || hasPhoto

  return (
    <section className="wrapper">
      <h2 className="video-preview-title">Live video preview</h2>
      <p
        className={`snapshot-message ${
          shouldHideCountdown ? 'snapshot-message--hidden' : ''
        }`}
      >
        Snapshot in {countdown} second{countdown === 1 ? '' : 's'}...
      </p>
      {hasError ? (
        <div role="alert" className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <div className="video-container">
          {shouldShowOverlay && (
            <Overlay backgroundColor="#0000" textColor="#ffff">
              <p>Camera preview will appear here after you click Start.</p>
            </Overlay>
          )}
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
      )}
    </section>
  )
}
