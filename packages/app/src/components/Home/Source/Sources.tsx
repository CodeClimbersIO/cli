import { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined'
import AddIcon from '@mui/icons-material/Add'
import dayjs from 'dayjs'

import {
  useExportPulses,
  useGetSitesWithMinutes,
  useGetSourcesWithMinutes,
} from '../../../api/pulse.api'
import {
  SourceDetails,
  supportedSources,
} from '../../../utils/supportedSources'
import SourcesEmpty from './Sources.empty'
import SourcesError from './Sources.error'
import SourcesLoading from './Sources.loading'
import AddSources from './AddSources'
import { getTimeSince } from '../../../utils/time'
import { minutesToHours } from '../Time/utils'
import { SourceTimeChart } from './SourceTimeChart'
import { supportedSites } from '../../../utils/supportedSites'
import { SiteRow } from './SiteRow'

interface SourceRowProps {
  source: SourceDetails
  lastActive: string
  minutes: number
}

const SourceRow = ({ source, lastActive, minutes }: SourceRowProps) => {
  const theme = useTheme()
  const compareTime = 90

  const typeColors = [
    {
      type: 'code',
      color: theme.palette.graphColors.blue,
    },
    {
      type: 'web',
      color: theme.palette.graphColors.green,
    },
  ]

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Stack direction="row" alignItems="center" spacing={1} width="100%">
        <img
          alt={source.displayName + ' Logo'}
          src={source.logo}
          style={{ height: '32px', width: '32px' }}
        />
        <Stack direction="column" width="100%">
          <Typography variant="body2" fontWeight={700}>
            {source.displayName}
          </Typography>
          {minutes > 0 && (
            <SourceTimeChart
              time={minutesToHours(minutes)}
              progress={Math.floor((minutes / compareTime) * 100)}
              color={
                typeColors.find((typeColor) => typeColor.type === source.type)
                  ?.color ?? theme.palette.graphColors.blue
              }
            />
          )}
          <Stack direction="row" justifyContent="space-between">
            {minutes === 0 && lastActive && (
              <Typography
                variant="body2"
                fontWeight={400}
                color={theme.palette.grey[300]}
              >
                {`Last pulse ${getTimeSince(lastActive)}`}
              </Typography>
            )}
            {minutes === 0 && (
              <Typography
                variant="body1"
                fontWeight={400}
                color={theme.palette.grey[300]}
              >
                0m
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

const Sources = () => {
  const {
    data: sourcesWithMinutes,
    isPending,
    isEmpty,
    isError,
  } = useGetSourcesWithMinutes(
    dayjs().startOf('day').toISOString(),
    dayjs().endOf('day').toISOString(),
  )
  const { data: sitesWithMinutes, isLoading: sitesQueryIsLoading } =
    useGetSitesWithMinutes(
      dayjs('2023-12-05').startOf('day').toISOString(),
      dayjs('2023-12-05').endOf('day').toISOString(),
    )
  console.log(sitesWithMinutes)

  const { exportPulses } = useExportPulses()
  const [exportingPulses, setExportingPulses] = useState(false)
  const [addSourcesOpen, setAddSourcesOpen] = useState(false)

  const theme = useTheme()

  const handleExportPulses = async () => {
    setExportingPulses(true)
    try {
      await exportPulses()
    } catch (error) {
      console.error('Error exporting pulses:', error)
    } finally {
      setExportingPulses(false)
    }
  }

  if (isPending) return <SourcesLoading />
  if (isError) return <SourcesError />
  if (isEmpty) return <SourcesEmpty />

  return (
    <>
      <Card sx={{ boxShadow: 'none', borderRadius: 0, minWidth: 335, flex: 1 }}>
        <CardContent sx={{ padding: '24px', height: '100%', display: 'flex' }}>
          <Stack direction="column" justifyContent={'space-between'} flex={1}>
            <div>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h3" alignContent="center" textAlign="left">
                  Sources
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setAddSourcesOpen(true)}
                  startIcon={<AddIcon fontSize="small" />}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'dark' ? '#EBEBEB' : '#1F2122',
                    borderRadius: '2px',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    width: 'auto',
                    height: '32px',
                    minWidth: 0,
                  }}
                >
                  Add
                </Button>
              </Stack>
              <Stack direction="column" marginTop="24px" gap={3}>
                {sourcesWithMinutes.map((source, index) => {
                  const sourceDetails = supportedSources.find(
                    (supportedSource) =>
                      supportedSource.name.includes(source.name),
                  )

                  if (sourceDetails) {
                    return (
                      <SourceRow
                        key={index}
                        source={sourceDetails}
                        lastActive={source.lastActive}
                        minutes={source.minutes}
                      />
                    )
                  }
                })}
              </Stack>
            </div>
            <Stack py={5}>
              <Typography variant="h3" alignContent="center" textAlign="left">
                Sites
              </Typography>
              {!sitesQueryIsLoading && sitesWithMinutes && (
                <Stack direction="column" marginTop="24px" gap={3}>
                  {sitesWithMinutes?.map((site, index) => {
                    const siteDetails = supportedSites.find((supportedSite) =>
                      supportedSite.name.includes(site.name),
                    )

                    if (siteDetails) {
                      return (
                        <SiteRow
                          key={index}
                          site={siteDetails}
                          minutes={site.minutes}
                        />
                      )
                    }
                  })}
                </Stack>
              )}
              {sitesQueryIsLoading && <>hi</>}
            </Stack>
            <LoadingButton
              onClick={handleExportPulses}
              loading={exportingPulses}
              variant="outlined"
              color="inherit"
              startIcon={<SaveAltOutlinedIcon fontSize="small" />}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                textTransform: 'none',
                borderRadius: '8px',
                borderColor: '#AAADB1',
              }}
            >
              Export Data
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
      <AddSources
        open={addSourcesOpen}
        handleClose={() => setAddSourcesOpen(false)}
      />
    </>
  )
}

export default Sources
