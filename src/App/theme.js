
import { createTheme } from '@mui/material/styles';
import { borderRadius, color } from '@mui/system';
import { esES } from '@mui/material/locale';
// import { color, fontFamily } from '@mui/system';

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
      },
      pendiente: {
        // dark: "#ff0000",
        // main: "#00ff00",
        light: "#E9D630",
      }
      
    },
    typography: {
      fontFamily: '"Quicksand","Arial","sans-serif"',
      fontStyle: "Regular",
      h1:{
        fontSize: '70px',
      },
      h2:{ //Login titulo grande
        // fontFamily: 'NotoSerif',
        fontFamily: '"Quicksand","Arial","sans-serif"',
        fontStyle: 'SemiBold',
        fontSize: '50px',
        lineHeight: '50px',
      },
      h3:{ //Encabezado
        // fontFamily: 'NotoSerif',
        fontFamily: '"Quicksand","Arial","sans-serif"',
        fontStyle: 'SemiBold',
        fontSize: 30,
        lineHeight: '30px',
      },
      h5:{
        /* (LO SIENTO MUCHO GENTE) Este es intermedio entre h3 y h4. 
         * Sino malogra titulos existentes.
         */
        // fontFamily: 'NotoSerif',
        fontFamily: '"Quicksand","Arial","sans-serif"',
        fontStyle: 'SemiBold',
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: '30px',
      },
      h4:{
        // fontFamily: 'NotoSerif',
        fontFamily: '"Quicksand","Arial","sans-serif"',
        fontStyle: 'SemiBold',
        fontSize: 18,
        lineHeight: '30px',
      },
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
            fontFamily: '"NotoSans", "Quicksand", "Arial", "sans-serif',
            borderRadius:"24px"
          }
        },
      },
      MuiListItemButton:{
        styleOverrides:{
          root:{
            borderRadius: "0 50px 50px 0 ",
            "&.Mui-selected":{
              backgroundColor: "#41b9e427"
            },
            "&.Mui-selected:hover":{
              backgroundColor: "#3b4a8130"
            },
          },
        },
        // como es esto de variants, props, style? 
        variants:[
          {
            props: { variant: 'submenu' },
            style: {
              
              borderRadius: "0 50px 50px 0 ",
              "&.Mui-selected":{
                boxShadow: "0px 2px 10px -5px #41b9e4",
                backgroundColor: "#fff" ,
                color: "#41b9e4"
              },
              "&.Mui-selected:hover":{
                backgroundColor: "#41b9e410",
                color:"#042354"
              },
              typography:{
                fontStyle: 'SemiBold',
              }
            },
        },],
      },
      MuiPaper:{
        styleOverrides: {
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              backgroundColor: "#fff",
              color: "#000",
              opacity: 1
            }
          }
        },
      },
    },
    
},esES)

export default theme;
  