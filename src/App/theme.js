
import { createTheme } from '@mui/material/styles';
import { color, fontFamily } from '@mui/system';

const theme = createTheme({
    palette: {
      primary: {
        dark: "#00002b",
        main: "#042354",
        light: "#3b4a81"
      },
      DTButton: {
        dark:  "#00002b",
        main:  "#3b4a81",
        light: "#3b4a81",
        contrastText: "#ffffff"
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
      },
      itemlist:{
        dark: "#3b4a81",
        main: "#41b9e427",
        light: "#3b4a8120"
      }
    },
    typography: {
      fontFamily: '"Quicksand","Arial","sans-serif"',
      fontStyle: "Regular",
      h1:{
        fontSize: '70px',
      },
      h2:{ //Login titulo grande
         fontFamily: 'NotoSerif',
        fontStyle: 'SemiBold',
        fontSize: '50px',
        lineHeight: '50px',
      },
      h3:{ //Encabezado
        fontFamily: 'NotoSerif',
        fontStyle: 'SemiBold',
        fontSize: 30,
        lineHeight: '50px',
      },
      h4:{
        fontFamily: 'NotoSerif',
        fontStyle: 'SemiBold',
        fontSize: 18,
        lineHeight: '50px'
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
            margin: '4px',
          }
        },
      },
      MuiListItemButton:{
        styleOverrides:{
          root:{
            borderRadius: "0 50px 50px 0 ",
          },
          
        },
      }
    },

})

export default theme;
  