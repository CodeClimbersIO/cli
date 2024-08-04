import { useTheme } from '@mui/material'
import blackLogo from '../../public/images/logo.png'
import whiteLogo from '../../public/images/logo-white.png'

const Logo = () => {
  const logo = useTheme().palette.mode === 'dark' ? whiteLogo : blackLogo

  return <img src={logo} width={100} height={40} />
}

export default Logo
