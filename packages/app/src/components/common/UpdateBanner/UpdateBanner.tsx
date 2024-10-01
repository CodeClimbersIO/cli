import { Alert, Box } from '@mui/material'
import { useLatestVersion } from '../../../services/version.service'
import { useBrowserStorage } from '../../../hooks/useBrowserStorage'
import { CodeSnippit } from '../CodeSnippit/CodeSnippit'
import { useGetLocalVersion } from '../../../services/health.service'

const wasOverTwenyFourHoursAgo = (dismissedAt: number) => {
  const twentyFourHours = 1_000 * 60 * 60 * 24
  return new Date().getTime() - dismissedAt >= twentyFourHours
}

export const UpdateBanner = () => {
  const { data: localVersionResponse } = useGetLocalVersion()
  const [dismissedInfo, setDismissedInfo] = useBrowserStorage({
    key: 'update-banner-dismissed',
    value: {
      dismissed: false,
      dismissedAt: null as number | null,
    },
  })
  const wasDismissed =
    dismissedInfo?.dismissedAt &&
    !wasOverTwenyFourHoursAgo(dismissedInfo.dismissedAt)

  // Don't show the banner if the user has dismissed it and it was less than 24 hours ago
  const enableVersionPolling = !wasDismissed

  const remoteVersion = useLatestVersion(enableVersionPolling)

  if (
    !remoteVersion.data ||
    localVersionResponse?.version === remoteVersion.data ||
    wasDismissed ||
    remoteVersion.isPending ||
    remoteVersion.isError
  ) {
    return null
  }
  const updateCommand = `
    npx codeclimbers startup:disable &&
    npx codeclimbers@${remoteVersion.data} start
  `
  return (
    <Box sx={{ position: 'fixed', left: 15, bottom: 15, zIndex: 1000 }}>
      <Alert
        severity="info"
        onClose={() => {
          setDismissedInfo({
            dismissed: true,
            dismissedAt: new Date().getTime(),
          })
        }}
      >
        An update is available! Run the following command to update
        <CodeSnippit code={updateCommand} />
        Then reload the page
      </Alert>
    </Box>
  )
}
