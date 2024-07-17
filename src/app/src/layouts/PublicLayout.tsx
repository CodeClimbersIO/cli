import { Box, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import { DarkMode } from '@mui/icons-material'

interface BaseLayoutProps {
  children?: React.ReactNode
  changeTheme: () => void
}

function BaseLayout({ children, changeTheme }: BaseLayoutProps) {
  const isDarkTheme = useTheme().palette.mode === 'dark'

  return (
    <>
      <Box>{children || <Outlet />}</Box>
      <Box
        sx={{
          bottom: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            cursor: 'pointer',
          }}
          onClick={changeTheme}
        >
          {isDarkTheme ? <LightModeIcon /> : <DarkMode />}
        </Box>
      </Box>
    </>
  )
}

export default BaseLayout
