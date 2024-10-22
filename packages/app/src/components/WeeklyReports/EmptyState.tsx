import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { CodeClimbersLink } from '../common/CodeClimbersLink'
export const EmptyState = () => {
  const theme = useTheme()
  return (
    <Card
      raised={false}
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        background: theme.palette.background.paper_raised,
        maxWidth: '420px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <InfoOutlinedIcon color="primary" />
        <Stack gap={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            No Data Available
          </Typography>
          <Typography variant="body1">
            We don't see any data for this category this week. But you still get
            some points for showing up :)
          </Typography>
          <CodeClimbersLink
            eventName="weekly_report_empyt_state_learn_more"
            color="inherit"
            sx={{
              color: theme.palette.text.secondary,
            }}
            href="https://codeclimbers.io/blog/weekly-report"
          >
            Learn more about points
          </CodeClimbersLink>
        </Stack>
      </CardContent>
    </Card>
  )
}
