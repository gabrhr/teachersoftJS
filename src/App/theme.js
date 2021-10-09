
import { createTheme } from '@mui/material/styles';
import { fontFamily } from '@mui/system';

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
      fontFamily: '"Quicksand","Arial","sans-serif"'
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
  