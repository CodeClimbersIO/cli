import { useLayoutEffect, useState } from 'react'

const PREFERS_DARK = '(prefers-color-scheme: dark)'

/**
 * Custom hook to get the browser preferences
 */
export const useBrowserPreferences = () => {
  const [prefersDark, setPrefersDark] = useState(() => {
    if (!window) return

    return window.matchMedia(PREFERS_DARK).matches
  })

  useLayoutEffect(() => {
    if (!window) {
      return
    }

    setPrefersDark(window.matchMedia(PREFERS_DARK).matches)
  }, [])

  return {
    prefersDark,
  }
}
