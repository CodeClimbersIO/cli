import { CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { dark, light } from './config/theme'

const queryClient = new QueryClient()

function AppRender() {
  const [theme, setTheme] = useState(light)

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
