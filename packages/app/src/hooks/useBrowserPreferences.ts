import { useState } from 'react'

// Local augmentation of the Window interface
declare global {
  interface Window {
    doNotTrack: string | null
  }
  interface Navigator {
    msDoNotTrack: string | null
  }
}

/**
 * Custom hook to get the browser preferences
 */
export const useBrowserPreferences = () => {
  const [prefersDark] = useState(() => {
    if (!window) return true

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [doNotTrack] = useState(() => {
    if (!window) return false

    // const dnt =
    //   navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack
    // disabled doNotTrack feature until we release publicly
    return false
  })

  return {
    prefersDark,
    doNotTrack,
  }
}
