import {
  Typography,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useGetSources } from '../../../services/pulse.service'
import {
  SourceDetails,
  supportedSources,
} from '../../../utils/supportedSources'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Refresh } from '@mui/icons-material'
import { getTimeSince } from '../../../utils/time'
import CodeClimbersButton from '../../common/CodeClimbersButton'
import CodeClimbersIconButton from '../../common/CodeClimbersIconButton'

interface AddSourcesRowProps {
  source: SourceDetails
  lastActive?: string
}

const AddSourceRow = ({ source, lastActive }: AddSourcesRowProps) => {
  const { refetch } = useGetSources()

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`${source.name}-controls`}
        id={`${source.name}-header`}
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .MuiAccordionSummary-content': {
            width: '100%',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            alt={source.displayName + ' Logo'}
            src={source.logo}
            style={{ height: '32px', width: '32px' }}
          />
          <Typography
            variant="body2"
            fontWeight={700}
            component="a"
            href={source.link}
            target="_blank"
            color="inherit"
            onClick={(e) => e.stopPropagation()}
          >
            {source.displayName}
          </Typography>
        </Box>
        {lastActive && (
          <Chip
            label={`Last Active: ${getTimeSince(lastActive)} ago`}
            color="primary"
            sx={{
              mr: 2,
            }}
          />
        )}
      </AccordionSummary>

      <AccordionDetails>
        <Box
          component="ul"
          sx={{
            paddingRight: 2,
            paddingLeft: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            my: 0,
            pt: 0,
          }}
          dangerouslySetInnerHTML={{ __html: source.instructions }}
        />
      </AccordionDetails>
      <AccordionActions>
        <CodeClimbersButton
          eventName={`source_${source.name.toLowerCase()}_refresh`}
          onClick={() => refetch()}
          startIcon={<Refresh />}
          color="primary"
        >
          Refresh
        </CodeClimbersButton>
      </AccordionActions>
    </Accordion>
  )
}

interface AddSourcesProps {
  open: boolean
  handleClose: () => void
}

const AddSources = ({ open, handleClose }: AddSourcesProps) => {
  const { data: connectedSources, isPending, isError } = useGetSources()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="sources-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="sources-title">
        Add Sources
      </DialogTitle>
      <CodeClimbersIconButton
        eventName="source_close"
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </CodeClimbersIconButton>
      <DialogContent>
        {isPending && (
          <>
            <Skeleton width="100%" height="80px" />
            <Skeleton width="100%" height="80px" />
          </>
        )}
        {!isPending && (
          <>
            {supportedSources.map((source, index) => {
              const lastActive = connectedSources?.find(
                (connectedSource) => connectedSource.name === source.name,
              )?.lastActive
              return (
                <AddSourceRow
                  key={index}
                  source={source}
                  lastActive={lastActive}
                />
              )
            })}
          </>
        )}
        {isError && (
          <Typography color="warning.main" textAlign="center" pt={2}>
            Error getting connected sources. Sources will not show if they are
            connected or not.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddSources
