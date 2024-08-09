import { useState } from 'react'
import { styled } from '@mui/material'
import dayjs from 'dayjs'

import { Time } from './Time/Time'
import Sources from './Source/Sources'
import HomeHeader from './Header'
import { Resources } from './Resources/Resources'

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
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'))

  return (
    <div>
      <HomeHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Body>
        <Time selectedDate={selectedDate} />
        <Wrapper>
          <Sources />
          <Resources />
        </Wrapper>
      </Body>
    </div>
  )
}
