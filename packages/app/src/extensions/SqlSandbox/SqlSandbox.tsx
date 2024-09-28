import { Box, Typography, useTheme } from '@mui/material'
import CodeClimbersButton from '../../components/common/CodeClimbersButton'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

export default function SqlSandbox() {
  const navigate = useNavigate()
  const theme = useTheme()
  const handleAddClick = () => {
    navigate('/sql-sandbox')
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">Sql Sandbox</Typography>
        <CodeClimbersButton
          eventName="source_add_main_click"
          variant="contained"
          onClick={handleAddClick}
          startIcon={<AddIcon fontSize="small" />}
          sx={{
            backgroundColor:
              theme.palette.mode === 'dark' ? '#EBEBEB' : '#1F2122',
            borderRadius: '2px',
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            width: 'auto',
            height: '32px',
            minWidth: 0,
          }}
        >
          Add
        </CodeClimbersButton>
      </Box>
    </Box>
  )
}
