import { type JSX } from 'react'
import './CapturedPhoto.css'

type CapturedPhotoProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  hasPhoto: boolean
}

export const CapturedPhoto = ({
  canvasRef,
  hasPhoto,
}: CapturedPhotoProps): JSX.Element => {
  return (
    <div className="wrapper">
      <h2>Captured photo</h2>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
        {!hasPhoto && (
          <div className="photo-placeholder">
            Captured photo will appear here.
          </div>
        )}
      </div>
    </div>
  )
}
