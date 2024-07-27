import { styled } from '@mui/material'
import { Time } from './Time/Time'
import Challenges from './Challenges'
import Sources from './Sources'
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
  return (
    <div>
      <HomeHeader />
      <Body>
        <Time />
        <Wrapper>
          <Challenges />
          <Sources />
        </Wrapper>
      </Body>
    </div>
  )
}
