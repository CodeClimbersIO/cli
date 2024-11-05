import { Avatar, Box, Card, Stack, Typography } from '@mui/material'
import { GitHubProfileImage } from './GithubProfileImage'
import { HighlightLabel } from './HighlightLabel'
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

export interface SimpleInfoCardProps {
  subjectUrl: string
  title: string
  subTitle: string
  callout: string
  href?: string
  backgroundColor?: string
}
export const SimpleInfoCard = ({
  subjectUrl,
  title,
  subTitle,
  callout,
  href,
  backgroundColor,
}: SimpleInfoCardProps) => {
  const isGithubUrl = subjectUrl?.includes('github.com')
  return (
    <Card
      component={href ? 'a' : 'div'}
      href={href}
      sx={{
        boxShadow: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onClick={() => {
        posthog.capture('view_extension_click')
      }}
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'transparent',
          backgroundColor: (theme) =>
            backgroundColor || theme.palette.background.paper_raised,
          '&:hover': {
            borderColor: (theme) => theme.palette.primary.main,
          },
        }}
      >
        <Stack gap={1.5} sx={{ p: 2 }}>
          {callout && <HighlightLabel label={callout} />}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isGithubUrl ? (
              <GitHubProfileImage url={subjectUrl} size={32} />
            ) : (
              <Avatar src={subjectUrl} />
            )}
            <Stack>
              <Typography
                sx={{
                  overflow: 'hidden',
                  fontWeight: '400',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
                title={subTitle}
              >
                {subTitle}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Card>
  )
}
