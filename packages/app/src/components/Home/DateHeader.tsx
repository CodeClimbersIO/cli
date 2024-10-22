import { useState } from 'react'
import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import { Logo } from '../common/Logo/Logo'
import {
  ChevronLeft,
  ChevronRight,
  Close,
  DarkMode,
  LightMode,
} from '@mui/icons-material'
import { useThemeStorage } from '../../hooks/useBrowserStorage'
import { useNavigate } from 'react-router-dom'
import { CodeClimbersButton } from '../common/CodeClimbersButton'

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingBottom: 24,

  [theme.breakpoints.down('md')]: {
    alignItems: 'start',
  },
}))

const LeftWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 40,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'start',
    gap: 16,
  },
}))

type Props = {
  selectedDate: Dayjs
  setSelectedDate: (date: Dayjs) => void
  period?: 'day' | 'week' | 'month' | 'year'
  title?: string
}

const DateHeader = ({
  selectedDate,
  setSelectedDate,
  period = 'day',
  title,
}: Props) => {
  const today = dayjs().startOf(period)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    navigate('/')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const formatDate = () => {
    if (period === 'week') {
      // week formated as "Oct 7 - Oct 13"
      return `${selectedDate.format('MMM D')} - ${selectedDate.endOf('week').format('MMM D')}`
    }
    return selectedDate.format('MMMM D, YYYY')
  }

  const increaseDate = () => {
    const newDate = selectedDate.add(1, period)
    setSelectedDate(newDate.startOf('day'))
  }

  const decreaseDate = () => {
    const newDate = selectedDate.subtract(1, period)
    setSelectedDate(newDate.startOf('day'))
  }

  const [theme, setTheme] = useThemeStorage()
  const darkTheme = theme === 'dark'
  const handleThemeChange = () => {
    setTheme(darkTheme ? 'light' : 'dark')
  }

  return (
    <>
      <Header>
        <LeftWrapper>
          <CodeClimbersButton
            variant="text"
            onClick={handleClick}
            eventName="home_header_logo_click"
          >
            <Logo />
          </CodeClimbersButton>
          <Box display="flex" gap={3} alignItems="center">
            <CodeClimbersButton
              variant="contained"
              sx={{ height: 40 }}
              disabled={today.isSame(selectedDate, 'day')}
              onClick={() => setSelectedDate(today)}
              eventName="home_header_today_click"
            >
              Today
            </CodeClimbersButton>
            <Box display="flex" gap={1}>
              <CodeClimbersButton
                id="decrease-date"
                variant="outlined"
                color="inherit"
                sx={{ width: 40, height: 40, minWidth: 0 }}
                onClick={decreaseDate}
                eventName="home_header_decrease_date_click"
              >
                <ChevronLeft />
              </CodeClimbersButton>
              <CodeClimbersButton
                variant="outlined"
                color="inherit"
                sx={{ width: 40, height: 40, minWidth: 0 }}
                disabled={today.isSame(selectedDate, 'day')}
                onClick={increaseDate}
                eventName="home_header_increase_date_click"
              >
                <ChevronRight />
              </CodeClimbersButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" fontWeight={700}>
                {formatDate()}
              </Typography>
              <Typography sx={{ pl: 1, fontSize: 12 }}>
                {period !== 'day' &&
                  today.isSame(selectedDate, 'day') &&
                  `In Progress`}
              </Typography>
            </Box>
          </Box>
        </LeftWrapper>
        {title && (
          <Box display="flex" flexDirection="row" gap={2}>
            <CodeClimbersButton
              variant="text"
              onClick={handleClick}
              eventName="plain_header_logo_click"
              sx={{ textTransform: 'none' }}
              color="inherit"
            >
              <Typography sx={{ mr: 2 }}>{title}</Typography>
              <Close />
            </CodeClimbersButton>
          </Box>
        )}
      </Header>
      <Menu
        id="menu-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleThemeChange}>
          <ListItemIcon>
            {darkTheme ? <LightMode /> : <DarkMode />}
          </ListItemIcon>
          Change Theme
        </MenuItem>
      </Menu>
    </>
  )
}

export { DateHeader }
