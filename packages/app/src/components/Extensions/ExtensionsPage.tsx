import { Box, Typography } from '@mui/material'
import CodeClimbersButton from '../common/CodeClimbersButton'
import { Logo } from '../common/Logo/Logo'
import { useNavigate } from 'react-router-dom'
import extensionsService from '../../services/extensions.service'
import { ExtensionDetail } from './ExtensionDetail'

export const ExtensionsPage = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  const extensions = extensionsService.extensions
  return (
    <Box sx={{ padding: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          alignItems: 'center',
        }}
      >
        <CodeClimbersButton
          variant="text"
          onClick={handleClick}
          eventName="home_header_logo_click"
        >
          <Logo />
        </CodeClimbersButton>
        <Typography variant="h4">Extensions</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, marginTop: 4 }}>
        {extensions.map((extension) => (
          <ExtensionDetail key={extension.id} extension={extension} />
        ))}
      </Box>
    </Box>
  )
}
