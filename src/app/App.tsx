import type { JSX } from 'react'
import './App.css'
import { Instructions } from '../features/video-capture/components/Instructions/Instructions'

const App = (): JSX.Element => {
  return (
    <>
      <main>
        <div className="wrapper">
          <section>
            <Instructions />
          </section>
        </div>
      </main>
    </>
  )
}

export default App
