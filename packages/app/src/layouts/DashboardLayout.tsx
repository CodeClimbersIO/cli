import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { UpdateBanner } from '../components/common/UpdateBanner/UpdateBanner'
import { LocalApiKeyErrorBanner } from '../components/common/LocalApiKeyErrorBanner'
import { LocalStorageAuthProvider } from '../providers/localStorageAuthProvider'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box sx={{ padding: '2rem' }}>
      <LocalStorageAuthProvider>
        <UpdateBanner />
        <LocalApiKeyErrorBanner />
        {children || <Outlet />}
      </LocalStorageAuthProvider>
    </Box>
  )
}

export default DashboardLayout
