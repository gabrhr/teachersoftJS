import React from 'react'
import { makeStyles } from '@mui/styles';
import { AppBar, Grid, IconButton, Button, Toolbar, Divider,  Avatar} from '@mui/material';
import { Typography, List, ListItem,ListItemIcon ,Box } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer'
import DehazeIcon from '@mui/icons-material/Dehaze';
import SearchIcon from '@mui/icons-material/Search';
import logout from '../../assets/images/log-out.png'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled, useTheme } from '@mui/material/styles';
import LogoPucp from '../../assets/images/LogoPUCP.png'

import Header from './Header';

const useStyles = makeStyles(themex => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader: {
        padding: themex.spacing(4),
        display: 'flex',
        marginBottom: themex.spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: themex.spacing(1),
        color: '#00002b'
    },
    pageTitle: {
        paddingLeft: themex.spacing(4),
        '& .MuiTypography-body1': {
            opacity: '0.6'
        }
    },
    userImage: {
        position: 'relative',
        bottom: '1px'
    },
    gridSpace:{
        marginTop:themex.spacing(0)
    },
    menuImagen: {
        position: 'relative',
        height: '45px'
    }
}))

const pagina = makeStyles({
    appMain: {
      paddingLeft: '320px',
      width: '100%'
    }
  })

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 5px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 9px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(8.2, 8),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
 );
  

export default function HeaderUser(props) {
    const classes = useStyles();
    const cls= pagina();
    const {nombre, rol, foto} = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
    console.log(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" 
                sx={{
                    bgcolor: 'primary',
                    boxShadow: 1,
                    transform: 'translateZ(0)',
                    zIndex:  (theme) => theme.zIndex.drawer + 1
                }}>
                <Toolbar>
                    <Grid container
                        alignItems="center">
                        <Grid item sm>
                        </Grid>
                        <Grid item>
                        <img className={classes.menuImagen} src= {LogoPucp} alt=""></img>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar 
                sx={{
                    marginTop:"65px",
                    bgcolor: '#fff',
                    boxShadow: 1,
                    transform: 'translateZ(0)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }} position="absolute">
                <Toolbar>
                    <Grid container
                        direction="row"
                        justifyContent="flex-start" 
                        alignItems="center"  
                    >
                        <Grid item pr={2}>
                            <IconButton onClick={handleDrawerOpen}>
                                <DehazeIcon fontSize="medium" />
                            </IconButton>
                        </Grid>
                        <Divider orientation="vertical" flexItem component="line" />
                        <Grid item pl={2} >
                            <Avatar className={classes.pageIcon}>
                            <img className="userImage" src= {foto} alt=""></img>
                            </Avatar>
                        </Grid>
                        <Grid item sm>
                            <div className={classes.pageIcon}>
                                <Typography variant="h6" component="div" sx={{bgcolor: 'primary'}}>
                                    {nombre}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    {rol}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item>
                            <Button variant="text" endIcon={<img src={logout} alt=""/>}>
                                <div className={classes.pageIcon}>
                                    <Typography variant="body1" component="div">Cerrar Sesión</Typography>
                                </div>
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={cls.appMain}> 
                <Drawer
                    variant="permanent"
                    elevation = {1}
                    open = {open}
                    >
                    <DrawerHeader/>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
       </Box>
    );
}
