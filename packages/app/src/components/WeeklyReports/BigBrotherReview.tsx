import { Box } from '@mui/material'
import { useGetCurrentUser } from '../../api/browser/user.api'
import { useGetLocalServerWeeklyReport } from '../../api/localServer/report.localapi'
import { useGetAiWeeklyReport } from '../../api/platformServer/weeklyReport.platformApi'
import { useSelectedWeekDate } from '../../hooks/useSelectedDate'
import { PerformanceReviewFax } from '../PerformanceReviewFax'
import { AiReportHeader } from './AiReportHeader'

export const BigBrotherReview = () => {
  const { selectedDate, isCurrentWeek } = useSelectedWeekDate()

  const { data: user } = useGetCurrentUser()
  const { data: weeklyScores, isPending } =
    useGetLocalServerWeeklyReport(selectedDate)
  const { data: aiWeeklyReport } = useGetAiWeeklyReport(
    selectedDate.toISOString(),
    user?.email,
  )

  if (isPending || !weeklyScores) {
    return <div>Loading</div>
  }
  const reportOff = user?.weeklyReportType !== 'ai'
  const reportMissing = !aiWeeklyReport

  const getReviewContent = () => {
    if (reportOff) {
      return (
        <AiReportHeader
          aiButton={{ text: 'Try Big Brother Report' }}
          showCloseButton
          openWeeklyReportModal
        />
      )
    }

    if (isCurrentWeek()) {
      return (
        <AiReportHeader
          aiButton={{
            text: 'Wait until the week is completed',
            disabled: true,
          }}
        />
      )
    }

    if (reportMissing) {
      return (
        <AiReportHeader
          aiButton={{
            text: 'Generate Big Brother Report',
            onClick: () => {
              console.log('Generate Big Brother Report')
            },
          }}
        />
      )
    }

    return <PerformanceReviewFax performanceReview={aiWeeklyReport || ''} />
  }

  return (
    <Box sx={{ flex: 1, maxWidth: '500px', width: '100%', my: 2 }}>
      {getReviewContent()}
    </Box>
  )
}
