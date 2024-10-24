import { sqlQueryFn } from '@app/api/browser/services/query.service'
import { useMutation } from '@tanstack/react-query'

const getQuery = (startDate: string, endDate: string, category: string) => 
  `WITH getMinutes (category, time) AS (
    SELECT category, time
    FROM activities_pulse
    WHERE activities_pulse.time BETWEEN '${startDate}' AND '${endDate}'
      AND ${category}
    GROUP BY strftime('%s', time) / 120)
  SELECT category, time, count() * 2 AS minutes
  FROM getMinutes
  GROUP BY strftime('%s', time) / 3600
  ORDER BY time;`

export const useGetCodingData = (startDate: string, endDate: string) => {
  const query = getQuery(startDate, endDate, "(category is 'coding' or category is 'debugging')")

  return useMutation({
    mutationFn: () => sqlQueryFn(query, 'hourlyCategoryReport-coding'),
  })
}

export const useGetBrowsingData = (startDate: string, endDate: string) => {
  const query = getQuery(startDate, endDate, "category is 'browsing'")

  return useMutation({
    mutationFn: () => sqlQueryFn(query, 'hourlyCategoryReport-browsing'),
  })
}

export const useGetCommunicatingData = (startDate: string, endDate: string) => {
  const query = getQuery(startDate, endDate, "category is 'communicating'")

  return useMutation({
    mutationFn: () => sqlQueryFn(query, 'hourlyCategoryReport-communicating'),
  })
}

export const useGetDesigningData = (startDate: string, endDate: string) => {
  const query = getQuery(startDate, endDate, "category is 'designing'")

  return useMutation({
    mutationFn: () => sqlQueryFn(query, 'hourlyCategoryReport-designing'),
  })
}
