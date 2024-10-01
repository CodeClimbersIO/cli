import { useGetLocalVersion } from '../services/health.service'
import { useLatestVersion } from '../services/version.service'
import { useTheme } from '@mui/material'

// only show the banner one time
let hasShownBanner = false

export const useVersionConsoleBanner = () => {
  const theme = useTheme()
  const { data: localVersionResponse } = useGetLocalVersion()
  const { data: remoteVersionResponse } = useLatestVersion()

  if (
    localVersionResponse?.version &&
    remoteVersionResponse &&
    !hasShownBanner
  ) {
    console.log(
      `%c

  @@@@@@@@@@@@@@@@@@@            
  @@@@@@@@@@@@@@@@@@@            
  @@@             @@@            
  @@@             @@@            
                                  
  @@@@@@@@@@@@@@@@@@@            
  @@@@@@@@@@@@@@@@@@@            
  @@@             @@@            
  @@@             @@@            
                                  
  @@@@@@@@@@@@@@@@@@@            
  @@@@@@@@@@@@@@@@@@@            
  @@@             @@@            
  @@@             @@@            

  %cCODECLIMBERS.IO 
 %cWelcome to CodeClimbers! We're open source and we'd love to have you join our community on Discord: https://discord.gg/zBnu8jGnHa
  `,
      `color: ${theme.palette.primary.main}; font-size: 1rem;font-weight: bold;`,
      `font-weight: bold; font-size: 2rem; color: ${theme.palette.primary.main}; font-family: 'Courier New', Courier, monospace;`,
      `color: ${theme.palette.text.primary}; font-size: 1rem;`,
    )

    console.log(
      '%cCLI Version: %c' + localVersionResponse?.version,
      `color: ${theme.palette.primary.main}`,
      'color: inherit',
    )
    console.log(
      '%cBrowser Version: %c' + remoteVersionResponse,
      `color: ${theme.palette.primary.main}`,
      'color: inherit',
    )
    hasShownBanner = true
  }
}
