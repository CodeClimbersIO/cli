import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { useGetHealth } from '../api/health.api'
import InstallPage from '../components/Home/InstallPage'

function AppRouter() {
  const { data: health } = useGetHealth()

  let defaultRoute = <AppRoutes />
  if (!health) defaultRoute = <InstallPage />

  return (
    <>
      <HashRouter>{defaultRoute}</HashRouter>
    </>
  )
}

export default AppRouter
