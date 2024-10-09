import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { DiscordIcon } from '../../common/Icons/DiscordIcon'
import CodeClimbersIconButton from '../../common/CodeClimbersIconButton'
import extensionsService from '../../../services/extensions.service'
import CodeClimbersButton from '../../common/CodeClimbersButton'
import contributorsService from '../../../services/contributors.service'
import {
  SimpleInfoCard,
  SimpleInfoCardProps,
} from '../../common/SimpleInfoCard'

const RESOURCES = [
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

const spotlightContributor = contributorsService.getSpotlight()

export const ExtensionsWidget = () => {
  const newestExtension = extensionsService.getNewestExtension()
  const popularExtension = extensionsService.getPopularExtension()
  const extensionCardData: SimpleInfoCardProps[] = []

  if (popularExtension) {
    extensionCardData.push({
      subjectUrl: popularExtension.authorUrl,
      title: popularExtension.name,
      subTitle: `by ${popularExtension.authorName}`,
      callout: 'popular extension',
      href: '/extensions',
    })
  }
  if (newestExtension) {
    extensionCardData.push({
      subjectUrl: newestExtension.authorUrl,
      title: newestExtension.name,
      subTitle: `by ${newestExtension.authorName}`,
      callout: 'newest extension',
      href: '/extensions',
    })
  }

  if (spotlightContributor) {
    extensionCardData.push({
      subjectUrl: spotlightContributor.profileUrl,
      title: spotlightContributor.name,
      subTitle: spotlightContributor.subTitle,
      callout: 'spotlight contributor ♥',
      href: `/contributors`,
    })
  }

  return (
    <Card sx={{ flex: 1, minWidth: 330, boxShadow: 'none', borderRadius: 0 }}>
      <CardContent
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          height: '100%',
          gap: 2,
        }}
      >
        <Stack sx={{ width: '100%', gap: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h3">Extensions</Typography>
              <Grid2 container spacing={2}>
                {RESOURCES.map((resource) => (
                  <Grid2 xs={6} key={resource.name}>
                    <CodeClimbersIconButton
                      eventName={`resource_${resource.name.toLowerCase()}_click`}
                      component="a"
                      color="inherit"
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      size="small"
                    >
                      <resource.icon />
                    </CodeClimbersIconButton>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Stack>
          <Stack spacing={2}>
            {extensionCardData.map((extension) => (
              <SimpleInfoCard key={extension.title} {...extension} />
            ))}
          </Stack>
        </Stack>
        <CodeClimbersButton
          eventName="view_all_extensions_click"
          component="a"
          color="inherit"
          href="/extensions"
          rel="noreferrer"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          See all extensions →
        </CodeClimbersButton>
      </CardContent>
    </Card>
  )
}
