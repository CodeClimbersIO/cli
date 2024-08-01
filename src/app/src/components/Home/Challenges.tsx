import { Card, CardContent, styled, Typography } from '@mui/material'

const Content = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
  boxShadow: 'none',
  borderRadius: 0,
  minWidth: 400,

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    height: 250,
  },
}))

const Challenges = () => {
  return (
    <Content>
      <CardContent sx={{ padding: '20px 30px' }}>
        <Typography variant="h3">Challenges</Typography>
        <p>...content here...</p>
      </CardContent>
    </Content>
  )
}

export default Challenges
