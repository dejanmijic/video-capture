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
    <>
      <main>
        <div className="wrapper">
          <section>
            <Instructions onStart={startCamera} />
            <VideoPreview
              videoRef={videoRef}
              isRunning={isRunning}
              error={error}
              countdown={countdown}
              hasPhoto={hasPhoto}
            />
            <CapturedPhoto canvasRef={canvasRef} hasPhoto={hasPhoto} />
          </section>
        </div>
      </main>
    </>
  )
}

export default App
