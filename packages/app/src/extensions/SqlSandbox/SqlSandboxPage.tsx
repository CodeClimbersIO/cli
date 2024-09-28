import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import CodeClimbersButton from '../../components/common/CodeClimbersButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DownloadIcon from '@mui/icons-material/Download'
import { useRunSql } from './Sandbox.api'
import { useState } from 'react'

export default function SqlSandboxPage() {
  const [sql, setSql] = useState(
    `SELECT * FROM activities_pulse ORDER BY id DESC LIMIT 10;`,
  )

  const [results, setResults] = useState<any[]>([])
  const { mutateAsync: runSql, isPending } = useRunSql()

  const onRunSql = async () => {
    console.log('run sql')
    const res = await runSql(sql)
    console.log(res)
    setResults(res)
  }

  const onDownloadCsv = () => {
    console.log('download csv')
  }

  const onSqlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSql(e.target.value)
  }
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <TextField label="Name" placeholder="Untitled" value="Untitled.sql" />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <CodeClimbersButton
              eventName="run-sql"
              startIcon={<PlayArrowIcon />}
              color="primary"
              variant="contained"
              sx={{ alignSelf: 'center' }}
              onClick={onRunSql}
            >
              Run
            </CodeClimbersButton>
            <CodeClimbersButton
              eventName="download-csv"
              startIcon={<DownloadIcon />}
              color="primary"
              variant="contained"
              sx={{ alignSelf: 'center' }}
              disabled={results.length === 0}
              onClick={onDownloadCsv}
            >
              Download
            </CodeClimbersButton>
          </Box>
        </Box>
        <Box>
          <TextField
            label="SQL Query"
            multiline
            fullWidth
            minRows={15}
            value={sql}
            onChange={onSqlChange}
          />
        </Box>
        {isPending && <Box>Loading...</Box>}
        <Box>
          <Typography>Results</Typography>
          {results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="results table">
                <TableHead>
                  <TableRow>
                    {Object.keys(results[0]).map((key) => (
                      <TableCell
                        key={key}
                        sx={{
                          fontWeight: 'bold',
                          maxWidth: '50px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Tooltip
                          title={key}
                          componentsProps={{
                            tooltip: { sx: { color: 'black' } },
                          }}
                        >
                          <span>{key}</span>
                        </Tooltip>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      {Object.entries(row).map(([key, value], cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          sx={{
                            maxWidth: '100px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Tooltip
                            title={String(value)}
                            componentsProps={{
                              tooltip: { sx: { color: 'black' } },
                            }}
                          >
                            <span>{String(value)}</span>
                          </Tooltip>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  )
}
