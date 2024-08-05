import { useEffect, useState } from 'react'

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

const CategoryChart = () => {
  const [totalMinutes, setTotalMinutes] = useState(0)

  const { data: categoryOverview = [] as CodeClimbers.TimeOverview[] } =
    useCategoryTimeOverview('2023-11-30', '2023-12-01')

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
    return (getCategoryMinutes(category) / totalMinutes) * 100
  }

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
