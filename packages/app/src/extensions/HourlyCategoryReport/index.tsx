import { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import dayjs from 'dayjs'

import { useGetData } from './hourlyCategoryReport.api'

type Response = { time: string; minutes: number }
type ChartData = { x: number; y: number } // x: hours, y: minutes

export const HourlyCategoryReport = () => {
  const theme = useTheme()

  const [date, setDate] = useState(dayjs().startOf('day'))
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [yIntervals, setYIntervals] = useState<number[]>([2, 4, 6, 8, 10])

  const { mutateAsync: runSql, isPending } = useGetData(
    date.startOf('day').toISOString(),
    date.endOf('day').toISOString(),
  )

  const getYIntervals = (res: Response[]): number[] => {
    const max = Math.max(...res.map((hour) => hour.minutes))

    if (max <= 5) {
      const length = max + 1
      return Array.from({ length }, (v, i) => i)
    }
    if (max < 20) {
      const length = max / 2 + 1

      if (max % 2 > 0) {
        return Array.from({ length }, (v, i) => {
          return Math.round(i * 2) + 1
        })
      }

      return Array.from({ length }, (v, i) => {
        return Math.round(i * 2)
      })
    }

    const interval = max / 8
    return Array.from({ length: 9 }, (v, i) => {
      if (i === 8) {
        return max
      }
      return Math.round(i * interval)
    })
  }

  useEffect(() => {
    const blah = async () => {
      const res: Response[] = await runSql()
      console.log('raw', res)
      if (res?.length > 0) {
        const firstHour = dayjs(res[0]?.time).hour()
        const lastHour = dayjs(res[res.length - 1]?.time).hour()
        if (firstHour < lastHour) {
          const length = lastHour - firstHour + 1
          const basicHours = Array.from({ length }, (v, i) => ({
            x: i + firstHour,
            y:
              res.find((hour) => dayjs(hour.time).hour() === i + firstHour)
                ?.minutes ?? 0,
          }))

          setYIntervals(getYIntervals(res))
          setChartData(basicHours)
        }
        // format the x axis (19 => 7pm)
        // add other categories?
        // make date changeable (or use existing?)
      }
    }
    blah()
  }, [])

  const data = [
    {
      id: 'japan',
      color: theme.palette.graphColors.blue,
      data: chartData,
    },
  ]

  if (isPending)
    return (
      <Box
        sx={{ height: 266 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">Time</Typography>
        <CircularProgress />
      </Box>
    )

  return (
    <div>
      <Typography variant="h3">Hourly Category Report</Typography>
      <div style={{ height: 225 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'time (by hour)',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'minutes',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0,
            tickValues: yIntervals,
          }}
          enableGridY={false}
          enableGridX={false}
          enableSlices="x"
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          colors={Object.values(theme.palette.graphColors)}
          // legends={[
          //   {
          //     anchor: 'bottom-right',
          //     direction: 'column',
          //     justify: false,
          //     translateX: 100,
          //     translateY: 0,
          //     itemsSpacing: 0,
          //     itemDirection: 'left-to-right',
          //     itemWidth: 80,
          //     itemHeight: 20,
          //     itemOpacity: 0.75,
          //     symbolSize: 12,
          //     symbolShape: 'circle',
          //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
          //     effects: [
          //       {
          //         on: 'hover',
          //         style: {
          //           itemBackground: 'rgba(0, 0, 0, .03)',
          //           itemOpacity: 1,
          //         },
          //       },
          //     ],
          //   },
          // ]}
        />
      </div>
    </div>
  )
}
