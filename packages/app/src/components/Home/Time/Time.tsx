import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Dayjs } from 'dayjs'

import { BossImage } from '../../common/Icons/BossImage'
import { useEffect, useRef, useState } from 'react'
import { WeeklyReportDialog } from '../../common/WeeklyReportDialog'
import { NotificationIcon } from '../../common/Icons/NotificationIcon'
import { DeepWork } from '../DeepWork'
import { CategoryChart } from './CategoryChart'
import { useGetCurrentUser } from '../../../api/browser/user.api'
import { useBrowserStorage } from '../../../hooks/useBrowserStorage'

type Props = { selectedDate: Dayjs }

const useTrackPosition = (ref: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = useState<DOMRect | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const mutationObserverRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const updatePosition = () => {
      if (ref.current) {
        const newPosition = ref.current.getBoundingClientRect()
        setPosition((prevPosition) => {
          // Only update if position actually changed
          if (!prevPosition) return newPosition
          if (
            prevPosition.top !== newPosition.top ||
            prevPosition.left !== newPosition.left
          ) {
            return newPosition
          }
          return prevPosition
        })
      }
    }

    // Set up ResizeObserver for the element and its parent
    observerRef.current = new ResizeObserver(updatePosition)
    observerRef.current.observe(ref.current)
    if (ref.current.parentElement) {
      observerRef.current.observe(ref.current.parentElement)
    }

    // Set up MutationObserver to watch for DOM changes
    mutationObserverRef.current = new MutationObserver(updatePosition)
    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })

    // Handle scroll events
    const handleScroll = () => {
      requestAnimationFrame(updatePosition)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial position
    updatePosition()

    return () => {
      observerRef.current?.disconnect()
      mutationObserverRef.current?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ref])

  return position
}

export const Time = ({ selectedDate }: Props) => {
  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false)
  const iconRef = useRef<HTMLImageElement>(null)
  const { data: user } = useGetCurrentUser()
  const [dismissedInfo, setDismissedInfo] = useBrowserStorage({
    key: 'weekly-report-dismissed',
    value: {
      dismissed: false,
      dismissedAt: null as number | null,
    },
  })
  const position = useTrackPosition(iconRef)

  const WeeklyReportSettings = () => {
    const showNotification =
      (user?.weeklyReportType === '' && !user?.email) ||
      !dismissedInfo?.dismissed
    return (
      <Box
        ref={iconRef}
        sx={{
          padding: 0.5,
          cursor: 'pointer',
        }}
        onClick={() => {
          setIsWeeklyReportModalOpen(true)
          setDismissedInfo({ dismissed: true, dismissedAt: Date.now() })
        }}
      >
        <BossImage />
        {showNotification && (
          <>
            <NotificationIcon
              height={16}
              width={16}
              sx={{
                position: 'absolute',
                top: position?.top,
                left: (position?.left || 0) + 25,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: (position?.top || 0) - 40,
                left: (position?.left || 0) - 45,
                borderRadius: 1,
                padding: 0.5,
                background: (theme) => theme.palette.background.inverted,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -6,
                  right: 10,
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: (theme) =>
                    `6px solid ${theme.palette.background.inverted}`,
                },
              }}
            >
              <Typography
                variant="monospace"
                sx={{ color: (theme) => theme.palette.text.inverted }}
              >
                Hey sport!
              </Typography>
            </Box>
          </>
        )}
      </Box>
    )
  }

  return (
    <Card
      raised={false}
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        width: '100%',
        flex: 3,
      }}
    >
      <CardContent
        sx={{
          padding: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Grid2>
            <Typography variant="h3">Time</Typography>
          </Grid2>
          <Grid2>
            <WeeklyReportSettings />
          </Grid2>
        </Grid2>
        <DeepWork selectedDate={selectedDate} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <CategoryChart selectedDate={selectedDate} />
      </CardContent>
      {user && isWeeklyReportModalOpen && (
        <WeeklyReportDialog
          user={user}
          open={isWeeklyReportModalOpen}
          onClose={() => setIsWeeklyReportModalOpen(false)}
        />
      )}
    </Card>
  )
}
