import { Box, ToggleButton, Typography } from '@mui/material'
import { GitHubProfileImage } from '../common/GithubProfileImage'

interface Props {
  authorUrl: string
  authorName: string
}

export const AuthorInfo = ({ authorUrl, authorName }: Props) => {
  return (
    <Box
      component="a"
      href={authorUrl}
      target="_blank"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 1,
        textDecoration: 'none',
        '&:hover': {
          borderColor: 'primary.main',
        },
        cursor: 'pointer',
        width: 'fit-content',
      }}
    >
      <GitHubProfileImage url={authorUrl} size={24} />
      <Typography variant="caption" color="text.secondary">
        {authorName}
      </Typography>
    </Box>
  )
}
