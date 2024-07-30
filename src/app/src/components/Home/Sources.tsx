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
import { useGetSources } from '../../api/pulse.api'
import { timeSince } from '../../utils/time'
import { SourceDetails, supportedSources } from '../../utils/sourceDetails'
import { useState } from 'react'

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
            {`Last pulse ${timeSince(lastActive)}`}
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
  const theme = useTheme()
  const colorMode = theme.palette.mode

  if (isPending) return <Typography>Loading</Typography>
  if (isEmpty) return <Typography>No sources. Connect one</Typography>
  if (isError) return <Typography>Error</Typography>

  return (
    <Card sx={{ boxShadow: 'none', borderRadius: 0, minWidth: 262 }}>
      <CardContent sx={{ padding: '24px', height: '100%', display: 'flex' }}>
        <Stack direction="column" justifyContent={'space-between'} flex={1}>
          <div>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3" alignSelf="center">
                Sources
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon fontSize="small" />}
                sx={{
                  backgroundColor: colorMode === 'dark' ? '#EBEBEB' : '#1F2122',
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
            <Stack direction="column" marginTop={2}>
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
          <Button
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
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Sources
