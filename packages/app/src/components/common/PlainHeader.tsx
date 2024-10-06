import { Box, Typography } from '@mui/material'

import { Logo } from '../common/Logo/Logo'
import CodeClimbersButton from '../common/CodeClimbersButton'
import { useNavigate } from 'react-router-dom'
import { Close } from '@mui/icons-material'

type Props = {
  title: string
}

const PlainHeader = ({ title }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <Box
        display="flex"
        sx={{ justifyContent: 'space-between', width: '100%' }}
      >
        <Box display="flex" flexDirection="row" gap={2}>
          <CodeClimbersButton
            variant="text"
            onClick={handleClick}
            eventName="plain_header_logo_click"
          >
            <Logo />
          </CodeClimbersButton>
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CodeClimbersButton
            variant="text"
            onClick={handleClick}
            eventName="plain_header_logo_click"
            sx={{ textTransform: 'none' }}
            color="inherit"
          >
            <Typography sx={{ mr: 2 }}>{title}</Typography>
            <Close />
          </CodeClimbersButton>
        </Box>
      </Box>
    </>
  )
}

export default PlainHeader
