import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'

function AppRouter() {
  return (
    <>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </>
  )
}

export default AppRouter
