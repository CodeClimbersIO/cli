import { Dispatch, SetStateAction, useState } from 'react'
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
  DarkMode,
  LightMode,
} from '@mui/icons-material'
import { useThemeStorage } from '../../hooks/useBrowserStorage'
import CodeClimbersButton from '../common/CodeClimbersButton'

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
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>
}

const HomeHeader = ({ selectedDate, setSelectedDate }: Props) => {
  const today = dayjs().startOf('day')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const formatDate = () => {
    return selectedDate.format('ddd, MMMM D')
  }

  const increaseDate = () => {
    const newDate = selectedDate.add(1, 'day')
    setSelectedDate(newDate.startOf('day'))
  }

  const decreaseDate = () => {
    const newDate = selectedDate.subtract(1, 'day')
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
            <Typography variant="body2" fontWeight={700}>
              {formatDate()}
            </Typography>
          </Box>
        </LeftWrapper>
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

export default HomeHeader
