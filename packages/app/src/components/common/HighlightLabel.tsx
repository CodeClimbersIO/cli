import { Box, Typography } from '@mui/material'

export const HighlightLabel = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        width: 'fit-content',
        border: '1px solid',
        borderColor: (theme) => theme.palette.background.border,
        paddingX: 1,
        borderRadius: '4px',
        background: (theme) => theme.palette.background.medium,
      }}
    >
      <Typography
        sx={{
          textTransform: 'uppercase',
          color: (theme) => theme.palette.text.actionDown,
          fontSize: '12px',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
