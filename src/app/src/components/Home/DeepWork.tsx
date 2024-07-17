import { Card, CardContent, Typography } from '@mui/material'

const DeepWork = () => {
  return (
    <Card
      raised={false}
      sx={{ boxShadow: 'none', borderRadius: 0, height: 158, width: '100%' }}
    >
      <CardContent sx={{ padding: '20px 30px' }}>
        <Typography variant="h3">Deep Work</Typography>
        <p>...content here...</p>
      </CardContent>
    </Card>
  )
}

export default DeepWork
