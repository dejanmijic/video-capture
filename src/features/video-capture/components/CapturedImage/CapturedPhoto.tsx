import { useState, type JSX } from 'react'
import './CapturedPhoto.css'

export const CapturedPhoto = (): JSX.Element => {
  const [photoTaken, setPhotoTaken] = useState(false)

  return (
    <div className="wrapper">
      <h2>Captured photo</h2>
      {photoTaken ? (
        <canvas />
      ) : (
        <div className="photo-placeholder">
          Captured photo will appear here.
        </div>
      )}
    </div>
  )
}
