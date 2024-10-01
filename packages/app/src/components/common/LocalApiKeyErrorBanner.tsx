import { Alert, Box } from '@mui/material'
import CodeClimbersButton from './CodeClimbersButton'
import { useValidateLocalApiKey } from '../../services/localAuth.service'
import { useNavigate } from 'react-router-dom'

export const LocalApiKeyErrorBanner = () => {
  const { data, isPending } = useValidateLocalApiKey('banner')
  const navigate = useNavigate()
  if (isPending || data?.isValid) {
    return null
  }
  return (
    <Box sx={{ position: 'fixed', left: 15, bottom: 15, zIndex: 1000 }}>
      <Alert severity="error">
        Looks like you need to update your local API key.
        <CodeClimbersButton
          eventName="local_api_key_error_update_button_click"
          variant="outlined"
          color="inherit"
          onClick={() => {
            navigate('/import')
          }}
          sx={{ marginLeft: 1 }}
        >
          Update API Key
        </CodeClimbersButton>
      </Alert>
    </Box>
  )
}
