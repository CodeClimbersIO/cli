import { Box } from '@mui/material'
import { AnimatedLogo } from './common/Logo/AnimatedLogo'
import { useEffect, useState } from 'react'

export const LoadingScreen = () => {
  const [isWaiting, setIsWaiting] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsWaiting(false)
    }, 1000)
  }, [])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box display="flex" flexDirection="row" alignItems="center" width="100%">
        {!isWaiting && <AnimatedLogo />}
      </Box>
    </Box>
  )
}
