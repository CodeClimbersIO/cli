import { Box } from '@mui/material'
import { PromptEditor } from './PromptEditor'
import { AiWeeklyReportList } from './AIWeeklyReportList'

export const GameMakersPage = () => {
  return (
    <Box style={{ display: 'flex', height: '100vh', padding: 2 }}>
      <PromptEditor />
      <AiWeeklyReportList />
    </Box>
  )
}
