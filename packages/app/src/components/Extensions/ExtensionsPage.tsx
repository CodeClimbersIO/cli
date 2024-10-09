import { Box } from '@mui/material'
import extensionsService from '../../services/extensions.service'
import { ExtensionDetail } from './ExtensionDetail'
import PlainHeader from '../common/PlainHeader'

export const ExtensionsPage = () => {
  const extensions = extensionsService.extensions
  return (
    <Box sx={{ padding: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          alignItems: 'center',
        }}
      >
        <PlainHeader title="Extensions" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, marginTop: 4 }}>
        {extensions.map((extension) => (
          <ExtensionDetail key={extension.id} extension={extension} />
        ))}
      </Box>
    </Box>
  )
}
