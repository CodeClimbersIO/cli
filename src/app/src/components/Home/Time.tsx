import { Card, CardContent, Typography } from '@mui/material'

const Time = () => {
  return (
    <Card
      raised={false}
      sx={{ boxShadow: 'none', borderRadius: 0, height: 500, width: '100%' }}
    >
      <CardContent sx={{ padding: '20px 30px' }}>
        <Typography variant="h3">Time</Typography>
        <p>...content here...</p>
      </CardContent>
    </Card>
  )
}

export default Time
