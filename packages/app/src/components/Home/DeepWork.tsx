import { CircularProgress, Divider, useTheme } from '@mui/material'
import { TimeDataChart } from './Time/TimeDataChart'
import { useDeepWork } from '../../api/pulse.api'
import { Dayjs } from 'dayjs'
import { minutesToHours } from './Time/utils'

interface Props {
  selectedDate: Dayjs
}
const DeepWork = ({ selectedDate }: Props) => {
  const theme = useTheme()
  const {
    isLoading,
    isError,
    isEmpty,
    data: deepWork,
  } = useDeepWork(selectedDate)

  if (isLoading) return <CircularProgress />
  if (isError || isEmpty || !deepWork) return <div>Error</div>
  console.log(deepWork)
  const totalTime = deepWork.reduce((acc, curr) => acc + curr.flowTime, 0)
  return (
    <>
      <Divider />
      <TimeDataChart
        title="Deep Work"
        time={minutesToHours(totalTime)}
        progress={(totalTime / (3 * 60)) * 100}
        color={theme.palette.graphColors.red}
      />
    </>
  )
}

export default DeepWork
