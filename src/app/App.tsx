import type { JSX } from 'react'
import './App.css'
import { Instructions } from '../features/video-capture/components/Instructions/Instructions'
import { VideoPreview } from '../features/video-capture/components/VideoPreview/VideoPreview'

const App = (): JSX.Element => {
  return (
    <>
      <main>
        <div className="wrapper">
          <section>
            <Instructions />
            <VideoPreview />
          </section>
        </div>
      </main>
    </>
  )
}

export default App
