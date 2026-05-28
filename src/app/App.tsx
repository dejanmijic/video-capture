import type { JSX } from 'react'
import './App.css'
import { VideoCaptureFeature } from '../features/video-capture/VideoCaptureFeature'

const App = (): JSX.Element => {
  return (
    <main className="app-wrapper">
      <VideoCaptureFeature />
    </main>
  )
}

export default App
