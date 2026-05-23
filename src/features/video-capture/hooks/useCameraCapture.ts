import { useRef, useState } from 'react'

export const useCameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const startCamera = async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsRunning(true)
    } catch (error: unknown) {
      setError('Cammera access dennied')
    }
  }

  return { videoRef, error, isRunning, startCamera }
}
