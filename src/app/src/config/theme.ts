import '@mui/lab/themeAugmentation'
import { ThemeOptions, createTheme } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  body3: React.CSSProperties
}

const options: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#CA9FFC',
      contrastText: '#000000',
    },
    secondary: {
      main: '#51D982',
      contrastText: '#000000',
    },
    background: {
      default: '#323232',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontFamily: 'Bai Jamjuree',
      fontSize: '48px',
      lineHeight: '120%',
      fontWeight: 300,
    },
    h2: {
      fontFamily: 'Bai Jamjuree',
      fontSize: '32px',
      lineHeight: '120%',
      fontWeight: 300,
    },
    h3: {
      fontFamily: 'Bai Jamjuree',
      fontSize: '20px',
      lineHeight: '120%',
      fontWeight: 300,
    },
    h4: {
      fontFamily: 'Bai Jamjuree',
      fontSize: '20px',
      lineHeight: '120%',
      fontWeight: 300,
    },
    h5: {
      fontFamily: 'Bai Jamjuree',
      textTransform: 'uppercase',
      fontSize: '14px',
      lineHeight: '120%',
      fontWeight: 500,
    },
    // default body1
    body1: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    // small
    body2: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: 400,
    },
    // xsmall
    body3: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
    },
  } as ExtendedTypographyOptions,
}

const theme = createTheme(options)

export default theme
