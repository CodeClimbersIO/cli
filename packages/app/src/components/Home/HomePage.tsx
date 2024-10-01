import { useState } from 'react'
import { styled } from '@mui/material'
import dayjs from 'dayjs'

import { Time } from './Time/Time'
import Sources from './Source/Sources'
import HomeHeader from './Header'
import { Resources } from './Resources/Resources'
import { Navigate } from 'react-router-dom'
import { useGetHealth } from '../../api/health.api'

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
  const { data: health, isPending: isHealthPending } = useGetHealth({
    retry: false,
    refetchInterval: false,
  })
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'))

  if (!health && !isHealthPending) return <Navigate to="/install" />

  return (
    <div style={{ padding: '2rem' }}>
      <HomeHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Body>
        <Time selectedDate={selectedDate} />
        <Wrapper>
          <Sources selectedDate={selectedDate} />
          <Resources />
        </Wrapper>
      </Body>
    </div>
  )
}
