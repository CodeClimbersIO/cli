import { Box, Card, CardContent } from '@mui/material'
import { WeeklyBarGraph } from './WeeklyBarGraph'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'

interface Props {
  growthScore: CodeClimbers.WeeklyScore & {
    breakdown: CodeClimbers.EntityTimeOverviewDB[]
  }
}

export const GrowthScore = ({ growthScore }: Props) => {
  const top5Sites = growthScore.breakdown.slice(0, 5)

  const data = top5Sites.map((site) => ({
    name: site.entity.split('//')[1] || site.entity,
    minutes: site.minutes,
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
            height: '225px',
          }}
        >
          {data.length > 0 ? (
            <WeeklyBarGraph
              rating={growthScore.rating}
              data={data}
              ariaLabel="Growth time breakdown"
              barAriaLabel={(e) =>
                `${e.id}: ${e.formattedValue} in site: ${e.indexValue}`
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
