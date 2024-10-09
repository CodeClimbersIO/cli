import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material'
import {
  addExtension,
  Extension,
  isExtensionAdded,
  removeExtension,
} from '../../services/extensions.service'
import { Logo } from '../common/Logo/Logo'
import { useState } from 'react'
import { AuthorInfo } from './AuthorInfo'
// eslint-disable-next-line import/no-named-as-default
import posthog from 'posthog-js'

interface Props {
  extension: Extension
}

export const ExtensionDetail = ({ extension }: Props) => {
  const [imageError, setImageError] = useState(false)

  const [isAdded, setIsAdded] = useState(isExtensionAdded(extension.id))

  const handleToggle = () => {
    if (!isAdded) {
      posthog.capture(`extension_add_${extension.id}_click`)
      addExtension(extension.id)
      extension.onAdd?.()
      window.location.reload() // need to reload the page so that the app router picks up new extension
    } else {
      posthog.capture(`extension_remove_${extension.id}_click`)
      removeExtension(extension.id)
      extension.onRemove?.()
    }
    setIsAdded(!isAdded)
  }

  const defaultImage = () => {
    return (
      <Card
        raised={true}
        sx={{
          borderRadius: 0,
          width: '100%',
          height: '200px',
        }}
      >
        <Logo width={'100%'} height={'100%'} />
      </Card>
    )
  }

  return (
    <Card
      raised={false}
      sx={{
        boxShadow: 'none',
        borderRadius: 0,
        width: '300px',
      }}
    >
      <CardContent
        sx={{
          padding: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="h6">{extension.name}</Typography>
            <AuthorInfo
              authorUrl={extension.authorUrl}
              authorName={extension.authorName}
            />
          </Box>
          <Box>
            {extension.image && !imageError ? (
              <Card
                raised={true}
                sx={{
                  borderRadius: 0,
                  width: '100%',
                  height: '200px',
                }}
              >
                <img
                  src={extension.image}
                  alt={extension.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                  onError={() => setImageError(true)}
                />
              </Card>
            ) : (
              defaultImage()
            )}
          </Box>
          <Typography variant="body1">{extension.description}</Typography>
        </Box>
        <FormControlLabel
          sx={{
            width: 'fit-content',
            alignSelf: 'flex-end',
          }}
          control={
            <Switch checked={isAdded} onChange={handleToggle} color="primary" />
          }
          label={isAdded ? 'Enabled' : 'Disabled'}
        />
      </CardContent>
    </Card>
  )
}
