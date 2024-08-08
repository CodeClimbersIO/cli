import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useBrowserPreferences } from './useBrowserPreferences'
import { useBrowserStorage } from './useBrowserStorage'

const GA_MEASUREMENT_ID = 'G-4NCB9KS9W6'
const SCRIPT_ID = 'gta4-id'

// Local augmentation of the Window interface
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}

// We can generate a client ID instead of using cookies and put it
// in local storage. No reason for a cookie banner then.
const randomUUID = () => {
  // CoPilot generated
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const useGA4 = () => {
  const { doNotTrack } = useBrowserPreferences()
  // Queue things up if window.gtag doesn't exist yet, and handle it at the end of the effect.
  const queue = useRef<Parameters<typeof window.gtag>>([])
  const [clientId] = useBrowserStorage({
    key: 'ga4-clientID',
    value: randomUUID(),
    setValueOnEmpty: true,
  })

  useEffect(() => {
    const existingScript = document.getElementById(SCRIPT_ID)

    if (doNotTrack) {
      if (existingScript) document.head.removeChild(existingScript)
      return
    }

    if (existingScript) {
      return
    }

    window.dataLayer = window.dataLayer || []
    const gtag = function () {
      // eslint-disable-next-line
      window.dataLayer.push(arguments);
    } as typeof window.gtag

    window.gtag = gtag

    // Add Google Analytics 4 script to the document
    const script = document.createElement('script')

    const controller = new AbortController()
    // Run it on load to avoid running before script is loaded.
    script.addEventListener(
      'load',
      () => {
        gtag('js', new Date())
        gtag('config', GA_MEASUREMENT_ID, {
          send_page_view: false, // Disable automatic page views
          client_storage: 'none',
          client_id: clientId,
          domain: 'none',
          first_party_collection: false,
          anonymize_ip: true,
        })

        if (!queue.current?.length) {
          return
        }

        queue.current.forEach((event) => {
          window.gtag(...event)
        })
        queue.current = []
      },
      {
        signal: controller.signal,
      },
    )

    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    script.id = SCRIPT_ID
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
      controller.abort()
    }
  }, [doNotTrack])

  // Be respectful of DNT and add to queue if the script hasn't loaded yet.
  const executeGTag = (...event: [string, string, object]) => {
    if (doNotTrack) return

    if (typeof window.gtag !== 'function') {
      return queue.current.push(event)
    }

    window.gtag(...event)
  }

  /**
   *
   * @param path current path
   * @param qs query string. Needs to start with the `?` character
   */
  const trackPageView = (path: string, qs?: string) => {
    executeGTag('event', 'page_view', {
      page_path: path,
      page_location: qs && `${window.location.origin}${path}${qs}`,
      page_title: document.title,
    })
  }

  const trackEvent = (
    eventName: string,
    eventParams: Record<string, unknown> = {},
  ) => {
    executeGTag('event', eventName, eventParams)
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
