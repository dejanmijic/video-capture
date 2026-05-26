import { type JSX } from 'react'
import './CapturedPhoto.css'
import { Overlay } from '../../../../components/ui/Overlay/Overlay'

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
      <h2 className="captured-photo-title">Captured photo</h2>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
        {!hasPhoto && (
          <Overlay
            backgroundColor="#fdbb30"
            textColor="#000000"
            border="3px dotted #000000"
          >
            <p>Captured photo will appear here.</p>
          </Overlay>
        )}
      </div>
    </div>
  )
}
