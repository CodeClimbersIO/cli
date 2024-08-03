import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  useTheme,
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const SourcesLoading = () => {
  const theme = useTheme()

  return (
    <Card sx={{ boxShadow: 'none', borderRadius: 0, minWidth: 262 }}>
      <CardContent sx={{ padding: '24px', height: '100%', display: 'flex' }}>
        <Stack direction="column" flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" alignContent="center" textAlign="left">
              Sources
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon fontSize="small" />}
              disabled={true}
              sx={{
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
          <CircularProgress
            sx={{
              color: theme.palette.primary.main,
              marginTop: '48px',
              marginX: 'auto',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SourcesLoading
