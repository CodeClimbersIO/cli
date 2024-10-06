import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
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
}
export const SimpleInfoCard = ({
  subjectUrl,
  title,
  subTitle,
  callout,
  href,
}: SimpleInfoCardProps) => {
  const isGithubUrl = subjectUrl?.includes('github.com')
  console.log(subjectUrl)
  return (
    <Card
      component={href ? 'a' : 'div'}
      href={href}
      sx={{
        boxShadow: 'none',
        borderRadius: '4px',
        backgroundColor: (theme) => theme.palette.background.paper_raised,
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onClick={() => {
        posthog.capture('view_extension_click')
      }}
    >
      <CardContent
        sx={{
          border: '1px solid',
          borderColor: 'transparent',
          '&:hover': {
            borderColor: (theme) => theme.palette.primary.main,
          },
        }}
      >
        <Stack gap={1.5}>
          <HighlightLabel label={callout} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {isGithubUrl ? (
              <GitHubProfileImage url={subjectUrl} size={32} />
            ) : (
              <Avatar src={subjectUrl} />
            )}
            <Stack>
              <Typography sx={{ fontWeight: '400' }}>{title}</Typography>
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
      </CardContent>
    </Card>
  )
}
