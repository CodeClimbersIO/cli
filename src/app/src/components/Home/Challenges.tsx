import { Card, CardContent, Typography } from '@mui/material'

const Challenges = () => {
  return (
    <Card
      raised={false}
      sx={{ boxShadow: 'none', borderRadius: 0, height: 250, width: '100%' }}
    >
      <CardContent sx={{ padding: '20px 30px' }}>
        <Typography variant="h3">Challenges</Typography>
        <p>...content here...</p>
      </CardContent>
    </Card>
  )
}

export default Challenges
