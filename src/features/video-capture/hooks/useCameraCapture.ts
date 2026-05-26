import { useCallback, useEffect, useRef, useState } from 'react'
import { getCameraErrorMessage } from '../utils/getCameraErrorMessage'

const TIMER_COUNTDOWN = 5

export const useCameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [error, setError] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [hasPhoto, setHasPhoto] = useState<boolean>(false)

  const clearTimers = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const cleanupCameraTracksAndVideoRef = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  const stopCamera = useCallback(() => {
    clearTimers()
    cleanupCameraTracksAndVideoRef()
    setIsRunning(false)
    setCountdown(0)
  }, [clearTimers, cleanupCameraTracksAndVideoRef])

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

  const startCamera = useCallback(async () => {
    setError('')
    setCountdown(TIMER_COUNTDOWN)
    setHasPhoto(false)
    clearTimers()
    cleanupCameraTracksAndVideoRef()

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
        setCountdown(Math.max(secondsLeft, 0))
      }, 1000)

      timeoutRef.current = setTimeout(() => {
        capturePhoto()
      }, TIMER_COUNTDOWN * 1000)
    } catch (error: unknown) {
      clearTimers()
      cleanupCameraTracksAndVideoRef()
      setIsRunning(false)
      setCountdown(0)
      setError(getCameraErrorMessage(error))
    }
  }, [capturePhoto, clearTimers, cleanupCameraTracksAndVideoRef])

  // cleanup camera on unmount
  useEffect(() => {
    return () => {
      clearTimers()
      cleanupCameraTracksAndVideoRef()
    }
  }, [clearTimers, cleanupCameraTracksAndVideoRef])

  return {
    videoRef,
    canvasRef,
    error,
    isRunning,
    countdown,
    hasPhoto,
    startCamera,
    stopCamera,
    capturePhoto,
  }
}
