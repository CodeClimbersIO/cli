import { Outlet } from 'react-router-dom'
import { UpdateBanner } from '../components/common/UpdateBanner/UpdateBanner'
import { LocalApiKeyErrorBanner } from '../components/common/LocalApiKeyErrorBanner'
import { LocalStorageAuthProvider } from '../providers/localStorageAuthProvider'
import { useUpdateVersionHook } from '../hooks/useUpdateHook'
import { UpdatePage } from '../components/UpdatePage'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isMajorUpdate, isMinorUpdate } = useUpdateVersionHook()
  if (isMajorUpdate || isMinorUpdate) {
    return <UpdatePage />
  }
  return (
    <>
      <LocalStorageAuthProvider>
        <UpdateBanner />
        <LocalApiKeyErrorBanner />
        {children || <Outlet />}
      </LocalStorageAuthProvider>
    </>
  )
}

export { DashboardLayout }
