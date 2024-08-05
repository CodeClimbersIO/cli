import { useTheme } from '@mui/material'

const THEME_LOGO = {
  dark: 'logo-white.png',
  light: 'logo.png',
}

const Logo = () => {
  const logo = `/images/${THEME_LOGO[useTheme().palette.mode]}`

  return <img src={logo} width={100} height={40} />
}

export default Logo
