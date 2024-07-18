import { Box, styled } from '@mui/material'

import { LatestPulsesComponent } from './LatestPulses'
import Logo from './Logo'
import DeepWork from './DeepWork'
import Time from './Time'
import Challenges from './Challenges'
import Sources from './Sources'

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
  paddingBottom: 24,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

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
      <Header>
        <Logo />
        <DeepWork />
      </Header>
      <Body>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%',
          }}
        >
          <Time />
          <Challenges />
        </Box>
        <Sources />
      </Body>
      <LatestPulsesComponent />
    </div>
  )
}
