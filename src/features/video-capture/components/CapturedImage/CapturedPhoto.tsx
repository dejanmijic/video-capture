import { memo, type JSX, type RefObject } from 'react'
import './CapturedPhoto.css'
import { Overlay } from '../../../../components/ui/Overlay/Overlay'

type CapturedPhotoProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  hasPhoto: boolean
}

export const CapturedPhoto = memo(
  ({ canvasRef, hasPhoto }: CapturedPhotoProps): JSX.Element => {
    return (
      <section
        className="full-width flex-column-centered"
        aria-labelledby="captured-photo-title"
      >
        <h2 className="captured-photo-title">Captured photo</h2>
        <div className="media-frame-wrapper canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="media-frame"
            aria-label="Captured camera photo"
            role="img"
          />
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
      </section>
    )
  }
)

CapturedPhoto.displayName = 'CapturedPhoto'
