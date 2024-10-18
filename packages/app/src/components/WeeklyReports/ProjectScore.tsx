import { Box, Card, CardContent } from '@mui/material'
import { WeeklyBarGraph } from './WeeklyBarGraph'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'

interface Props {
  projectScore: CodeClimbers.WeeklyScore & {
    breakdown: CodeClimbers.PerProjectTimeOverviewDB[]
  }
}

export const ProjectScore = ({ projectScore }: Props) => {
  const top5Projects = projectScore.breakdown.slice(0, 5)

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
            alignItems: 'center',
            height: '225px',
          }}
        >
          {data.length > 0 ? (
            <WeeklyBarGraph
              rating={projectScore.rating}
              data={data}
              ariaLabel="Project time breakdown"
              barAriaLabel={(e) =>
                `${e.id}: ${e.formattedValue} in project: ${e.indexValue}`
              }
            />
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
