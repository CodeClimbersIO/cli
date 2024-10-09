import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

interface ImportLayoutProps {
  children?: React.ReactNode
}

const ImportLayout = ({ children }: ImportLayoutProps) => {
  return <Box sx={{ padding: '2rem' }}>{children || <Outlet />}</Box>
}

export { ImportLayout }
