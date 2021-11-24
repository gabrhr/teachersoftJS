/* Author: Mitsuo, Gabriela
 * 
 * Wrapper for Header1, Header2, Drawer (aka. Navbar, aka. SideBar)
 */
import React from "react";
import { makeStyles } from "@mui/styles";
import {  AppBar,  Grid,  IconButton,  Button,  Toolbar,  Divider,  Avatar} from "@mui/material";
import { Typography, List, Box } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import DehazeIcon from "@mui/icons-material/Dehaze";
import logout from "../../assets/images/log-out.png";
import { styled } from "@mui/material/styles";
import LogoPucp from "../../assets/images/LogoPUCP.png";
import Menu from "./Menu";
import Header1 from '../../constants/Header1'
import Header2 from '../../constants/Header2'
import DrawerAdmin from '../../constants/DrawerAdmin'
import { UserContext } from "../../constants/UserContext";
import { MenuAdministrador } from "./MenuAdministrador";
import UserPage from "../../pages/General/UserPage";
import { MenuAsistenteSeccion } from "./MenuAsistenteSeccion";
import { MenuDocente } from "./MenuDocente";
import { MenuSecretaria } from "./MenuSecretaria";
import { MenuCoordinadorSeccion } from "./MenuCoordinadorSeccion";
import { MenuAsistenteDepartamento } from "./MenuAsistenteDepartamento";
import { MenuJefeDepartamento } from "./MenuJefeDepartamento";
import { MenuExterno } from "./MenuExterno";

function BoxPadding(props) {
  return (
    /* Content Body (aka. AppMain) (lo que tiene el fondito de la ardillita) */
    <Box
      component="main"
      /* fill remainder of body */
      width={1}
      // flexGrow={1}   // unnecessary
      // bottom="0px"
      p={2}
      overflow="auto"   // grow with content
      /* fondo y ardillita loca */
      // transform='translateZ(0)'
      sx={{
        backgroundColor: "#ffffff",
        // backgroundImage:'url("assets/img/ardillaloca.svg"), url("assets/img/rayaslocas.svg")',
        backgroundImage: 'url("assets/img/fondoDT.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom right',
        // backgroundSize:'30%',
        backgroundSize: 'contain',
      }}
    >
      <DrawerHeader />  {/*SOLAMENTE UN DIV PARA HACER MARGIN TOP, 
                            codigo repetido en HeaderUser */}
      {props.children}
    </Box>
  )
}

const useStyles = makeStyles((themex) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: themex.spacing(4),
    display: "flex",
    marginBottom: themex.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: themex.spacing(1),
    color: "#00002b",
  },
  pageTitle: {
    paddingLeft: themex.spacing(4),
    "& .MuiTypography-body1": {
      opacity: "0.6",
    },
  },
  userImage: {
    position: "relative",
    bottom: "1px",
  },
  gridSpace: {
    marginTop: themex.spacing(0),
  },
  menuImagen: {
    position: "relative",
    height: "45px",
  },
  active: {
    background: "#000",
  },
}));

const pagina = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

//Drawer props
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 5px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 2px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(8.2, 8),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function HeaderUser(props) {
  const { user, rol } = React.useContext(UserContext);

  /* estado del Drawer */
  const [open, setOpen] = React.useState(true);


  const classes = useStyles();
  let listaMenu=[];
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  let rolName     // rolname
  //let listaMenu = [];
  if (rol == 0) {
    rolName = "Administrador"
    listaMenu = MenuAdministrador
  }else if (rol == 1) {
    rolName = "Docente"
    listaMenu = MenuDocente 
  } else if (rol == 2) {
    rolName = "Asistente de Sección"
    listaMenu = MenuAsistenteSeccion
  }else if (rol == 3) {
    rolName = "Coordinador de Sección"
    listaMenu = MenuCoordinadorSeccion
  }else if (rol == 4) {
    rolName = "Asistente de Departamento"
    listaMenu = MenuAsistenteDepartamento
  }else if (rol == 5) {
    rolName = "Jefe de Departamento"
    listaMenu = MenuJefeDepartamento
  }else if (rol == 6) {
    rolName = "Secretaria de Departamento"
    listaMenu = MenuSecretaria
  } else if(rol == 7) {
    rolName = "Invitado"  // arreglar
    listaMenu = MenuExterno
  } else if(rol == 8) {
    rolName = "Asistente de Sección"  // arreglar
    listaMenu = MenuAdministrador
  }

  return (
    <Box 
      display="flex" 
      top="0px" 
      bottom="0px"
      width="100%"
    >
      {/*Header Azul*/}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary",
          boxShadow: 1,
          transform: "translateZ(0)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" mr={2}>
            <Grid item sm></Grid>
            <Grid item>
              <img className={classes.menuImagen} src={LogoPucp} alt=""></img>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/*Header de Información de usuario*/}
      <Header2 
        nombre={user.persona.nombres + ' ' + user.persona.apellidos} 
        foto={user.persona.foto_URL} 
        idRol={rol} 
        rol={rolName}
        handleDrawerOpen={handleDrawerOpen}
      />
      {/* SideBar (aka. Navbar, aka. Drawer) */}
      <DrawerAdmin 
        open={open} listaMenu={listaMenu}
      />
      {/* Router de Paginas pasa el prop */}
      <BoxPadding>
        <props.pagina />
      </BoxPadding>
    </Box>
  );
  
}