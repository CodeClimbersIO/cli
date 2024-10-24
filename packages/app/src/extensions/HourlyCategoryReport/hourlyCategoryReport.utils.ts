import { GraphColors } from '../../config/theme'
import {
  categories,
  simplifiedCategories,
  typeColors,
} from '../../utils/categories'
import { Theme } from '@mui/material'
import dayjs from 'dayjs'

export type HourlyResponse = { category: string; time: string; minutes: number }
export type DataPoint = { x: string; y: number } // x: hour, y: minutes
export type ChartData = {
  id: string
  color: string
  data: DataPoint[]
  rawData?: HourlyResponse[]
}

const getXLabel = (hour: number): string => {
  if (hour < 12) return `${hour} am`
  if (hour === 12) return `${hour} pm`
  return `${hour - 12} pm`
}

export const formatData = (
  hourlyData: HourlyResponse[],
  theme: Theme,
): ChartData[] => {
  if (hourlyData?.length === 0) return []

  const timeByCategory = Object.values(simplifiedCategories)
    .map((category) => ({
      id: category,
      color:
        typeColors(theme).find((typeColor) => typeColor.category === category)
          ?.color ?? theme.palette.graphColors.blue,
      rawData: hourlyData.filter((item) => {
        if (category === categories.coding)
          return (
            item.category === category || item.category === categories.debugging
          )
        return item.category === category
      }),
      data: [] as DataPoint[],
    }))
    .filter((category) => category.rawData.length > 0)

  const firstHour = dayjs(hourlyData[0]?.time).hour()
  const lastHour = dayjs(hourlyData[hourlyData.length - 1]?.time).hour()
  const length = lastHour - firstHour + 1

  timeByCategory.forEach((category) => {
    if (category.rawData.length === 0) return

    const basicHours = Array.from({ length }, (_, index) => ({
      x: getXLabel(index + firstHour),
      y:
        category.rawData.find(
          (hour) => dayjs(hour.time).hour() === index + firstHour,
        )?.minutes ?? 0,
    }))
    category.data = basicHours
  })

  return timeByCategory
}

export const getYIntervals = (res: HourlyResponse[]): number[] => {
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

export const getChartTheme = (graphColors: GraphColors) => ({
  text: { fill: graphColors.grey },
  axis: {
    ticks: {
      text: {
        fill: graphColors.grey,
      },
      line: {
        stroke: graphColors.grey,
      },
    },
    domain: {
      line: {
        stroke: graphColors.grey,
      },
    },
    legend: {
      text: {
        fill: graphColors.grey,
      },
    },
  },
  tooltip: {
    container: {
      color: 'black',
      fontSize: 12,
    },
  },
})
