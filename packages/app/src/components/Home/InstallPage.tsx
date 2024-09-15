import { Box, Typography, Paper, CircularProgress, Link } from '@mui/material'
import { DiscordIcon } from '../common/Icons/DiscordIcon'
import GitHubIcon from '@mui/icons-material/GitHub'
import CodeClimbersButton from '../common/CodeClimbersButton'
import { Logo } from '../common/Logo/Logo'
import { CodeSnippit } from '../common/CodeSnippit/CodeSnippit'
import { useState } from 'react'

const InstallPage = () => {
  const [isWaiting, setIsWaiting] = useState(false)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1d1d1d',
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
            background:
              'url(/assets/background_install.png) repeat center center',
            borderBottom: { xs: '1px solid #707070', lg: 'none' },
            borderRight: { xs: 'none', lg: '1px solid #707070' },
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
          </Box>
        </Box>
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
                backgroundColor: '#262626',
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
                    sx={{ textDecoration: 'none', color: 'white' }}
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
                backgroundColor: '#262626',
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
                    <Typography variant="body2" color="#FFC9BD">
                      <CircularProgress size={16} /> waiting for install
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="#FFC9BD">
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
                    onCopy={() => {
                      setIsWaiting(true)
                    }}
                  />
                </Paper>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default InstallPage
