import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

interface BaseLayoutProps {
  children?: React.ReactNode
}

function BaseLayout({ children }: BaseLayoutProps) {
  return <Box sx={{ padding: '2rem' }}>{children || <Outlet />}</Box>
}

export default BaseLayout
