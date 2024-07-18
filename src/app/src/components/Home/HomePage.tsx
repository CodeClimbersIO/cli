import { Box, styled } from '@mui/material'
import Time from './Time'
import Challenges from './Challenges'
import Sources from './Sources'
import HomeHeader from './Header'

const Body = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))

export const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <Body>
        <Box display="flex" flexDirection="column" gap={4} width="100%">
          <Time />
          <Challenges />
        </Box>
        <Sources />
      </Body>
    </div>
  )
}
