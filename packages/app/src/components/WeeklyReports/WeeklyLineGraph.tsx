import { LineSvgProps, ResponsiveLine } from '@nivo/line'
import { getColorForRating } from '../../api/services/report.service'
import { useTheme } from '@mui/material'
import { DatumValue } from '@nivo/core'

type Props = LineSvgProps & {
  rating: CodeClimbers.WeeklyScoreRating
}

const getEvenValuesBetweenMinAndMax = (min: number, max: number): number[] => {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value')
  }
  const result: number[] = []
  for (let i = Math.ceil(min); i <= max; i++) {
    if (i % 2 === 0) result.push(i)
  }
  return result
}
const getMinMaxFromArray = (
  numbers: DatumValue[],
): { min: number; max: number } => {
  if (numbers.length === 0) {
    throw new Error('Array is empty')
  }

  const min = Math.min(...(numbers as number[]))
  const max = Math.max(...(numbers as number[]))

  return { min, max }
}

export const WeeklyLineGraph = (props: Props) => {
  const theme = useTheme()

  const color = getColorForRating(props.rating)
  const yValues = props.data[0].data
    .map((x) => x.y)
    .filter((x) => x !== undefined && x !== null)
  const { min, max } = getMinMaxFromArray(yValues)
  const yTickValues = getEvenValuesBetweenMinAndMax(min, max)

  return (
    <ResponsiveLine
      margin={{ bottom: 20, left: 30, top: 10, right: 10 }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        format: (x) => `${x}h`,
        tickValues: yTickValues,
      }}
      animate={false}
      colors={`${color.main}`}
      enableGridX={false}
      enableGridY={false}
      enableArea={true}
      areaOpacity={0.05}
      areaBaselineValue={0}
      pointBorderColor={{ from: 'serieColor' }}
      curve="catmullRom"
      theme={{
        axis: {
          ticks: {
            text: {
              fill: theme.palette.text.primary,
            },
          },
        },
      }}
      {...props}
    />
  )
}
