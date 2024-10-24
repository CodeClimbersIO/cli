import { Typography } from '@mui/material'
import { HourlyCategoryReportChart } from './HourlyCategoryReport'

export const HourlyCategoryReport = () => {
  return (
    <div>
      <Typography variant="h3">Hourly Category Report</Typography>
      <div style={{ height: 240 }}>
        <HourlyCategoryReportChart />
      </div>
    </div>
  )
}
