import { Card, CardContent, Stack, Typography } from '@mui/material'
import { NewsletterForm } from './NewsletterForm'
import GitHubIcon from '@mui/icons-material/GitHub'
import XIcon from '@mui/icons-material/X'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DiscordIcon } from '../../common/Icons/DiscordIcon'
import CodeClimbersButton from '../../common/CodeClimbersButton'

const RESOURCES = [
  {
    name: '(Twitter)',
    url: 'https://twitter.com/CodeClimbersIO',
    icon: XIcon,
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/AYd2U26334',
    icon: DiscordIcon,
  },
  {
    name: 'Github',
    url: 'https://github.com/CodeClimbersIO',
    icon: GitHubIcon,
  },
]

export const Resources = () => (
  <Card sx={{ flex: 1, minWidth: 330, boxShadow: 'none', borderRadius: 0 }}>
    <CardContent
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h3">Resources</Typography>
        <Typography variant="caption">
          All the resources you need to get started with Code Climbers!
        </Typography>
        <Grid2 container spacing={2}>
          {RESOURCES.map((resource) => (
            <Grid2 xs={6} key={resource.name}>
              <CodeClimbersButton
                eventName={`resource_${resource.name.toLowerCase()}_click`}
                component="a"
                color="inherit"
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                size="small"
                startIcon={<resource.icon />}
                sx={{
                  borderRadius: 0,
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                {resource.name}
              </CodeClimbersButton>
            </Grid2>
          ))}
        </Grid2>
      </Stack>
      <NewsletterForm />
    </CardContent>
  </Card>
)
