import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { UpdateBanner } from '../components/common/UpdateBanner/UpdateBanner'

interface BaseLayoutProps {
  children?: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Box sx={{ padding: '2rem' }}>
      <UpdateBanner />
      {children || <Outlet />}
    </Box>
  )
}

export default BaseLayout
