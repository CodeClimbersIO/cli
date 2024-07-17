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

const typography = {
  fontFamily: 'Roboto',
  h1: {
    fontFamily: 'Roboto',
    fontSize: '48px',
    lineHeight: '120%',
    fontWeight: 300,
  },
  h2: {
    fontFamily: 'Roboto',
    fontSize: '32px',
    lineHeight: '120%',
    fontWeight: 300,
  },
  h3: {
    fontFamily: 'Roboto',
    fontSize: '24px',
    lineHeight: '120%',
    fontWeight: 700,
  },
  h4: {
    fontFamily: 'Roboto',
    fontSize: '20px',
    lineHeight: '120%',
    fontWeight: 300,
  },
  h5: {
    fontFamily: 'Roboto',
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
} as ExtendedTypographyOptions

const darkOptions: ThemeOptions = {
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
  typography,
}
export const dark = createTheme(darkOptions)

const lightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#CA9FFC',
    //   contrastText: '#000000',
    // },
    // secondary: {
    //   main: '#51D982',
    //   contrastText: '#000000',
    // },
    background: {
      default: '#F5F5F5',
    },
  },
  typography,
}
export const light = createTheme(lightOptions)
