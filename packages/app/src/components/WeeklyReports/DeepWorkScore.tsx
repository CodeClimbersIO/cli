import { Box, Card, CardContent } from '@mui/material'
import { ScoreHeader } from './ScoreHeader'
import { EmptyState } from './EmptyState'
import { WeeklyLineGraph } from './WeeklyLineGraph'
import { Serie } from '@nivo/line'
import { getColorForRating } from '../../api/services/report.service'
import dayjs from 'dayjs'

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
          borderRadius: 0,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '225px',
          }}
        >
          {data.length > 0 ? (
            <WeeklyLineGraph data={data} rating={deepWorkScore.rating} />
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
