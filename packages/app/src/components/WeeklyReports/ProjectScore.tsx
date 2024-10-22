import { Box, Card, CardContent, Typography } from '@mui/material'
import { WeeklyBarGraph } from './WeeklyBarGraph'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'
import { formatMinutes } from '../../utils/time'

interface Props {
  projectScore: CodeClimbers.WeeklyScore & {
    breakdown: CodeClimbers.PerProjectTimeOverviewDB[]
  }
}

export const ProjectScore = ({ projectScore }: Props) => {
  const knownProjects = projectScore.breakdown.filter(
    ({ name }) => !name.toLowerCase().includes('<<'),
  )
  const top5Projects = knownProjects.slice(0, 5)

  const data = top5Projects.map((project) => ({
    name: project.name,
    minutes: project.minutes,
  }))

  return (
    <Box sx={{ width: '100%' }}>
      <ScoreHeader
        title="Coding"
        score={projectScore.score}
        rating={projectScore.rating}
      />
      <Card
        raised={false}
        sx={{
          boxShadow: 'none',
          backgroundColor: (theme) => theme.palette.background.paper_raised,
        }}
      >
        <CardContent
          sx={{
            padding: '20px 30px',
            display: 'flex',
            flexDirection: 'column',
            height: '225px',
          }}
        >
          {data.length > 0 ? (
            <>
              <Typography sx={{ pl: 2, fontSize: '11px' }}>
                {formatMinutes(projectScore.actual)} total
              </Typography>
              <WeeklyBarGraph
                rating={projectScore.rating}
                data={data}
                ariaLabel="Project time breakdown"
                barAriaLabel={(e) =>
                  `${e.id}: ${e.formattedValue} in project: ${e.indexValue}`
                }
              />
            </>
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
