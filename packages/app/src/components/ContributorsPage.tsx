import { Box, Typography } from '@mui/material'
import { SimpleInfoCard, SimpleInfoCardProps } from './common/SimpleInfoCard'
import Grid2 from '@mui/material/Unstable_Grid2'
import { getContributors } from '../services/contributors.service'
import { PlainHeader } from './common/PlainHeader'
import { useTheme } from '@mui/material/styles'

export const ContributorsPage = () => {
  const theme = useTheme()
  const contributors = getContributors()
  const contributorCardData: SimpleInfoCardProps[] = contributors.map(
    (contributor) => ({
      title: contributor.name,
      subTitle: contributor.subTitle,
      subjectUrl: contributor.profileUrl,
      callout: '',
      href: contributor.githubUrl,
    }),
  )
  return (
    <Box sx={{ padding: '2rem' }}>
      <PlainHeader title="Contributors" />
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ mb: 2 }}>
          Thank you to all our amazing contributors!
        </Typography>
        <Grid2 container spacing={2}>
          {contributorCardData.map((contributor) => (
            <Grid2 key={contributor.title} xs={12} sm={6} md={4} lg={3}>
              <SimpleInfoCard
                {...contributor}
                backgroundColor={theme.palette.background.paper}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  )
}
