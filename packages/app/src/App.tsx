import { CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { dark, light } from './config/theme'
import { useBrowserPreferences } from './hooks/useBrowserPreferences'
import { useThemeStorage } from './hooks/useBrowserStorage'
import { initPosthog } from './utils/posthog.util'

const queryClient = new QueryClient()

const FAV_ICONS = {
  white: '/images/logo-min-white.png',
  dark: '/images/logo-min.png',
}

const THEMES = {
  light,
  dark,
}

function AppRender() {
  const { prefersDark } = useBrowserPreferences()
  const [theme] = useThemeStorage()
  initPosthog()
  useEffect(
    function syncFavIcon() {
      const favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement | null

      if (!favicon) return

      favicon.href = FAV_ICONS[prefersDark ? 'white' : 'dark']
    },
    [prefersDark],
  )

  const backupTheme = prefersDark ? 'dark' : 'light'
  const muiTheme = theme ? THEMES[theme] : THEMES[backupTheme]

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRender />
  </StrictMode>,
)
