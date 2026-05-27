// src/features/video-capture/utils/getCameraErrorMessage.test.ts

import { describe, expect, it } from 'vitest'
import { getCameraErrorMessage } from './getCameraErrorMessage'

describe('getCameraErrorMessage', () => {
  it('returns default message for non-DOMException errors', () => {
    expect(getCameraErrorMessage('error')).toBe('Unable to access the camera.')
  })

  it('returns blocked message for NotAllowedError', () => {
    const error = new DOMException('', 'NotAllowedError')

    expect(getCameraErrorMessage(error)).toBe(
      'Camera access was blocked. Please allow camera permissions in your browser or system settings.'
    )
  })

  it('returns blocked message for PermissionDeniedError', () => {
    const error = new DOMException('', 'PermissionDeniedError')

    expect(getCameraErrorMessage(error)).toBe(
      'Camera access was blocked. Please allow camera permissions in your browser or system settings.'
    )
  })

  it('returns not found message for NotFoundError', () => {
    const error = new DOMException('', 'NotFoundError')

    expect(getCameraErrorMessage(error)).toBe('No camera device was found.')
  })

  it('returns unavailable message for NotReadableError', () => {
    const error = new DOMException('', 'NotReadableError')

    expect(getCameraErrorMessage(error)).toBe(
      'Camera is currently unavailable.'
    )
  })

  it('returns secure context message for SecurityError', () => {
    const error = new DOMException('', 'SecurityError')

    expect(getCameraErrorMessage(error)).toBe(
      'Camera access requires HTTPS or localhost.'
    )
  })

  it('returns default message for unknown DOMException', () => {
    const error = new DOMException('', 'UnknownError')

    expect(getCameraErrorMessage(error)).toBe('Unable to access the camera.')
  })
})
