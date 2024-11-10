import { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Box, CircularProgress, useTheme } from '@mui/material'

import { useSelectedDate } from '../../hooks/useSelectedDate'
import {
  useGetBrowsingData,
  useGetCodingData,
  useGetCommunicatingData,
  useGetDesigningData,
} from './hourlyCategoryReport.api'
import {
  ChartData,
  formatData,
  getChartTheme,
  getYIntervals,
  HourlyResponse,
} from './hourlyCategoryReport.utils'

export const HourlyCategoryReportChart = () => {
  const theme = useTheme()
  const { graphColors } = theme.palette
  const { selectedDate } = useSelectedDate()

  const [chartData, setChartData] = useState<ChartData[]>([])
  const [yIntervals, setYIntervals] = useState<number[]>([2, 4, 6, 8, 10])

  const { data: codingData, isPending: isCodingPending } = useGetCodingData(
    selectedDate.startOf('day').toISOString(),
    selectedDate.endOf('day').toISOString(),
  )
  const { data: browsingData, isPending: isBrowsingPending } =
    useGetBrowsingData(
      selectedDate.startOf('day').toISOString(),
      selectedDate.endOf('day').toISOString(),
    )
  const { data: communicatingData, isPending: isCommunicatingPending } =
    useGetCommunicatingData(
      selectedDate.startOf('day').toISOString(),
      selectedDate.endOf('day').toISOString(),
    )
  const { data: designingData, isPending: isDesigningPending } =
    useGetDesigningData(
      selectedDate.startOf('day').toISOString(),
      selectedDate.endOf('day').toISOString(),
    )

  const isPending =
    isCodingPending ||
    isBrowsingPending ||
    isCommunicatingPending ||
    isDesigningPending
  useEffect(() => {
    const getData = async () => {
      const coding: HourlyResponse[] = codingData || []
      const browsing: HourlyResponse[] = browsingData || []
      const communicating: HourlyResponse[] = communicatingData || []
      const designing: HourlyResponse[] = designingData || []

      const formattedData = formatData(
        [...coding, ...browsing, ...communicating, ...designing],
        theme,
      )

      setYIntervals(getYIntervals([...coding, ...browsing]))
      setChartData(formattedData)
    }
    if (!isPending) {
      getData()
    }
  }, [isPending])

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
    <ResponsiveLine
      data={chartData}
      margin={{ top: 40, right: 20, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
      }}
      curve="cardinal"
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        legend: 'Minutes',
        legendOffset: -40,
        legendPosition: 'middle',
        tickValues: yIntervals,
      }}
      enableGridY={false}
      enableGridX={false}
      pointSize={7}
      pointLabel="data.yFormatted"
      enableTouchCrosshair
      enablePointLabel
      useMesh={true}
      colors={[
        graphColors.blue,
        graphColors.green,
        graphColors.purple,
        graphColors.orange,
      ]}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          translateX: 50,
          translateY: -40,
          itemDirection: 'left-to-right',
          itemWidth: 110,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 7,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      theme={getChartTheme(graphColors)}
    />
  )
}
