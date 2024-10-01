import { Box, Typography } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import CodeClimbersButton from '../components/common/CodeClimbersButton'
import { Logo } from '../components/common/Logo/Logo'
import extensionsService from '../services/extensions.service'

interface Props {
  children?: React.ReactNode
}

export const ExtensionsLayout = ({ children }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentExtension = extensionsService.getExtensionByRoute(
    location.pathname,
  )
  const title = currentExtension?.name
  const handleClick = () => {
    navigate('/')
  }

  return (
    <Box sx={{ p: '2rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CodeClimbersButton
          variant="text"
          onClick={handleClick}
          eventName="home_header_logo_click"
        >
          <Logo />
        </CodeClimbersButton>
        <Typography variant="h3">{title}</Typography>
      </Box>
      {children || <Outlet />}
    </Box>
  )
}
