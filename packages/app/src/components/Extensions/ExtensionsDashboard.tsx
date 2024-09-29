import { Box, Card, CardContent } from '@mui/material'
import extensionsService, {
  DashboardExtension,
} from '../../services/extensions.service'
import Grid2 from '@mui/material/Unstable_Grid2'
import CodeClimbersButton from '../common/CodeClimbersButton'
import { useNavigate } from 'react-router-dom'

export const ExtensionsDashboard = () => {
  const extensions = extensionsService.getActiveDashboardExtensions()
  const navigate = useNavigate()

  const ExtensionCard = ({ extension }: { extension: DashboardExtension }) => {
    return (
      <Grid2 sm={12} lg={6}>
        <Card
          raised={false}
          sx={{
            boxShadow: 'none',
            borderRadius: 0,
            width: '100%',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent
            sx={{
              padding: '20px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <extension.component />
          </CardContent>
        </Card>
      </Grid2>
    )
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid2 container spacing={4}>
        {extensions.map((extension) => (
          <ExtensionCard key={extension.id} extension={extension} />
        ))}
        {/* if extensions will only have one component, add an additional component to the grid to "add an extension" */}
        {extensions.length % 2 === 1 && (
          <Grid2 sm={12} lg={6}>
            <Card
              raised={false}
              sx={{
                boxShadow: 'none',
                borderRadius: 0,
                width: '100%',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                <CodeClimbersButton
                  eventName="dashboard-add-extension"
                  variant="text"
                  onClick={() => {
                    navigate('/extensions')
                  }}
                >
                  Add extension
                </CodeClimbersButton>
              </CardContent>
            </Card>
          </Grid2>
        )}
      </Grid2>
    </Box>
  )
}
