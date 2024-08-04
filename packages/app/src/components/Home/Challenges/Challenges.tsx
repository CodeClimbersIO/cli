import { Card, CardContent, styled, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Challenge } from './Challenge'

const Content = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
  boxShadow: 'none',
  borderRadius: 0,
  minWidth: 400,

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    minHeight: 250,
  },
}))

const incompleteChallenges = [
  {
    id: 1,
    time: 71,
    timeGoal: 90,
    points: 45,
    type: 'Deep Work',
    color: 'red',
    doubleRing: true,
  },
  {
    id: 2,
    time: 42,
    timeGoal: 60,
    points: 30,
    type: 'Code',
    color: 'blue',
  },
  {
    id: 3,
    time: 23,
    timeGoal: 90,
    points: 45,
    type: 'Code',
    color: 'blue',
  },
]

const completedChallenges = [
  {
    id: 4,
    time: 90,
    timeGoal: 90,
    points: 30,
    type: 'Deep Work',
    color: 'blue',
  },
]

export const Challenges = () => {
  return (
    <Content>
      <CardContent
        sx={{
          padding: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <Typography variant="h3">Challenges</Typography>
        <Grid2 container spacing={3} flexDirection="column">
          <Typography variant="body1" fontWeight="bold">
            Active
          </Typography>
          {incompleteChallenges.map((challenge) => (
            <Grid2 key={challenge.id}>
              <Challenge {...challenge} />
            </Grid2>
          ))}
        </Grid2>
        <Grid2 container spacing={3} flexDirection="column">
          <Typography variant="body1" fontWeight="bold">
            Complete
          </Typography>
          {completedChallenges.map((challenge) => (
            <Grid2 key={challenge.id}>
              <Challenge {...challenge} />
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Content>
  )
}
