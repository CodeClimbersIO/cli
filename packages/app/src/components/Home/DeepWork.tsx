import { Divider, useTheme } from '@mui/material'
import { TimeDataChart } from './Time/TimeDataChart'

interface Props {
  shouldShow: boolean
}
const DeepWork = ({ shouldShow }: Props) => {
  const theme = useTheme()
  if (!shouldShow) return null
  return (
    <>
      <Divider />
      <TimeDataChart
        title="Deep Work"
        time="1h 43m"
        progress={30}
        color={theme.palette.graphColors.red}
      />
    </>
  )
}

export default DeepWork
