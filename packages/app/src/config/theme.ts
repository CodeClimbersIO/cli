import '@mui/lab/themeAugmentation'
import { ThemeOptions, createTheme } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

interface GraphColors {
  blue: string
  purple: string
  green: string
  greenAccent: string
  orange: string
  orangeAccent: string
  grey: string
  greyAccent: string
  red: string
}

declare module '@mui/material/styles' {
  interface Palette {
    graphColors: GraphColors
  }

  interface PaletteOptions {
    graphColors?: GraphColors
  }
  interface TypeBackground {
    paper_raised: string
    medium: string
    border: string
  }
  interface TypeText {
    actionDown?: string
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
    lineHeight: '20px',
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

const lightGraphColors: GraphColors = {
  blue: '#3892F3',
  purple: '#7E84FC',
  green: '#15A46E',
  greenAccent: '#005132',
  orange: '#1F2122',
  orangeAccent: '#7A2F00',
  grey: '#414346',
  greyAccent: '#1F2122',
  red: '#F75C46',
}

const darkGraphColors: GraphColors = {
  blue: '#348FF4',
  purple: '#7C81FB',
  green: '#12A26C',
  greenAccent: '#81E9B8',
  orange: '#E16D00',
  orangeAccent: '#FDCE88',
  grey: '#707070',
  greyAccent: '#EBEBEB',
  red: '#F65843',
}

const BASE_THEME = createTheme({ palette: { mode: 'dark' } })
const BASE_THEME_GREYS = BASE_THEME.palette.grey

const darkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#1D1D1D',
      paper: BASE_THEME_GREYS[900],
      paper_raised: '#323232',
      medium: '#3F3F3F',
      border: '#707070',
    },
    primary: {
      main: '#72B7F9',
    },
    text: {
      actionDown: '#AEDBFE',
    },
    graphColors: darkGraphColors,
    // Much better readability in dark modes and accessibility
    grey: {
      50: BASE_THEME_GREYS[900],
      100: BASE_THEME_GREYS[800],
      200: BASE_THEME_GREYS[700],
      300: BASE_THEME_GREYS[600],
      400: BASE_THEME_GREYS[500],
      500: BASE_THEME_GREYS[400],
      600: BASE_THEME_GREYS[300],
      700: BASE_THEME_GREYS[200],
      800: BASE_THEME_GREYS[100],
      900: BASE_THEME_GREYS[50],
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  typography,
}
export const dark = createTheme(darkOptions)

const lightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#769E68',
    },
    background: {
      default: '#F5F5F5',
      paper: '#F8F8F8',
      paper_raised: '#E6E6E6',
    },
    graphColors: lightGraphColors,
    text: {
      primary: '#222222', //default
      secondary: '#000000', //strong
      disabled: '#464646', //weak
    },
  },
  typography,
}
export const light = createTheme(lightOptions)
