import { Card, CardContent, Stack, Typography } from '@mui/material'

const SourcesError = () => {
  return (
    <Card sx={{ boxShadow: 'none', borderRadius: 0, minWidth: 262 }}>
      <CardContent sx={{ padding: '24px', height: '100%', display: 'flex' }}>
        <Stack direction="column">
          <Typography variant="h3" alignContent="center" textAlign="left">
            Sources
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            width="100%"
            marginTop="24px"
            color="#B22222"
          >
            Error getting connected sources.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export { SourcesError }
