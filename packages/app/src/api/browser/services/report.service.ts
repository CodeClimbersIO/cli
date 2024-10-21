import { useTheme } from '@mui/material'

export const getColorForRating = (
  rating: CodeClimbers.WeeklyScoreRating,
): { main: string; accent: string } => {
  const theme = useTheme()
  switch (rating) {
    case 'Positive':
      return {
        main: theme.palette.graphColors.green,
        accent: theme.palette.graphColors.greenAccent,
      }
    case 'Alert':
      return {
        main: theme.palette.graphColors.orange,
        accent: theme.palette.graphColors.orangeAccent,
      }
    case 'Neutral':
      return {
        main: theme.palette.graphColors.grey,
        accent: theme.palette.graphColors.greyAccent,
      }
  }
}
