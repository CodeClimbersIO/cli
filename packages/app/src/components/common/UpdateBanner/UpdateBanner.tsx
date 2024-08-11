import { Alert, Box } from '@mui/material'
import { useLatestVersion } from '../../../api/version.api'
import { useBrowserStorage } from '../../../hooks/useBrowserStorage'
import { CodeSnippit } from '../CodeSnippit/CodeSnippit'

const wasOverTwenyFourHoursAgo = (dismissedAt: number) => {
  const twentyFourHours = 1_000 * 60 * 60 * 24
  return new Date().getTime() - dismissedAt >= twentyFourHours
}

export const UpdateBanner = () => {
  const localVersion = __APP_VERSION__
  const [dismissedInfo, setDismissedInfo] = useBrowserStorage({
    key: 'update-banner-dismissed',
    value: {
      dismissed: false,
      dismissedAt: null as number | null,
    },
  })

  // Don't show the banner if the user has dismissed it and it was less than 24 hours ago
  const enableVersionPolling =
    !dismissedInfo?.dismissed ||
    !!(
      dismissedInfo.dismissedAt &&
      wasOverTwenyFourHoursAgo(dismissedInfo.dismissedAt)
    )
  const remoteVersion = useLatestVersion(enableVersionPolling)
  if (
    !remoteVersion.data ||
    localVersion === remoteVersion.data ||
    remoteVersion.isPending ||
    remoteVersion.isError
  ) {
    return null
  }

  return (
    <Box sx={{ position: 'absolute', left: 15, bottom: 15 }}>
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
        <CodeSnippit code="codeclimbers update" />
        Then reload the page
      </Alert>
    </Box>
  )
}
