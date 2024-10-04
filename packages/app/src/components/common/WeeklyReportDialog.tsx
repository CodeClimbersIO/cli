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
  isDirty,
  selected,
  recordOption,
  onClick,
}: {
  isDirty: boolean
  selected: boolean
  recordOption: ReportOption
  onClick: () => void
}) => {
  const { img, name, type } = recordOption
  const highlight = selected && (isDirty || type !== 'none')
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
        borderColor: highlight ? 'primary.main' : 'transparent',
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
  const handleClose = () => {
    onClose()
    setIsDirty(false)
    setReportOption(user?.weeklyReportType)
  }

  const [reportOption, setReportOption] =
    useState<CodeClimbers.WeeklyReportType>(user?.weeklyReportType)
  const [email, setEmail] = useState(user?.email)
  const [isDirty, setIsDirty] = useState(false)

  const handleOptionClick = (option: CodeClimbers.WeeklyReportType) => {
    setReportOption(option)
    setIsDirty(true)
  }

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
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
        <Typography>
          Get a weekly email report of your coding activity.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          {ReportOptions.map((option) => (
            <ReportOptionCard
              key={option.type}
              isDirty={isDirty}
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
        />
        <CodeClimbersButton
          eventName="weekly-report-dialog-save"
          onClick={handleClose}
          variant="contained"
          sx={{ ml: 0 }}
        >
          Save
        </CodeClimbersButton>
      </Box>
    </Dialog>
  )
}
