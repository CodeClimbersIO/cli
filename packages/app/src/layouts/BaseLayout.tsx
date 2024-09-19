import { Outlet } from 'react-router-dom'
import { useAuthGuard } from '../hooks/useAuthGuard'
import { LoadingScreen } from '../components/LoadingScreen'

interface BaseLayoutProps {
  children?: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  const [hasAuth, isPending] = useAuthGuard()

  if (isPending) {
    return <LoadingScreen />
  }
  if (!hasAuth) {
    console.log('no auth')
    // TODO: redirect to install page
    // return <Navigate to="/import" />
  }
  return <>{children || <Outlet />}</>
}

export default BaseLayout
