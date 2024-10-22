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
  Pagination,
  Typography,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DownloadIcon from '@mui/icons-material/Download'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { useRunSql } from './sandbox.api'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { convertRecordsToCSV, downloadBlob } from '../../utils/csv.util'
import { deleteSql, getSql, saveSql } from './sqlSandbox.service'
import { CodeClimbersButton } from '../../components/common/CodeClimbersButton'
import { CodeClimbersIconButton } from '../../components/common/CodeClimbersIconButton'

const defaultSql = `SELECT * FROM activities_pulse ORDER BY id DESC LIMIT 10;`
export const SqlSandboxPage = () => {
  // get sql name from url param
  const [searchParams] = useSearchParams()
  const sqlIdFromUrl = searchParams.get('sqlId')
  const navigate = useNavigate()

  const savedSql = getSql(sqlIdFromUrl || '') || defaultSql
  const [sql, setSql] = useState(savedSql.sql || defaultSql)

  const [sqlName, setSqlName] = useState(savedSql.name || 'Untitled.sql')
  const [sqlId, setSqlId] = useState(savedSql.id || uuidv4())
  const [page, setPage] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<Record<string, any>[]>([])
  const { mutateAsync: runSql, isPending } = useRunSql()

  const onRunSql = async () => {
    const res = await runSql(sql)
    setResults(res)
  }

  const onDownloadCsv = () => {
    const csvContent = convertRecordsToCSV(results)
    const blob = new Blob([csvContent])
    downloadBlob(blob, 'results.csv')
  }

  const onSaveSql = () => {
    // save sql to local storage
    saveSql(sqlName, sql, sqlId)
    setSqlId(sqlId)
  }

  const onSqlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSql(e.target.value)
  }

  const onDeleteSql = () => {
    if (!sqlIdFromUrl) return
    deleteSql(sqlIdFromUrl)
    navigate('/')
  }

  const resultsPerPage = 50

  const paginatedResults = useMemo(() => {
    const startIndex = (page - 1) * resultsPerPage
    return results.slice(startIndex, startIndex + resultsPerPage)
  }, [results, page])

  const totalPages = Math.ceil(results.length / resultsPerPage)

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const onSqlNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSqlName(e.target.value)
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <TextField
            label="Name"
            placeholder="Untitled"
            value={sqlName}
            onChange={onSqlNameChange}
          />
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
              eventName="save-sql"
              startIcon={<SaveIcon />}
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'center' }}
              onClick={onSaveSql}
            >
              Save
            </CodeClimbersButton>
            <CodeClimbersButton
              eventName="download-csv"
              startIcon={<DownloadIcon />}
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'center' }}
              disabled={results.length === 0}
              onClick={onDownloadCsv}
            >
              Download
            </CodeClimbersButton>
            <CodeClimbersIconButton
              eventName="delete-sql"
              color="primary"
              sx={{ alignSelf: 'center' }}
              onClick={onDeleteSql}
            >
              <DeleteIcon />
            </CodeClimbersIconButton>
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
            <>
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
                    {paginatedResults.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        {Object.entries(row).map(([, value], cellIndex) => (
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
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
