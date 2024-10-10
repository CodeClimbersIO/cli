import { CircularProgress, useTheme } from '@mui/material'
import { TimeDataChart } from './Time/TimeDataChart'
import { Dayjs } from 'dayjs'
import { minutesToHours } from './Time/utils'
import { useDeepWorkV2, useProjectsTimeByRange } from '../../api/pulse.api'

interface Props {
  selectedDate: Dayjs
}
const DeepWork = ({ selectedDate }: Props) => {
  const theme = useTheme()
  const {
    isLoading,
    isError,
    data: deepWork,
  } = useDeepWorkV2(selectedDate, selectedDate.endOf('day'))


  if (isLoading) return <CircularProgress />
  if (isError || !deepWork) return <div>Error</div>

  const totalTime = deepWork[0]?.time ?? 0
  return (
    <>
      <TimeDataChart
        title="Deep Work"
        time={minutesToHours(totalTime)}
        progress={(totalTime / (3 * 60)) * 100}
        color={theme.palette.graphColors.red}
      />
    </>
  )
}

export { DeepWork }
