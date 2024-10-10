import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { useVersionConsoleBanner } from '../hooks/useVersionConsole'

const AppRouter = () => {
  useVersionConsoleBanner()
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export { AppRouter }
