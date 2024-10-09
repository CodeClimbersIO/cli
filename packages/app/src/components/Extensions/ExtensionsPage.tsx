import { Box } from '@mui/material'
import { ExtensionDetail } from './ExtensionDetail'
import { PlainHeader } from '../common/PlainHeader'
import { getExtensions } from '../../services/extensions.service'

export const ExtensionsPage = () => {
  const extensions = getExtensions()
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
