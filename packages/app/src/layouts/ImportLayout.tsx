import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

interface ImportLayoutProps {
  children?: React.ReactNode
}

function ImportLayout({ children }: ImportLayoutProps) {
  return <Box sx={{ padding: '2rem' }}>{children || <Outlet />}</Box>
}

export default ImportLayout
