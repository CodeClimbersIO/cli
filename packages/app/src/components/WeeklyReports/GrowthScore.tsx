import { Box, Card, CardContent } from '@mui/material'
import { WeeklyBarGraph } from './WeeklyBarGraph'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'

interface Props {
  growthScore: CodeClimbers.WeeklyScore & {
    breakdown: CodeClimbers.PerProjectTimeOverviewDB[]
  }
}

export const GrowthScore = ({ growthScore }: Props) => {
  const top5Projects = growthScore.breakdown.slice(0, 5)

  const data = top5Projects.map((project) => ({
    name: project.name,
    minutes: project.minutes,
  }))

  return (
    <Box>
      <ScoreHeader
        title="Growth & Mastery"
        score={growthScore.score}
        rating={growthScore.rating}
      />
      <Card
        raised={false}
        sx={{
          boxShadow: 'none',
          borderRadius: 0,
        }}
      >
        <CardContent
          sx={{
            padding: '20px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data.length > 0 ? (
            <WeeklyBarGraph
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
