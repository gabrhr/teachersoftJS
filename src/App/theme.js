
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
      background: {
        default: "#f4f5fd"
      }
    },
    shape: {
      borderRadius: '4px'
    },
    overrides: {
      MuiAppBar: {
        root: {
          transform:'translateZ(0)'
        }
      }
    },
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
              textTransform: 'none',
            }
          },
        },
    },

})

export default theme;
  