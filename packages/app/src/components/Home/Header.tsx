import { Dispatch, SetStateAction, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import Logo from './Logo'
import { ChevronLeft, ChevronRight, Logout } from '@mui/icons-material'

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

const StatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 40,

  [theme.breakpoints.down(670)]: {
    display: 'none',
  },
}))

const MenuStatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up(660)]: {
    display: 'none',
  },
}))

type Props = {
  selectedDate: Dayjs
  setSelectedDate: Dispatch<SetStateAction<Dayjs>>
}

const HomeHeader = ({ selectedDate, setSelectedDate }: Props) => {
  const theme = useTheme()
  const today = dayjs()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    setSelectedDate(newDate)
  }

  const decreaseDate = () => {
    const newDate = selectedDate.subtract(1, 'day')
    setSelectedDate(newDate)
  }

  return (
    <>
      <Header>
        <LeftWrapper>
          <Logo />
          <Box display="flex" gap={3} alignItems="center">
            <Button
              variant="contained"
              color="inherit"
              sx={{ height: 40 }}
              disabled={today.isSame(selectedDate, 'day')}
              onClick={() => setSelectedDate(today)}
            >
              Today
            </Button>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ width: 40, height: 40, minWidth: 0 }}
                onClick={decreaseDate}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ width: 40, height: 40, minWidth: 0 }}
                disabled={today.isSame(selectedDate, 'day')}
                onClick={increaseDate}
              >
                <ChevronRight />
              </Button>
            </Box>
            <Typography variant="body2" fontWeight={700}>
              {formatDate()}
            </Typography>
          </Box>
        </LeftWrapper>
        <Box display="flex" alignItems="center" gap={5}>
          <StatsWrapper>
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">Today's Points</Typography>
              <Typography variant="body2" fontWeight={700}>
                30
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">Total Points</Typography>
              <Typography variant="body2" fontWeight={700}>
                3000
              </Typography>
            </Box>
          </StatsWrapper>
          <IconButton onClick={handleClick}>
            <Avatar
              alt="Person"
              src=""
              sx={{ bgcolor: theme.palette.primary.main }}
            >
              H
            </Avatar>
          </IconButton>
        </Box>
      </Header>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box mb={1}>
          <MenuStatsWrapper>
            <Box display="flex" flexDirection="column" pl={1}>
              <Typography variant="body2">Today's Points</Typography>
              <Typography variant="body2" fontWeight={700}>
                30
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" pl={1}>
              <Typography variant="body2">Total Points</Typography>
              <Typography variant="body2" fontWeight={700}>
                3000
              </Typography>
            </Box>
            <Divider />
          </MenuStatsWrapper>
        </Box>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default HomeHeader
