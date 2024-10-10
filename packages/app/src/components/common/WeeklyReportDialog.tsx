import {
  Box,
  Dialog,
  Typography,
  TextField,
  Divider,
  Card,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CodeClimbersButton from './CodeClimbersButton'
import CodeClimbersIconButton from './CodeClimbersIconButton'
import { useState } from 'react'

import { BossImage } from './Icons/BossImage'
import { BarChartIcon } from './Icons/BarChartIcon'
import { BlockIcon } from './Icons/BlockIcon'
import userApi from '../../api/user.api'
import { NotificationIcon } from './Icons/NotificationIcon'

interface ReportOption {
  type: CodeClimbers.WeeklyReportType
  img: () => React.ReactNode
  name: string
}

const ReportOptions: ReportOption[] = [
  {
    type: 'ai',
    img: () => <BossImage width={48} height={48} />,
    name: 'Big Brother Edition',
  },
  {
    type: 'standard',
    img: () => <BarChartIcon width={48} height={48} />,
    name: 'Standard',
  },
  {
    type: 'none',
    img: () => <BlockIcon width={48} height={48} />,
    name: 'None',
  },
]

const ReportOptionCard = ({
  selected,
  recordOption,
  onClick,
}: {
  selected: boolean
  recordOption: ReportOption
  onClick: () => void
}) => {
  const { img, name } = recordOption

  return (
    <Card
      onClick={onClick}
      raised={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        flex: 1,
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'transparent',
        boxShadow: 'none',
        py: 4,
        '&:hover': {
          cursor: 'pointer',
          borderColor: 'primary.main',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
        }}
      >
        {img()}
        <Typography>{name}</Typography>
      </Box>
    </Card>
  )
}

export const WeeklyReportDialog = ({
  open,
  onClose,
  user,
}: {
  open: boolean
  user: CodeClimbers.User & CodeClimbers.UserSettings
  onClose: () => void
}) => {
  const { mutate: updateUserSettings } = userApi.useUpdateUserSettings()
  const { mutate: updateUser } = userApi.useUpdateUser()

  const handleClose = () => {
    onClose()
    setReportOption(user.weeklyReportType || '')
  }

  const [reportOption, setReportOption] =
    useState<CodeClimbers.WeeklyReportType>(user.weeklyReportType)
  const [email, setEmail] = useState(user.email || '')

  const handleOptionClick = (option: CodeClimbers.WeeklyReportType) => {
    setReportOption(option)
  }

  const handleSave = () => {
    if (!user.id) return
    updateUserSettings({
      user_id: user.id,
      settings: {
        weekly_report_type: reportOption,
      },
    })
    updateUser({
      user_id: user?.id,
      user: {
        email: email,
      },
    })
    handleClose()
  }
  const showNotificationIcon = reportOption === '' || !email

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          backgroundImage: 'none',
        },
      }}
      fullWidth
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 2,
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Weekly Report</Typography>
            <CodeClimbersIconButton
              eventName="weekly-report-dialog-close"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </CodeClimbersIconButton>
          </Box>
          {showNotificationIcon && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationIcon height={16} width={16} />
              <Typography variant="caption">
                Choose an option for a weekly email report of your coding stats.
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          {ReportOptions.map((option) => (
            <ReportOptionCard
              key={option.type}
              selected={reportOption === option.type}
              recordOption={option}
              onClick={() => handleOptionClick(option.type)}
            />
          ))}
        </Box>
        <Divider sx={{ width: '100%', borderBottomWidth: 2 }} />
        <TextField
          label="Your Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          inputProps={{
            'data-lpignore': 'true',
            'data-form-type': 'other',
          }}
        />

        <CodeClimbersButton
          eventName="weekly-report-dialog-save"
          onClick={handleSave}
          variant="contained"
          sx={{ ml: 0 }}
        >
          Save
        </CodeClimbersButton>
      </Box>
    </Dialog>
  )
}