import type { JSX } from 'react'
import './VideoCaptureFeature.css'
import { useCameraCapture } from './hooks/useCameraCapture'
import { Instructions } from './components/Instructions/Instructions'
import { VideoPreview } from './components/VideoPreview/VideoPreview'
import { CapturedPhoto } from './components/CapturedImage/CapturedPhoto'
import { ErrorMessage } from '../../components/ui/ErrorMessage/ErrorMessage'

export const VideoCaptureFeature = (): JSX.Element => {
  const {
    videoRef,
    error,
    isRunning,
    startCamera,
    canvasRef,
    countdown,
    hasPhoto,
  } = useCameraCapture()
  const hasError = Boolean(error)
  return (
    <section className="video-capture-wrapper flex-column-centered">
      <h1>Video capture</h1>
      <Instructions
        hasError={hasError}
        isRunning={isRunning}
        onStart={startCamera}
      />
      {hasError ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <VideoPreview
          videoRef={videoRef}
          isRunning={isRunning}
          error={error}
          countdown={countdown}
          hasPhoto={hasPhoto}
        />
      )}
      <CapturedPhoto canvasRef={canvasRef} hasPhoto={hasPhoto} />
    </section>
  )
}
