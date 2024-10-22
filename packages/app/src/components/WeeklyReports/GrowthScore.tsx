import { Box, Card, CardContent, Typography } from '@mui/material'
import { WeeklyBarGraph } from './WeeklyBarGraph'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'
import { formatMinutes } from '../../utils/time'

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
                {formatMinutes(growthScore.actual)} total
              </Typography>
              <WeeklyBarGraph
                rating={growthScore.rating}
                data={data}
                ariaLabel="Growth time breakdown"
                barAriaLabel={(e) =>
                  `${e.id}: ${e.formattedValue} in site: ${e.indexValue}`
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
