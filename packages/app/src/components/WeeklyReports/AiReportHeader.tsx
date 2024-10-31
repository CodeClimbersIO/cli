import { Box, Stack, Typography } from '@mui/material'
import { CodeClimbersLoadingButton } from '../common/CodeClimbersLoadingButton'
import { BossImage } from '../common/Icons/BossImage'
import { CodeClimbersIconButton } from '../common/CodeClimbersIconButton'
import CloseIcon from '@mui/icons-material/Close'
import { WeeklyReportDialog } from '../common/WeeklyReportDialog'
import { useGetCurrentUser } from '../../api/browser/user.api'
import { useState } from 'react'

export const AiReportHeader = (props: {
  showCloseButton?: boolean
  aiButton: {
    text: string
    onClick?: () => void
    disabled?: boolean
  }
  openWeeklyReportModal?: boolean
}) => {
  const { data: user } = useGetCurrentUser()
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#FAF7F7',
        color: '#000',
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
        <CodeClimbersLoadingButton
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
        </CodeClimbersLoadingButton>
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
