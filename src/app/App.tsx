import type { JSX } from 'react'
import './App.css'
import { Instructions } from '../features/video-capture/components/Instructions/Instructions'
import { VideoPreview } from '../features/video-capture/components/VideoPreview/VideoPreview'
import { CapturedPhoto } from '../features/video-capture/components/CapturedImage/CapturedPhoto'
import { useCameraCapture } from '../features/video-capture/hooks/useCameraCapture'

const App = (): JSX.Element => {
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
    <main className="wrapper">
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
    </main>
  )
}

export default App
