import { Box, Tab, Tabs, TextField } from '@mui/material'
import { CodeClimbersButton } from '../common/CodeClimbersButton'
import {
  useGetGameSettings,
  useRunAiWeeklyReport,
  useUpdateGameSettings,
} from '../../api/platformServer/gameSettings.platformApi'
import { useState, useEffect } from 'react'
import { CodeClimbersLoadingButton } from '../common/CodeClimbersLoadingButton'

export const PromptEditor = () => {
  const { data } = useGetGameSettings('ai-weekly-report')
  const { mutate: updateGameSettings } = useUpdateGameSettings()
  const { mutate: runAiWeeklyReport, isPending: isRunningReport } =
    useRunAiWeeklyReport()
  const [gamePrompt, setGamePrompt] = useState('')
  const [testScores, setTestScores] = useState('')

  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  useEffect(() => {
    if (data) {
      setGamePrompt(data.prompt)
      setTestScores(data.testScores)
    }
  }, [data])

  const handleSave = () => {
    updateGameSettings({
      id: 'ai-weekly-report',
      settings: { prompt: gamePrompt, testScores: testScores }, // Include testScores
    })
  }

  const handleGenerateReport = () => {
    try {
      const body = JSON.parse(testScores)
      runAiWeeklyReport(body)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box
      sx={{
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Prompt" />
        <Tab label="Test Scores" />
      </Tabs>
      {selectedTab === 0 && (
        <TextField
          multiline
          value={gamePrompt}
          onChange={(e) => setGamePrompt(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        />
      )}
      {selectedTab === 1 && (
        <TextField
          multiline
          value={testScores}
          onChange={(e) => setTestScores(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        />
      )}
      <Box sx={{ display: 'flex' }}>
        <CodeClimbersButton
          eventName="save-game-settings"
          onClick={handleSave}
          fullWidth
        >
          Save
        </CodeClimbersButton>
        <CodeClimbersLoadingButton
          eventName="generate-report"
          onClick={handleGenerateReport}
          fullWidth
          loading={isRunningReport}
        >
          Generate Report
        </CodeClimbersLoadingButton>
      </Box>
    </Box>
  )
}
