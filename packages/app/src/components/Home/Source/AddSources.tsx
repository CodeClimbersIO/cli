import {
  Modal,
  Typography,
  Box,
  IconButton,
  Stack,
  Chip,
  useTheme,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useGetSources } from '../../../api/pulse.api'
import {
  SourceDetails,
  supportedSources,
} from '../../../utils/supportedSources'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

interface AddSourcesRowProps {
  source: SourceDetails
  connected: boolean
}

const AddSourceRow = ({ source, connected }: AddSourcesRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const theme = useTheme()

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box mb="16px">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          border: '1px solid #AAADB1',
          padding: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
        onClick={handleToggleExpanded}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <ExpandMoreIcon
            sx={{
              transition: 'transform 0.3s',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              color: theme.palette.text.primary,
            }}
          />
          <img
            alt={source.displayName + ' Logo'}
            src={source.logo}
            style={{ height: '32px', width: '32px' }}
          />
          <Typography variant="body2" fontWeight={700}>
            {source.displayName}
          </Typography>
        </Stack>
        {connected && (
          <Chip
            label="Connected"
            color="primary"
            sx={{
              color: '#FFFFFF',
            }}
          />
        )}
      </Stack>
      {isExpanded && (
        <Box sx={{ paddingX: '16px', paddingY: '0px' }}>
          <div dangerouslySetInnerHTML={{ __html: source.instructions }} />
        </Box>
      )}
    </Box>
  )
}

interface AddSourcesProps {
  open: boolean
  handleClose: () => void
}

const AddSources = ({ open, handleClose }: AddSourcesProps) => {
  const { data: connectedSources, isPending, isError } = useGetSources()
  const theme = useTheme()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '80%',
          maxWidth: 800,
          height: '80%',
          maxHeight: '80%',
          bgcolor: theme.palette.background.paper,
          p: 4,
          borderRadius: '16px',
          boxShadow: 24,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            border: `1px solid ${theme.palette.text.primary}`,
          }}
        >
          <CloseIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>
        <Typography
          variant="h2"
          fontWeight={700}
          align="center"
          marginBottom="32px"
        >
          Sources
        </Typography>
        {isPending && (
          <CircularProgress
            sx={{
              color: theme.palette.primary.main,
              marginTop: '32px',
              marginX: 'auto',
            }}
          />
        )}
        {isError && (
          <Typography
            color="#FFA726"
            width="100%"
            textAlign="center"
            marginBottom="32px"
          >
            Error getting connected sources. All sources will be missing the
            'Connected' chip.
          </Typography>
        )}
        {!isPending && (
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              paddingRight: '8px',
            }}
          >
            {supportedSources.map((source, index) => {
              const connected =
                connectedSources?.some(
                  (connectedSource) => connectedSource.name === source.name,
                ) || false
              return (
                <AddSourceRow
                  key={index}
                  source={source}
                  connected={connected}
                />
              )
            })}
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default AddSources
