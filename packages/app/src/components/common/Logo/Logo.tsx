import { useTheme } from '@mui/material'

const THEME_LOGO = {
  dark: 'logo-white.svg',
  light: 'logo.svg',
}

export const Logo = () => {
  const logo = `/images/${THEME_LOGO[useTheme().palette.mode]}`

  return <img src={logo} width={100} style={{ height: '100%' }} />
}
