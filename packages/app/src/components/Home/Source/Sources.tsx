import {
  Button,
  Card,
  CardContent,
  Stack,
  styled,
  Switch,
  Typography,
  useTheme,
} from '@mui/material'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined'
import AddIcon from '@mui/icons-material/Add'
import { useExportPulses, useGetSources } from '../../../api/pulse.api'
import {
  SourceDetails,
  supportedSources,
} from '../../../utils/supportedSources'
import { useState } from 'react'
import SourcesEmpty from './Sources.empty'
import SourcesError from './Sources.error'
import SourcesLoading from './Sources.loading'
import { LoadingButton } from '@mui/lab'
import AddSources from './AddSources'
import { getTimeSince } from '../../../utils/time'

const SourceSwitch = styled(Switch)(({ theme }) => ({
  width: 24,
  height: 14,
  padding: 0,
  display: 'flex',
  // Styles for the switch base (including checked state)
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(10px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#72B7F9' : '#769E68',
      },
    },
  },
  // Styles for the thumb (dot)
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: theme.palette.mode === 'dark' ? '#EBEBEB' : '#1F2122',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  // Styles for the track
  '& .MuiSwitch-track': {
    border: `1px solid ${
      theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000'
    }`,
    borderRadius: '100px',
    opacity: 1,
    backgroundColor: 'transparent',
    width: '100%', // Full width of switch
    height: '100%', // Ful height of switch
  },
  // Checked track overrides
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    border: 'none',
  },
  // Checked thumb overrides
  '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#EBEBEB' : '#FFFFFF',
  },
}))

interface SourceRowProps {
  source: SourceDetails
  lastActive: string
}

const SourceRow = ({ source, lastActive }: SourceRowProps) => {
  const [isActive, setIsActive] = useState(false)

  const toggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <img
          alt={source.displayName + ' Logo'}
          src={source.logo}
          style={{ height: '32px', width: '32px' }}
        />
        <Stack direction="column">
          <Typography variant="body2" fontWeight={700}>
            {source.displayName}
          </Typography>
          <Typography variant="body2" fontWeight={400}>
            {`Last pulse ${getTimeSince(lastActive)}`}
          </Typography>
        </Stack>
      </Stack>
      <SourceSwitch checked={isActive} onChange={toggleActive} />
    </Stack>
  )
}

const Sources = () => {
  const {
    data: connectedSources,
    isPending,
    isEmpty,
    isError,
  } = useGetSources()
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
      <Card sx={{ boxShadow: 'none', borderRadius: 0, minWidth: 262, flex: 1 }}>
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
              <Stack direction="column" marginTop="24px">
                {connectedSources.map((source, index) => {
                  const sourceDetails = supportedSources.find(
                    (supportedSource) => supportedSource.name === source.name,
                  )

                  if (sourceDetails) {
                    return (
                      <SourceRow
                        key={index}
                        source={sourceDetails}
                        lastActive={source.lastActive}
                      />
                    )
                  }
                })}
              </Stack>
            </div>
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
