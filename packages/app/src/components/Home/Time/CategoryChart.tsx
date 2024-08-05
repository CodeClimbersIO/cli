import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
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

  const {
    data: categoryOverview = [] as CodeClimbers.TimeOverview[],
    isPending,
  } = useCategoryTimeOverview(
    selectedDate?.subtract(1, 'day').toISOString() ?? '',
    selectedDate?.toISOString() ?? '',
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
        title="Code"
        time={minutesToHours(getCategoryMinutes(categories.coding))}
        progress={getCategoryPercentage(categories.coding)}
        color="blue"
      />
      <TimeDataChart
        title="Communication"
        time={minutesToHours(getCategoryMinutes(categories.communicating))}
        progress={getCategoryPercentage(categories.communicating)}
        color="purple"
      />
      <TimeDataChart
        title="Browsing"
        time={minutesToHours(getCategoryMinutes(categories.browsing))}
        progress={getCategoryPercentage(categories.browsing)}
        color="green"
      />
      <TimeDataChart
        title="Design"
        time={minutesToHours(getCategoryMinutes(categories.designing))}
        progress={getCategoryPercentage(categories.designing)}
        color="orange"
      />
    </>
  )
}

export default CategoryChart
