import { Paper, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { DoubleRingIcon } from "../../common/Icons/DoubleRingIcon";
import { RingIcon } from "../../common/Icons/RingIcon";

// PURE PLACEHOLDER CODE
export type IconProps = {
  isCompleted: boolean;
  color: string;
  doubleRing?: boolean;
};

const Icon = ({ isCompleted, color, doubleRing }: IconProps) =>
  doubleRing ? (
    <DoubleRingIcon
      fontSize="large"
      sx={{ fill: (theme) => (isCompleted ? theme.palette.grey[900] : color) }}
    />
  ) : (
    <RingIcon
      fontSize="large"
      sx={{
        fill: (theme) => (isCompleted ? theme.palette.grey[900] : color),
      }}
    />
  );

export type ChallengeProps = {
  time: number;
  type: string;
  points: number;
  timeGoal: number;
  color: string;
  doubleRing?: boolean;
};

export const Challenge = ({
  time,
  type,
  points,
  timeGoal,
  color,
  doubleRing,
}: ChallengeProps) => {
  const isCompleted = time >= timeGoal;
  const percentage = Math.round((time / timeGoal) * 100);

  const theme = useTheme();

  console.log({ theme }, theme.palette.grey[200]);

  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Paper
          elevation={0}
          sx={{
            bgColor: "grey[200]",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            rounded: 1,
          }}
        >
          <Icon
            isCompleted={isCompleted}
            color={color}
            doubleRing={doubleRing}
          />
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
  );
};
