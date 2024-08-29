import { useEffect, useState } from 'react'
import { CircularProgress, useTheme } from '@mui/material'
import { Dayjs } from 'dayjs'

import { TimeDataChart } from './TimeDataChart'
import { minutesToHours } from './utils'
import { useCategoryTimeOverview } from '../../../api/pulse.api'

const categories = {
  coding: 'coding',
  browsing: 'browsing',
  debugging: 'debugging',
  communicating: 'communicating',
  designing: 'designing', // verify
}

type Props = { selectedDate: Dayjs }
const CategoryChart = ({ selectedDate }: Props) => {
  const [totalMinutes, setTotalMinutes] = useState(0)
  const theme = useTheme()

  const {
    data: categoryOverview = [] as CodeClimbers.TimeOverview[],
    isPending,
  } = useCategoryTimeOverview(
    selectedDate?.toISOString() ?? '',
    selectedDate?.endOf('day').toISOString() ?? '',
  )

  useEffect(() => {
    if (categoryOverview.length > 0)
      setTotalMinutes(
        categoryOverview.reduce((a, b) => {
          return a + b.minutes
        }, 0),
      )
  }, [categoryOverview])

  const getCategoryMinutes = (category = '') => {
    const item = categoryOverview.find((cat) => cat.category === category)
    let minutes = item?.minutes ?? 0

    if (category === categories.coding) {
      const debugItem =
        categoryOverview.find((cat) => cat.category === categories.debugging) ??
        ({ minutes: 0 } as CodeClimbers.TimeOverview)
      minutes += debugItem.minutes
    }

    return minutes
  }

  const getCategoryPercentage = (category = '') => {
    if (totalMinutes > 0)
      return (getCategoryMinutes(category) / totalMinutes) * 100

    return 0
  }

  if (isPending) return <CircularProgress />
  return (
    <>
      <TimeDataChart
        title="Coding"
        time={minutesToHours(getCategoryMinutes(categories.coding))}
        progress={getCategoryPercentage(categories.coding)}
        color={theme.palette.graphColors.blue}
      />
      <TimeDataChart
        title="Communicating"
        time={minutesToHours(getCategoryMinutes(categories.communicating))}
        progress={getCategoryPercentage(categories.communicating)}
        color={theme.palette.graphColors.purple}
      />
      <TimeDataChart
        title="Browsing"
        time={minutesToHours(getCategoryMinutes(categories.browsing))}
        progress={getCategoryPercentage(categories.browsing)}
        color={theme.palette.graphColors.green}
      />
      <TimeDataChart
        title="Designing"
        time={minutesToHours(getCategoryMinutes(categories.designing))}
        progress={getCategoryPercentage(categories.designing)}
        color={theme.palette.graphColors.orange}
      />
    </>
  )
}

export default CategoryChart
