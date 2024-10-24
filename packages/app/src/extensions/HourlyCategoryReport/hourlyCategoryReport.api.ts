import { sqlQueryFn } from '@app/api/browser/services/query.service'
import { useMutation } from '@tanstack/react-query'

export const useGetData = (startDate: string, endDate: string) => {
  const query = `WITH getMinutes (minutes, time) AS (
      SELECT category, time
      FROM activities_pulse
      WHERE activities_pulse.time BETWEEN '${startDate}' AND '${endDate}'
        and (category is 'coding' or category is 'debugging')
      GROUP BY strftime('%s', time) / 120)
  SELECT time, count() * 2 as minutes
  FROM getMinutes
  GROUP BY strftime('%s', time) / 3600
  ORDER BY time;`

  return useMutation({
    mutationFn: () => sqlQueryFn(query, 'hourlyCategoryReport'),
  })
}
