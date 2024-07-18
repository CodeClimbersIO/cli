import { Card, CardContent, Typography } from '@mui/material'

const Sources = () => {
  return (
    <Card sx={{ boxShadow: 'none', borderRadius: 0, minWidth: 262 }}>
      <CardContent sx={{ padding: '20px 30px' }}>
        <Typography variant="h3">Sources</Typography>
        <p>...content here...</p>
      </CardContent>
    </Card>
  )
}

export default Sources
