import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CodeClimbersButton from './CodeClimbersButton'
import CodeClimbersIconButton from './CodeClimbersIconButton'

export const WeeklyReportDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const handleClose = () => {
    onClose()
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Modal title
      </DialogTitle>
      <CodeClimbersIconButton
        eventName="weekly-report-dialog-close"
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </CodeClimbersIconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <CodeClimbersButton
          eventName="weekly-report-dialog-save"
          onClick={handleClose}
        >
          Save changes
        </CodeClimbersButton>
      </DialogActions>
    </Dialog>
  )
}
