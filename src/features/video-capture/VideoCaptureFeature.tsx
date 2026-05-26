import type { JSX } from 'react'
import { useCameraCapture } from './hooks/useCameraCapture'
import { Instructions } from './components/Instructions/Instructions'
import { VideoPreview } from './components/VideoPreview/VideoPreview'
import { CapturedPhoto } from './components/CapturedImage/CapturedPhoto'

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
  return (
    <section>
      <Instructions
        hasError={Boolean(error)}
        isRunning={isRunning}
        onStart={startCamera}
      />
      <VideoPreview
        videoRef={videoRef}
        isRunning={isRunning}
        error={error}
        countdown={countdown}
        hasPhoto={hasPhoto}
      />
      <CapturedPhoto canvasRef={canvasRef} hasPhoto={hasPhoto} />
    </section>
  )
}
