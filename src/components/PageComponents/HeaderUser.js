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


import { MenuAdministrador } from "./MenuAdministrador";
import UserPage from "../../pages/General/UserPage";
import { MenuAsistenteSeccion } from "./MenuAsistenteSeccion";

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


const HeaderUser = ({ nombre, idRol, foto }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  let rol
  let listaMenu=[];
  const handleDrawerOpen = () => {
    setOpen(!open);
  }; 
  
  if(idRol==0){
    rol="Administrador"
    listaMenu = MenuAdministrador
  }
  if(idRol==1){
    rol="Asistente de Sección"
    listaMenu = MenuAsistenteSeccion
  }
  if(idRol==2){
    rol="Coordinador de Sección"
    listaMenu = MenuAsistenteSeccion
  }  

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (e, indice) => {
      setSelectedIndex(indice);
  };

  return (
    /* Box principal de toda la aplicacion */
    // <Box display="flex">
    <Box 
      /* flex is life */
      display="flex" 
      /* fill remainder of screen */
      // position="absolute"  // messes with header
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
      <AppBar
        sx={{
          marginTop: "65px",
          bgcolor: "#fff",
          boxShadow: 1,
          transform: "translateZ(0)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        position="fixed"
      >
        <Toolbar>
          <Grid
            container
            ml={-1}
            mr={0}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item pr={2}>
              <IconButton onClick={handleDrawerOpen}>
                <DehazeIcon fontSize="medium" />
              </IconButton>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item pl={2}>
              <Avatar className={classes.pageIcon}>
                <img className="userImage" src={foto} alt=""></img>
              </Avatar>
            </Grid>
            <Grid item sm>
              <div className={classes.pageIcon}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ bgcolor: "primary" }}
                >
                  {nombre}
                </Typography>
                <Typography variant="body1" component="div">
                  {rol }
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Button variant="text" endIcon={<img src={logout} alt="" />}>
                <div className={classes.pageIcon}>
                  <Typography variant="body1" component="div">
                    Cerrar Sesión
                  </Typography>
                </div>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      {/*SideBar*/}
        <Drawer variant="permanent" elevation={1} open={open}>
          <DrawerHeader />
          <List >
            {listaMenu.map((item, index) => {
              return <Menu open={open} item={item} key={index} 
                  handleListItemClick={handleListItemClick}
                  isSelected={selectedIndex === index}
                />;
            })}
          </List>
        </Drawer>
      {/* Route de Paginas */}
      <UserPage/>
    </Box>
  );
};
export default HeaderUser;
