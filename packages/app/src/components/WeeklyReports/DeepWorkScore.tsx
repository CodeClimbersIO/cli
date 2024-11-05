import { Box, Card, CardContent, Typography } from '@mui/material'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'
import { WeeklyLineGraph } from './WeeklyLineGraph'
import { Serie } from '@nivo/line'
import dayjs from 'dayjs'
import { formatMinutes } from '../../utils/time'
import { getColorForRating } from '../../api/browser/services/report.service'

interface Props {
  deepWorkScore: CodeClimbers.WeeklyScore & {
    breakdown: CodeClimbers.DeepWorkPeriod[]
  }
}

export const DeepWorkScore = ({ deepWorkScore }: Props) => {
  const days = deepWorkScore.breakdown

  const color = getColorForRating(deepWorkScore.rating)
  const data: Serie[] = [
    {
      id: 'deep-work',
      color: color.main,
      data: days.map((day) => ({
        x: dayjs(day.startDate).format('ddd'),
        y: day.time / 60,
      })),
    },
  ]

  const hasNoDeepWork = data.length === 0 || data[0].data.length === 0
  return (
    <Box>
      <ScoreHeader
        title="Deep Work"
        score={deepWorkScore.score}
        rating={deepWorkScore.rating}
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
            display: 'flex',
            flexDirection: 'column',
            height: '250px',
          }}
        >
          {!hasNoDeepWork ? (
            <>
              <Typography sx={{ pl: 2, fontSize: '11px' }}>
                {formatMinutes(deepWorkScore.actual)} avg 5 highest days
              </Typography>
              <WeeklyLineGraph data={data} rating={deepWorkScore.rating} />
            </>
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
