import { Box } from '@mui/material'
import { useGetCurrentUser } from '../../api/browser/user.api'
import { useGetLocalServerWeeklyReport } from '../../api/localServer/report.localapi'
import {
  useGenerateAiWeeklyReport,
  useGetAiWeeklyReport,
} from '../../api/platformServer/weeklyReport.platformApi'
import { useSelectedWeekDate } from '../../hooks/useSelectedDate'
import { PerformanceReviewFax } from '../PerformanceReviewFax'
import { AiReportHeader } from './AiReportHeader'

export const BigBrotherReview = () => {
  const { selectedDate, isCurrentWeek, isMonthAgo } = useSelectedWeekDate()

  const { data: user } = useGetCurrentUser()
  const { data: weeklyScores, isPending } =
    useGetLocalServerWeeklyReport(selectedDate)

  const { data: aiWeeklyReport, isPending: isLoadingAiWeeklyReport } =
    useGetAiWeeklyReport(selectedDate.toISOString(), user?.email)
  const { mutate: generateAiWeeklyReport, isPending: isGeneratingReport } =
    useGenerateAiWeeklyReport()

  if (isPending || !weeklyScores) {
    return <div>Loading</div>
  }
  const reportOff = user?.weeklyReportType !== 'ai'
  const reportMissing = !aiWeeklyReport

  const getReviewContent = () => {
    if (isLoadingAiWeeklyReport) {
      return (
        <AiReportHeader aiButton={{ text: 'Loading...', disabled: true }} />
      )
    }
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

    if (isMonthAgo()) {
      return (
        <AiReportHeader
          aiButton={{
            text: 'Too far back to generate report',
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
              generateAiWeeklyReport({
                email: user?.email,
                startOfWeek: selectedDate.toISOString(),
                weeklyReport: weeklyScores,
              })
            },
            loading: isGeneratingReport,
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
