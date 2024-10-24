import { Box, Typography, Paper, CircularProgress, Link } from '@mui/material'
import { DiscordIcon } from './common/Icons/DiscordIcon'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Logo } from './common/Logo/Logo'
import { CodeSnippit } from './common/CodeSnippit/CodeSnippit'
import { useState } from 'react'
import { isMobile } from '../../../server/utils/environment.util'
import { Navigate } from 'react-router-dom'
import { useGetHealth } from '../services/health.service'
import { CodeClimbersButton } from './common/CodeClimbersButton'

const InstallPage = () => {
  const [isWaiting, setIsWaiting] = useState(false)
  const [displayBlockedMessage, setDisplayBlockedMessage] = useState(false)
  const { data: health } = useGetHealth(
    { retry: isWaiting, refetchInterval: isWaiting ? 1000 : false },
    'install',
  )

  if (health) return <Navigate to="/" />

  const onCopy = () => {
    setIsWaiting(true)
    setTimeout(() => {
      setDisplayBlockedMessage(true)
    }, 5000)
  }
  const desktopBorder = {
    borderBottom: { xs: '1px solid #707070', lg: 'none' },
    borderRight: { xs: 'none', lg: '1px solid #707070' },
  }
  const borderObject = isMobile() ? {} : desktopBorder
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'default',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            pr: { md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 8,
            ...borderObject,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Logo />
          </Box>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '40px', md: '60px' },
                fontWeight: 'bold',
                mb: 6,
              }}
            >
              Spend more
              <br />
              time{' '}
              <Typography
                component="span"
                color="primary.main"
                sx={{
                  fontSize: { xs: '40px', md: '60px' },
                  fontWeight: 'bold',
                }}
              >
                coding
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Track your time and focus better.
              <br />
              Local, private, and open-source.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CodeClimbersButton
                color="inherit"
                eventName="install_discord_click"
                startIcon={<DiscordIcon />}
                href="https://discord.gg/zBnu8jGnHa"
                target="_blank"
              >
                Chat
              </CodeClimbersButton>
              <CodeClimbersButton
                color="inherit"
                eventName="install_github_click"
                startIcon={<GitHubIcon />}
                href="https://github.com/CodeClimbersIO"
                target="_blank"
              >
                Contribute
              </CodeClimbersButton>
            </Box>
            {isMobile() && (
              <Paper sx={{ p: 4, mt: 8, backgroundColor: 'background.paper' }}>
                <Typography>
                  Open this page on a computer to install CodeClimbers.
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
        {!isMobile() && (
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              py: 8,
              px: 6,
              flex: 1,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Paper
                sx={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 3,
                  backgroundColor: 'background.paper',
                  height: '300px',
                }}
              >
                <Box>
                  <Typography variant="h6">Step 1</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, fontSize: '21px', fontWeight: 'bold' }}
                  >
                    <Link
                      href="https://nodejs.org/en/download/"
                      target="_blank"
                      sx={{ textDecoration: 'none', color: 'default' }}
                    >
                      Install Node.js ↗
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    If you don't already have it
                  </Typography>
                </Box>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: 'background.paper',
                  height: '300px',
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography variant="h6">Step 2</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '21px', fontWeight: 'bold' }}
                    >
                      Run
                    </Typography>
                    {isWaiting ? (
                      <Typography variant="body2" color="text.secondary">
                        <CircularProgress size={16} /> waiting for install
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        not installed
                      </Typography>
                    )}
                  </Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1,
                      bgcolor: 'background.default',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <CodeSnippit
                      code="npx codeclimbers start"
                      onCopy={onCopy}
                    />
                  </Paper>
                  {displayBlockedMessage && (
                    <Typography sx={{ mt: 2 }} color="text.secondary">
                      Please make sure your browser and ad blockers are not
                      blocking localhost:14400
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export { InstallPage }
