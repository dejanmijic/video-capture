import { useRef, useState } from 'react'

const TIMER_COUNTDOWN = 5 // seconds

export const useCameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const intervalRef = useRef<number | null>(null)

  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [hasPhoto, setHasPhoto] = useState<boolean>(false)

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    setHasPhoto(true)
  }

  const startCamera = async () => {
    setError('')
    setCountdown(TIMER_COUNTDOWN)
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
      let secondsLeft = TIMER_COUNTDOWN
      intervalRef.current = setInterval(() => {
        secondsLeft -= 1
        setCountdown(secondsLeft)
      }, 1000)
      setTimeout(() => {
        capturePhoto()
      }, TIMER_COUNTDOWN * 1000)
    } catch (error: unknown) {
      setError('Cammera access dennied')
    }
  }

  return {
    videoRef,
    error,
    isRunning,
    startCamera,
    countdown,
    canvasRef,
    hasPhoto,
    capturePhoto,
  }
}
