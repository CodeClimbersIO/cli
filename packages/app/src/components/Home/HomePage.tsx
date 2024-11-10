import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { useSelectedDate } from '../../hooks/useSelectedDate'
import { Time } from './Time/Time'
import { useGetHealth } from '../../services/health.service'
import { ExtensionsDashboard } from '../Extensions/ExtensionsDashboard'
import { ExtensionsWidget } from './Extensions/ExtensionsWidget'
import { Sources } from './Source/Sources'
import { DateHeader } from './DateHeader'
import { useSetFeaturePreference } from '../../hooks/useSetFeaturePreference'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../ErrorFallback'

const HomePage = () => {
  const { data: health, isPending: isHealthPending } = useGetHealth({
    retry: false,
    refetchInterval: false,
  })
  const { selectedDate, setSelectedDate } = useSelectedDate()
  useSetFeaturePreference()

  if (!health && !isHealthPending) return <Navigate to="/install" />

  return (
    <div style={{ padding: '2rem' }}>
      <DateHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 4,
          mb: 4,
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Time selectedDate={selectedDate} />
        </ErrorBoundary>
        <Box
          sx={{
            display: 'flex',
            flex: 3,
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Sources selectedDate={selectedDate} />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ExtensionsWidget />
          </ErrorBoundary>
        </Box>
      </Box>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ExtensionsDashboard />
      </ErrorBoundary>
    </div>
  )
}

export { HomePage }
