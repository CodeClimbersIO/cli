import { Box, Stack, Typography } from '@mui/material'
import { BossImage } from '../common/Icons/BossImage'
import { CodeClimbersIconButton } from '../common/CodeClimbersIconButton'
import CloseIcon from '@mui/icons-material/Close'
import { WeeklyReportDialog } from '../common/WeeklyReportDialog'
import { useGetCurrentUser } from '../../api/browser/user.api'
import { useEffect, useState } from 'react'
import { CodeClimbersButton } from '../common/CodeClimbersButton'

const getLoadingTexts = (): string => {
  return 'Contacting your manager... Choosing excuses... Engaging passive-aggressive behavior... Attempting to sabotage your career... Synergizing with your peers... Scheduling a meeting... Reviewing vieled threats... '
}

const useLoadingText = (loading?: boolean) => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)

  const [loadingText, setLoadingText] = useState('')

  useEffect(() => {
    if (!loading) {
      return
    }
    const interval = setInterval(() => {
      const index =
        loadingTextIndex > getLoadingTexts().length ? 0 : loadingTextIndex
      setLoadingText((prevText) => prevText + getLoadingTexts()[index])
      setLoadingTextIndex((prevIndex) => {
        const newIndex = prevIndex + 1
        return newIndex >= getLoadingTexts().length ? 0 : newIndex
      })
    }, 100)
    return () => clearInterval(interval)
  }, [loadingTextIndex, loadingText, loading])
  return {
    loadingText,
  }
}

export const AiReportHeader = (props: {
  showCloseButton?: boolean
  aiButton: {
    text: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
  }
  openWeeklyReportModal?: boolean
}) => {
  const { data: user } = useGetCurrentUser()
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false)
  const { loadingText } = useLoadingText(props.aiButton.loading)

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: (theme) => theme.palette.common.white,
        color: (theme) => theme.palette.common.black,
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <BossImage variant="neutral" width={64} height={64} />
          <Stack>
            <Typography
              variant="monospace"
              style={{ margin: 0, marginBottom: '12px' }}
            >
              From: Timothy Brother
            </Typography>
            <Typography variant="monospace" style={{ margin: 0 }}>
              Subject: Comments on Your Week
            </Typography>
          </Stack>
        </Box>
        {props.aiButton.loading ? (
          <Typography
            variant="monospace"
            style={{
              width: '265px',
              height: '36.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              textWrap: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {loadingText}
          </Typography>
        ) : (
          <CodeClimbersButton
            eventName="generate_ai_weekly_report"
            variant="contained"
            fullWidth
            disabled={props.aiButton.disabled}
            sx={{
              '&.Mui-disabled': {
                backgroundColor: '#E0E0E0', // or any other color you prefer
                color: '#00000080',
              },
            }}
            onClick={() => {
              if (props.openWeeklyReportModal) {
                setIsWeeklyReportModalOpen(true)
              }
              props.aiButton.onClick?.()
            }}
          >
            {props.aiButton.text}
          </CodeClimbersButton>
        )}
      </Box>
      {props.showCloseButton && (
        <Box>
          <CodeClimbersIconButton
            eventName="close_big_brother_report"
            color="inherit"
            sx={{ p: 0, pl: 2 }}
          >
            <CloseIcon />
          </CodeClimbersIconButton>
        </Box>
      )}
      {user && isWeeklyReportModalOpen && (
        <WeeklyReportDialog
          user={user}
          open={isWeeklyReportModalOpen}
          onClose={() => setIsWeeklyReportModalOpen(false)}
        />
      )}
    </Box>
  )
}
