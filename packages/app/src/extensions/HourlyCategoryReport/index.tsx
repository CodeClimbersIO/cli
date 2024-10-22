import { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Box, CircularProgress, useTheme } from '@mui/material'
import dayjs from 'dayjs'

import { useGetData } from './hourlyCategoryReport.api'

type Response = { time: string; minutes: number }
type ChartData = { x: number; y: number } // x: hours, y: minutes

export const HourlyCategoryReport = () => {
  const theme = useTheme()

  const [date, setDate] = useState(dayjs().startOf('day'))
  const [chartData, setChartData] = useState<ChartData[]>([])

  const { mutateAsync: runSql, isPending } = useGetData(
    date.startOf('day').toISOString(),
    date.endOf('day').toISOString(),
  )

  useEffect(() => {
    const blah = async () => {
      const res: Response[] = await runSql()
      console.log('raw', res)
      if (res?.length > 0) {
        const firstHour = dayjs(res[0]?.time).hour()
        const lastHour = dayjs(res[-1]?.time).hour()
        console.log(firstHour)
        console.log(lastHour)

        const blah = res.map((hour) => ({
          x: dayjs(hour.time).hour(),
          y: hour.minutes,
        }))
        console.log('map', blah)
        setChartData(blah)
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
        <CircularProgress />
      </Box>
    )

  return (
    <div>
      This is a super cool extension!
      <div style={{ height: 250 }}>
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
