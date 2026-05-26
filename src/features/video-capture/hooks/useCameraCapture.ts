import { useCallback, useRef, useState } from 'react'
import { getCameraErrorMessage } from '../utils/getCameraErrorMessage'

const TIMER_COUNTDOWN = 5 // seconds

export const useCameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  const [error, setError] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [hasPhoto, setHasPhoto] = useState<boolean>(false)

  const clearTimers = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stopCamera = useCallback(() => {
    clearTimers()

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsRunning(false)
    setCountdown(0)
  }, [clearTimers])

  const capturePhoto = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    setHasPhoto(true)
    stopCamera()
  }, [stopCamera])

  const handleErrors = (error: unknown) => {
    clearTimers()
    setIsRunning(false)
    setCountdown(0)
    setError(getCameraErrorMessage(error))
  }

  const startCamera = useCallback(async () => {
    setError('')
    setCountdown(TIMER_COUNTDOWN)
    setHasPhoto(false)
    clearTimers()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
      streamRef.current = stream

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
      timerRef.current = setTimeout(() => {
        capturePhoto()
      }, TIMER_COUNTDOWN * 1000)
    } catch (error: unknown) {
      handleErrors(error)
    }
  }, [capturePhoto, clearTimers])

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
