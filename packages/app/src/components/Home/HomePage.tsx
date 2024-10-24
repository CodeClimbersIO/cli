import { Box } from '@mui/material'

import { Time } from './Time/Time'
import { Navigate } from 'react-router-dom'
import { useGetHealth } from '../../services/health.service'
import { ExtensionsDashboard } from '../Extensions/ExtensionsDashboard'
import { ExtensionsWidget } from './Extensions/ExtensionsWidget'
import { Sources } from './Source/Sources'
import { DateHeader } from './DateHeader'
import { useSelectedDate } from '@app/hooks/useSelectedDate'

const HomePage = () => {
  const { data: health, isPending: isHealthPending } = useGetHealth({
    retry: false,
    refetchInterval: false,
  })
  const { selectedDate, setSelectedDate } = useSelectedDate()

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
        <Time selectedDate={selectedDate} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <Sources selectedDate={selectedDate} />
          <ExtensionsWidget />
        </Box>
      </Box>
      <ExtensionsDashboard />
    </div>
  )
}

export { HomePage }
