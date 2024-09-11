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
import { Dayjs } from 'dayjs'

import {
  useExportPulses,
  useGetSitesWithMinutes,
  useGetSourcesWithMinutes,
} from '../../../api/pulse.api'
import { supportedSources } from '../../../utils/supportedSources'
import SourcesEmpty from './Sources.empty'
import SourcesError from './Sources.error'
import SourcesLoading from './Sources.loading'
import AddSources from './AddSources'
import { supportedSites } from '../../../utils/supportedSites'
import { SiteRow } from './SiteRow'
import { SourceRow } from './SourceRow'

type SourcesProps = { selectedDate: Dayjs }
const Sources = ({ selectedDate }: SourcesProps) => {
  const {
    data: sourcesWithMinutes,
    isPending,
    isEmpty,
    isError,
  } = useGetSourcesWithMinutes(
    selectedDate.startOf('day').toISOString(),
    selectedDate.endOf('day').toISOString(),
  )

  const {
    data: sitesWithMinutes,
    isEmpty: sitesEmpty,
    isLoading: sitesQueryIsLoading,
  } = useGetSitesWithMinutes(
    selectedDate.startOf('day').toISOString(),
    selectedDate.endOf('day').toISOString(),
  )

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
              {!sitesQueryIsLoading && !sitesEmpty && (
                <>
                  <Typography
                    variant="h3"
                    alignContent="center"
                    textAlign="left"
                  >
                    Sites
                  </Typography>
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
                </>
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
