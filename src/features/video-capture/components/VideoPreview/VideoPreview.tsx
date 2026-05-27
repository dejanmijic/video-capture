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
  const shouldHideCountdown = (countdown === 0 && !isRunning) || error
  const shouldShowOverlay = !isRunning || hasPhoto

  return (
    <section
      className="full-width flex-column-centered"
      aria-labelledby="video-preview-title"
    >
      <h2>Live video preview</h2>
      <p
        className={`snapshot-message ${
          shouldHideCountdown ? 'snapshot-message--hidden' : ''
        }`}
        aria-live="polite"
      >
        Snapshot in <span className="countdown">{countdown}</span> second
        {countdown === 1 ? '' : 's'}...
      </p>
      <div className="media-frame-wrapper video-wrapper">
        {shouldShowOverlay && (
          <Overlay backgroundColor="#0000" textColor="#ffff">
            <p>Camera preview will appear here after you click Start.</p>
          </Overlay>
        )}
        <video
          ref={videoRef}
          className="media-frame"
          autoPlay
          playsInline
          muted
        />
      </div>
    </section>
  )
}
