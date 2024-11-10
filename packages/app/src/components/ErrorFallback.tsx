import { Box, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useGetCurrentUser } from '../api/browser/user.api'
import { useSendPlatformErrorReport } from '../api/platformServer/errorReport.platformApi'
import { useState } from 'react'
import { CodeClimbersLoadingButton } from './common/CodeClimbersLoadingButton'

export const ErrorFallback = (props: {
  error: Error
  resetErrorBoundary: () => void
}) => {
  const [reportStatus, setReportStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const queryClient = useQueryClient()
  const queryCache = queryClient.getQueryCache().getAll()

  const { data: user } = useGetCurrentUser()
  const { mutateAsync: sendPlatformErrorReport, isPending } =
    useSendPlatformErrorReport()

  const sendErrorReport = async () => {
    if (!user) return
    try {
      const userEmail = user?.email
      // Get React Query cache

      const report = {
        error: props.error.toString(),
        errorStack: props.error.stack,
        queryCache,
        userEmail,
        timestamp: new Date().toISOString(),
      }

      await sendPlatformErrorReport(report)

      setReportStatus('success')
    } catch (e) {
      console.error('Failed to send error report:', e)
      setReportStatus('error')
    }
  }
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6">Something went wrong</Typography>
      <Typography variant="body2">The component failed to load</Typography>
      {reportStatus === 'idle' ? (
        <CodeClimbersLoadingButton
          eventName="error-boundary-send-report"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => sendErrorReport()}
          loading={isPending}
        >
          Send Report
        </CodeClimbersLoadingButton>
      ) : (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            color: reportStatus === 'success' ? 'success.main' : 'error.main',
          }}
        >
          {reportStatus === 'success'
            ? 'Error report sent successfully'
            : 'Failed to send error report'}
        </Typography>
      )}
    </Box>
  )
}
