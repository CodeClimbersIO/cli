import { useState } from 'react'
import { styled } from '@mui/material'
import dayjs from 'dayjs'

import { Time } from './Time/Time'
import { Challenges } from './Challenges/Challenges'
import Sources from './Source/Sources'
import HomeHeader from './Header'

const Body = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}))

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,

  [theme.breakpoints.down(766)]: {
    flexDirection: 'column',
  },
}))

export const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs())

  return (
    <div>
      <HomeHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Body>
        <Time selectedDate={selectedDate} />
        <Wrapper>
          <Challenges />
          <Sources />
        </Wrapper>
      </Body>
    </div>
  )
}
