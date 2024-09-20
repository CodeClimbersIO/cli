import { Box, Card, CardContent, Typography } from '@mui/material'
import CodeClimbersButton from './common/CodeClimbersButton'
import { Logo } from './common/Logo/Logo'
import { useNavigate } from 'react-router-dom'
import { useUpdateVersionHook } from '../hooks/useUpdateHook'
import { CodeSnippit } from './common/CodeSnippit/CodeSnippit'

// Used to display when an update is not just available, but required.
export const UpdatePage = () => {
  const { remoteVersion, localVersion } = useUpdateVersionHook()
  const navigate = useNavigate()
  const handleHomeClick = () => {
    navigate('/')
  }
  const updateCommand = `
    npx codeclimbers startup:disable &&
    npx codeclimbers@${remoteVersion.data} start
  `
  return (
    <Box
      display="flex"
      sx={{ flexDirection: 'column', alignItems: 'flex-start', p: '2rem' }}
    >
      <CodeClimbersButton
        variant="text"
        onClick={handleHomeClick}
        eventName="home_header_logo_click"
      >
        <Logo />
      </CodeClimbersButton>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: 0,
          minWidth: 335,
          flex: 1,
          mt: 2,
        }}
      >
        <CardContent
          sx={{
            padding: '24px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', pb: '1rem' }}
            color="primary"
          >
            New Version Available: {remoteVersion.data}
          </Typography>
          <Typography variant="body1" sx={{ pb: '.5rem' }}>
            Your version of CodeClimbers -- {localVersion} -- requires an update
            to continue.
          </Typography>
          <Typography variant="body1" sx={{ pb: '1rem' }}>
            Run the following command to update
          </Typography>
          <CodeSnippit code={updateCommand} />
          <Typography variant="body1" sx={{ pt: '1rem' }}>
            Then reload the page
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
