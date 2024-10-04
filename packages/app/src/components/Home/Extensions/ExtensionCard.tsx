import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { GitHubProfileImage } from '../../common/GithubProfileImage'
import { HighlightLabel } from '../../common/HighlightLabel'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

export interface ExtensionCardProps {
  subjectUrl: string
  title: string
  subTitle: string
  callout: string
}
export const ExtensionCard = ({
  subjectUrl,
  title,
  subTitle,
  callout,
}: ExtensionCardProps) => {
  const navigate = useNavigate()

  const isGithubUrl = subjectUrl?.includes('github.com')
  return (
    <Card
      sx={{
        boxShadow: 'none',
        borderRadius: '4px',
        backgroundColor: (theme) => theme.palette.background.paper_raised,
        cursor: 'pointer',
      }}
      onClick={() => {
        navigate(`/extensions`)
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
              <Typography variant="caption">{subTitle}</Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
