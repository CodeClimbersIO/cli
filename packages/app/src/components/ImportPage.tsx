import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import CodeClimbersButton from './common/CodeClimbersButton'
import { Logo } from './common/Logo/Logo'
import { useNavigate } from 'react-router-dom'
import { CodeSnippit } from './common/CodeSnippit/CodeSnippit'
import CodeClimbersLoadingButton from './common/CodeClimbersLoadingButton'
import {
  useHasValidLocalAuthCookie,
  useImportLocalApiKey,
} from '../api/localAuth.api'
import { useState } from 'react'

export const ImportPage = () => {
  const navigate = useNavigate()
  const { data: hasValidLocalAuthCookie, refetch } =
    useHasValidLocalAuthCookie('import')

  const { mutateAsync, isPending, isError } = useImportLocalApiKey()
  const [apiKey, setApiKey] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value)
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleSubmit = async () => {
    await mutateAsync({ apiKey })
    refetch()
  }

  return (
    <Box
      display="flex"
      sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <CodeClimbersButton
        variant="text"
        onClick={handleHomeClick}
        eventName="home_header_logo_click"
      >
        <Logo />
      </CodeClimbersButton>
      <Card
        sx={{
          boxShadow: 'none',
          borderRadius: 0,
          minWidth: 335,
          flex: 1,
          mt: 2,
        }}
      >
        {hasValidLocalAuthCookie ? (
          <CardContent
            sx={{
              padding: '24px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h3" alignContent="center" textAlign="left">
              Import | Recovery
            </Typography>
            <Typography sx={{ pt: 4 }}>
              Looks like your connection to CodeClimbers is working.
            </Typography>
            <Typography sx={{ pb: 2 }}>Keep on climbing!</Typography>
            <CodeClimbersButton
              variant="contained"
              eventName="import_submit_click"
              onClick={handleHomeClick}
            >
              Go to home
            </CodeClimbersButton>
          </CardContent>
        ) : (
          <CardContent
            sx={{
              padding: '24px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <section>
              <Typography variant="h3" alignContent="center" textAlign="left">
                Import | Recovery
              </Typography>
            </section>
            <Box
              component="section"
              sx={{ display: 'flex', flexDirection: 'column', pt: 4, gap: 1 }}
            >
              <Typography sx={{ pt: 1 }}>
                Looks like your CodeClimbers data is not available. Let's fix
                that!
              </Typography>
              <Typography sx={{ pb: 2 }}>
                Run the following command in your terminal
              </Typography>
              <CodeSnippit code="npx codeclimbers config:apikey" />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <TextField
                  placeholder="Enter your API key"
                  sx={{ width: '300px', mr: 2 }}
                  onChange={handleChange}
                  value={apiKey}
                  error={isError}
                  helperText={isError ? 'Invalid API key' : ''}
                />
                <CodeClimbersLoadingButton
                  variant="contained"
                  eventName="import_submit_click"
                  onClick={handleSubmit}
                  loading={isPending}
                  disabled={isPending || !apiKey}
                >
                  Submit
                </CodeClimbersLoadingButton>
              </Box>
            </Box>
          </CardContent>
        )}
      </Card>
    </Box>
  )
}
