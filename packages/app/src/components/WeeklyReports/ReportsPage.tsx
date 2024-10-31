import { Box, Divider, Stack, Typography } from '@mui/material'
import { DateHeader } from '../Home/DateHeader'
import { ProjectScore } from './ProjectScore'
import { GrowthScore } from './GrowthScore'
import { DeepWorkScore } from './DeepWorkScore'
import { ActiveHoursScore } from './ActiveHoursScore'
import { Logo } from '../common/Logo/Logo'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useGetLocalServerWeeklyReport } from '../../api/localServer/report.localapi'
import { CodeClimbersLink } from '../common/CodeClimbersLink'
import { useSelectedWeekDate } from '../../hooks/useSelectedDate'
import { BigBrotherReview } from './BigBrotherReview'
import agi2024 from '../../assets/agi_2048.png'
import { posthog } from 'posthog-js'
import { useGetCurrentUser } from '../../api/browser/user.api'

export const ReportsPage = () => {
  const { selectedDate, setSelectedDate } = useSelectedWeekDate()

  const { data: weeklyScores, isPending } =
    useGetLocalServerWeeklyReport(selectedDate)

  const { data: user } = useGetCurrentUser()

  if (isPending || !weeklyScores || !user) {
    return <div>Loading</div>
  }

  const reportOff = user?.weeklyReportType !== 'ai'
  return (
    <Box sx={{ padding: '2rem' }}>
      <DateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        period={'week'}
        title="Reports"
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: {
              xs: 'column',
              lg: 'row',
              maxWidth: '1200px',
              width: '100%',
            },
            alignItems: {
              xs: 'center',
              lg: 'flex-start',
            },
            justifyContent: 'center',
          }}
        >
          <BigBrotherReview />
          <Stack
            sx={{
              alignItems: 'center',
              flex: 1,
              maxWidth: '500px',
              width: '100%',
            }}
            gap={4}
          >
            <Stack
              gap={4}
              sx={{
                width: '100%',
                mt: 2,
                background: (theme) => theme.palette.background.paper,
                p: 4,
              }}
            >
              <Stack gap={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Logo />
                  <Stack gap={1} sx={{ alignItems: 'flex-end' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {weeklyScores.totalScore.score}/10
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        textAlign: 'center',
                        height: 'auto',
                      }}
                    >
                      <InfoOutlinedIcon fontSize="inherit" />{' '}
                      <CodeClimbersLink
                        eventName="weekly_report_overall_score_learn_more"
                        href="https://codeclimbers.io/blog/weekly-report"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          textDecoration: 'none',
                        }}
                      >
                        Overall Score
                      </CodeClimbersLink>
                    </Typography>
                  </Stack>
                </Box>
                <Divider />
              </Stack>
              <DeepWorkScore
                deepWorkScore={{
                  ...weeklyScores?.deepWorkTimeScore,
                  breakdown: weeklyScores?.deepWorkTimeScore
                    .breakdown as CodeClimbers.DeepWorkPeriod[],
                }}
              />
              <ProjectScore
                projectScore={{
                  ...weeklyScores?.projectTimeScore,
                  breakdown: weeklyScores?.projectTimeScore
                    .breakdown as CodeClimbers.PerProjectTimeOverviewDB[],
                }}
              />
              <GrowthScore
                growthScore={{
                  ...weeklyScores?.growthScore,
                  breakdown: weeklyScores?.growthScore
                    .breakdown as CodeClimbers.EntityTimeOverviewDB[],
                }}
              />
              <ActiveHoursScore
                activeHoursScore={{
                  ...weeklyScores?.totalTimeScore,
                  breakdown: weeklyScores?.totalTimeScore.breakdown as number,
                }}
              />
            </Stack>
            {!reportOff && (
              <Box
                sx={{ maxWidth: '500px', width: '100%', position: 'relative' }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 6,
                    border: '1px solid transparent',
                    '&:hover': {
                      cursor: 'pointer',
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                    },
                  }}
                  onClick={() => {
                    window.open(
                      'https://codeclimbers.io/blog/big-brother',
                      '_blank',
                    )
                    posthog.capture('weekly_report_agi_2048_clicked')
                  }}
                >
                  <Typography variant="h3">The Year is 2048</Typography>
                  <pre>After AGI nothing was the same</pre>
                </Box>
                <img src={agi2024} style={{ width: '100%' }} />
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CodeClimbersLink
                eventName="weekly_report_on_this_report_learn_more"
                href="https://forms.gle/avUz3TLdvWAaqmV5A"
                color="inherit"
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                Submit Feedback
              </CodeClimbersLink>
              <Typography>&nbsp;on this report</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
