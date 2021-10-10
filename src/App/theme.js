
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        dark: "#00002b",
        main: "#042354",
        light: "#3b4a81"
      },
      secondary: {
        dark: "#7eebff",
        main: "#41b9e4",
        light: "#0089b2"
      },
      disabled: {
        dark: "#D4D9EC",
        main: "#E9ECF8",
        light: "#F0F0F0"
      },
      background: {
        default: "#f4f5fd"
      }
    },
    typography: {
      fontFamily: '"Quicksand","Arial","sans-serif"',
      h1:{
        fontSize: '70px',
      },
      h4:{
        fontFamily: 'NotoSerif',
        fontStyle: 'SemiBold',
        fontSize: '50px',
        lineHeight: '65px',
      }
    },
    shape: {
      borderRadius: 4
    },
    // Cual es la diferencia entre props: y components:
    props: {
      MuiIconButton: {
        disableRipple: true
      },
      MuiButton: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple!
        },
      },
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              // textTransform: 'none',
              margin: '4px'
            }
          },
        },
    },

})

export default theme;
  