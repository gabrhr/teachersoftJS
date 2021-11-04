/* Author: Mitsuo, Gabriela
 * 
 * Wrapper for Header1, Header2, Drawer (aka. Navbar, aka. SideBar)
 */
import React from "react";
import { Box } from "@mui/material";

import { MenuAdministrador } from "./MenuAdministrador";
import UserPage from "../../pages/General/UserPage";
import { MenuAsistenteSeccion } from "./MenuAsistenteSeccion";
import { styled } from "@mui/material/styles";

import Header1 from '../../constants/Header1'
import Header2 from '../../constants/Header2'
import DrawerAdmin from '../../constants/DrawerAdmin'
import { UserContext } from "../../constants/UserContext";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(8.2, 8),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

/* esto antes estaba en el UserPage */
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
      <DrawerHeader />  {/* SOLAMENTE UN DIV PARA HACER MARGIN TOP, 
                            codigo repetido en HeaderUser */}
      {props.children}
    </Box>
  )
}

export default function HeaderUser(props) {
  const { user, rol } = React.useContext(UserContext);

  /* estado del Drawer */
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  let rolName     // rolname
  let listaMenu = [];
  if (rol == 0) {
    rolName = "Administrador"
    listaMenu = MenuAdministrador
  } else if (rol == 1) {
    rolName = "Docente"
    listaMenu = MenuAsistenteSeccion // arreglar
  } else if (rol == 2) {
    rolName = "Asistente de Sección"
    listaMenu = MenuAsistenteSeccion
  } else if (rol == 8) {
    rolName = "Asistente de Sección"  // arreglar
    listaMenu = MenuAsistenteSeccion
  }

  return (
    /* Box principal de toda la aplicacion */
    <Box
      display="flex"
      top="0px"
      bottom="0px"
      width="100%"
    >
      {/*Header Azul*/}
      <Header1 />
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
};
