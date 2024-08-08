import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useBrowserPreferences } from './useBrowserPreferences'

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

// Local augmentation of the Window interface
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}

export const useGA4 = () => {
  const { doNotTrack } = useBrowserPreferences()

  useEffect(() => {
    const existingScript = document.getElementById('ga4-script')

    if (doNotTrack) {
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      return
    }

    if (existingScript) {
      return
    }

    // Add Google Analytics 4 script to the document
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    script.id = 'ga4-script'
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []

    const gtag: typeof window.gtag = (...args) => {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Disable automatic page views
    })

    // Clean up
    return () => {
      document.head.removeChild(script)
    }
  }, [doNotTrack])

  /**
   *
   * @param path current path
   * @param qs query string. Needs to start with the `?` character
   */
  const trackPageView = (path: string, qs?: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_location: qs && `${window.location.origin}${path}${qs}`,
        page_title: document.title,
      })
    }
  }

  const trackEvent = (
    eventName: string,
    eventParams: Record<string, unknown> = {},
  ) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams)
    }
  }

  return { trackPageView, trackEvent }
}

export const useAnalyticsPageSubscription = () => {
  const { trackPageView } = useGA4()
  const location = useLocation()
  const previousRef = useRef<string | null>(null)

  const hash = location.pathname + location.search
  if (previousRef.current !== hash) {
    previousRef.current = hash
    trackPageView(location.pathname, location.search)
  }
}
