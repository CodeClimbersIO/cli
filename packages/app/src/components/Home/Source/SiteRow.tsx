import { Stack, Typography, useTheme } from '@mui/material'

import { minutesToHours } from '../Time/utils'
import { SourceTimeChart } from './SourceTimeChart'
import { SiteDetails } from '../../../utils/supportedSites'
import { typeColors } from '../../../utils/categories'

interface SiteRowProps {
  site: SiteDetails
  minutes: number
}

export const SiteRow = ({ site, minutes }: SiteRowProps) => {
  const theme = useTheme()
  const compareTime = 90

  const sourceCategoryColor =
    typeColors(theme).find((typeColor) => typeColor.type === site.type)
      ?.color ?? theme.palette.graphColors.blue

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Stack direction="row" alignItems="center" spacing={1} width="100%">
        {site.logo && (
          <img
            alt={site.displayName + ' Logo'}
            src={site.logo}
            style={{ height: '32px', width: '32px' }}
          />
        )}
        {site.icon && site.icon}
        <Stack direction="column" width="100%">
          <Typography variant="body2" fontWeight={700}>
            {site.displayName}
          </Typography>
          {minutes > 0 && (
            <SourceTimeChart
              time={minutesToHours(minutes)}
              progress={Math.floor((minutes / compareTime) * 100)}
              color={sourceCategoryColor}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
