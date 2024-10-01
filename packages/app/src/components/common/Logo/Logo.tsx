import { useTheme } from '@mui/material'

const THEME_LOGO = {
  dark: 'logo-white.svg',
  light: 'logo.svg',
}

interface Props {
  width?: number | string
  height?: number | string
}

export const Logo = ({ width = 100, height = '100%' }: Props) => {
  const logo = `/images/${THEME_LOGO[useTheme().palette.mode]}`

  return <img src={logo} width={width} height={height} />
}
