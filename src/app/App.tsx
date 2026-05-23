import type { JSX } from 'react'
import './App.css'
import { Instructions } from '../features/video-capture/components/Instructions/Instructions'
import { VideoPreview } from '../features/video-capture/components/VideoPreview/VideoPreview'
import { CapturedPhoto } from '../features/video-capture/components/CapturedImage/CapturedPhoto'

const App = (): JSX.Element => {
  return (
    <>
      <main>
        <div className="wrapper">
          <section>
            <Instructions />
            <VideoPreview />
            <CapturedPhoto />
          </section>
        </div>
      </main>
    </>
  )
}

export default App
