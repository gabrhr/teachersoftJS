import React from 'react'
import { makeStyles } from '@mui/styles';
import { AppBar, Grid, IconButton, Button, Toolbar, Divider,  Avatar} from '@mui/material';
import { Typography, List, ListItem,ListItemIcon ,Box,Drawer } from '@mui/material';
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
    }
}))
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

export default function HeaderUser(props) {
    const classes = useStyles();
    const {nombre, rol, foto} = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static" 
                sx={{
                    backgroundColor: '#fff',
                    boxShadow: 1,
                    transform: 'translateZ(0)'
                }}>
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
                        {/* <Divider orientation="vertical" flexItem component="line" /> */}
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
            <Drawer  open={open} > 
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
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
                <Divider />
            </Drawer>
        </Box>
    );
}
