import { Box } from '@mui/material'

import { LatestPulsesComponent } from './LatestPulses'
import Logo from './Logo'
import DeepWork from './DeepWork'

export const HomePage = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', gap: 6, width: '100%' }}>
        <Logo />
        <DeepWork />
      </Box>
      <h1>Home</h1>
      <LatestPulsesComponent />
    </div>
  )
}
