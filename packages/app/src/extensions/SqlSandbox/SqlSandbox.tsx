import { Box, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { getSqlList } from './sqlSandbox.service'
import { CodeClimbersButton } from '../../components/common/CodeClimbersButton'

export const SqlSandbox = () => {
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
      <Box sx={{ pt: 6, height: '210px', overflowY: 'auto' }}>
        <Typography sx={{ pb: 1 }}>Saved Queries</Typography>
        {getSqlList().map((sql) => (
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
