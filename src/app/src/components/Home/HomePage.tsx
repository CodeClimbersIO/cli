import { Box } from '@mui/material'

import { LatestPulsesComponent } from './LatestPulses'
import Logo from './Logo'
import DeepWork from './DeepWork'
import Time from './Time'
import Challenges from './Challenges'
import Sources from './Sources'

export const HomePage = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', gap: 6, width: '100%', paddingBottom: 4 }}>
        <Logo />
        <DeepWork />
      </Box>
      <Box sx={{ display: 'flex', gap: 4 }}>
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
      </Box>
      <LatestPulsesComponent />
    </div>
  )
}
