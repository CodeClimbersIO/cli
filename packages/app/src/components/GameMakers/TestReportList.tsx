import { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
} from '@mui/material'
import { useGetGameSettings } from '../../api/platformServer/gameSettings.platformApi'

interface TestReport {
  id: string
  content: string
  timestamp: string
}

export const TestReportList = () => {
  const { data } = useGetGameSettings('ai-weekly-report')

  const [testReports, setTestReports] = useState<TestReport[]>([])
  const [selectedReport, setSelectedReport] = useState<TestReport | null>(null)

  useEffect(() => {
    if (data) {
      setTestReports(data.testReports)
    }
  }, [data])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Test Reports
      </Typography>
      <Box display="flex">
        <List style={{ width: '30%', marginRight: 16 }}>
          {testReports.map((report) => (
            <ListItem
              key={report.id}
              button
              selected={selectedReport?.id === report.id}
              onClick={() => setSelectedReport(report)}
            >
              <ListItemText
                primary={`Report ${report.id}`}
                secondary={new Date(report.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
        <Paper style={{ width: '70%', padding: 16 }}>
          {selectedReport ? (
            <>
              <Typography variant="h6">Report {selectedReport.id}</Typography>
              <Typography variant="body1">{selectedReport.content}</Typography>
            </>
          ) : (
            <Typography variant="body1">
              Select a report to view details
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  )
}
