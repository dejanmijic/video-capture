import { useRef, useState } from 'react'

const TIMER_COUNTDOWN = 5

export const useCameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const intervalRef = useRef<number | null>(null)

  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [countdown, setCountdown] = useState<number>(0)

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
    } catch (error: unknown) {
      setError('Cammera access dennied')
    }
  }

  return { videoRef, error, isRunning, startCamera, countdown }
}
