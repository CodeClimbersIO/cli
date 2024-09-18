import { useState } from 'react'
import { styled } from '@mui/material'
import dayjs from 'dayjs'

import { Time } from './Time/Time'
import Sources from './Source/Sources'
import HomeHeader from './Header'
import { Resources } from './Resources/Resources'
import { Navigate } from 'react-router-dom'
import { useGetHealth } from '../../api/health.api'
import { useGetLocalSqlQuery } from '../../api/query.api'

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
  const { data: health } = useGetHealth()
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'))
  const { data: query } = useGetLocalSqlQuery(
    'SELECT * FROM activities_pulse LIMIT 10',
  )
  console.log(query)
  if (!health) return <Navigate to="/install" />
  return (
    <div>
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
