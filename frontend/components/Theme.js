/* customizing the material-ui theme, and then 
export it , so that it will be used in  App component */


import { createMuiTheme } from '@material-ui/core/styles'
import { pink, green, grey, red } from '@material-ui/core/colors'


// creating our theme function component
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#5c67a3',
      main: '#334ac0',
      dark: '#4764ca',
      contrastText: '#fff',
    },
    secondary: {
      light: '#93cefc',
      main: '#ff3366',
      dark: '#c60055',
      contrastText: '#000',
    },
      openTitle: '#28282a',
      protectedTitle: pink['400'],
      type: 'light',
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      xLight: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
    }
})

export default theme