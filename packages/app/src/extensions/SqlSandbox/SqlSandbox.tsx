import { Box, Typography, useTheme } from '@mui/material'
import CodeClimbersButton from '../../components/common/CodeClimbersButton'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import sqlSaveService from './sqlSandbox.service'

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
        {/* Add a list of saved sql queries pulled from local storage */}
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography sx={{ pb: 1 }}>Saved Queries</Typography>
        {sqlSaveService.getSqlList().map((sql) => (
          <Box
            key={sql.name}
            sx={{
              width: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px',
              p: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            onClick={() => {
              navigate(`/sql-sandbox?sqlId=${sql.id}`)
            }}
          >
            {sql.name}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
