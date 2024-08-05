import { CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode, useEffect, useState } from 'react'
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

const queryClient = new QueryClient()

function AppRender() {
  const { prefersDark } = useBrowserPreferences()

  const [theme, setTheme] = useState(prefersDark ? dark : light)

  useEffect(
    function syncFavIcon() {
      const favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement | null

      if (!favicon) return

      favicon.href = prefersDark
        ? '/images/logo-min-white.png'
        : '/images/logo-min.png'
    },
    [prefersDark],
  )

  const changeTheme = () => {
    switch (theme.palette.mode) {
      case 'dark':
        setTheme(light)
        break
      default:
        setTheme(dark)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter changeTheme={changeTheme} />
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
