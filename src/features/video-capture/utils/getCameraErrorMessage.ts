export const getCameraErrorMessage = (error: unknown): string => {
  if (!(error instanceof DOMException)) {
    return 'Unable to access the camera.'
  }

  switch (error.name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return 'Camera access was blocked. Please allow camera permissions in your browser or system settings.'

    case 'NotFoundError':
      return 'No camera device was found.'

    case 'NotReadableError':
      return 'Camera is currently unavailable.'

    case 'SecurityError':
      return 'Camera access requires HTTPS or localhost.'

    default:
      return 'Unable to access the camera.'
  }
}
