import { Box, Card, CardContent } from '@mui/material'
import extensionsService, {
  DashboardExtension,
} from '../../services/extensions.service'
import Grid2 from '@mui/material/Unstable_Grid2'

export const ExtensionsDashboard = () => {
  const extensions = extensionsService.getActiveDashboardExtensions()

  const ExtensionCard = ({ extension }: { extension: DashboardExtension }) => {
    return (
      <Grid2 sm={12} lg={6}>
        <Card
          raised={false}
          sx={{ boxShadow: 'none', borderRadius: 0, width: '100%' }}
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
      <Grid2 container>
        {extensions.map((extension) => (
          <ExtensionCard key={extension.id} extension={extension} />
        ))}
      </Grid2>
    </Box>
  )
}
