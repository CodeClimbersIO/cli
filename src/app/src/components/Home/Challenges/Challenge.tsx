import { SpaceBar } from '@mui/icons-material'
import { Paper, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'

// PURE PLACEHOLDER CODE
export type IconProps = {
  isCompleted: boolean
  color: string
}
const Icon = ({ isCompleted, color }: IconProps) => (
  <SpaceBar
    sx={{
      rotate: 180,
      color: isCompleted ? 'grey[100]' : color,
    }}
  />
)

export type ChallengeProps = {
  time: number
  type: string
  points: number
  timeGoal: number
  color: string
}

export const Challenge = ({
  time,
  type,
  points,
  timeGoal,
  color,
}: ChallengeProps) => {
  const isCompleted = time >= timeGoal
  const percentage = Math.round((time / timeGoal) * 100)

  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'gray[100]',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            rounded: 1,
          }}
        >
          <Icon isCompleted={isCompleted} color={color} />
        </Paper>
      </Grid2>
      <Grid2 flexDirection="column">
        <Grid2>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              opacity: isCompleted ? 0.7 : 1,
            }}
          >
            {time} min of {type}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              opacity: isCompleted ? 0.7 : 1,
            }}
          >
            {points} pts &#8226; {time}/{timeGoal} min &#8226; {percentage}%
          </Typography>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
