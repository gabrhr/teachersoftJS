import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useHistory, useLocation} from 'react-router';

export default function MenuPrueba() {
    const StyleList={
        pl: 3, 
        color: "primary.main",
        backgroundColor: "#fff" ,
        '&:hover': {
            backgroundColor: 'itemlist.main'
        }
    }
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedIndexI, setSelectedIndexI] = React.useState(0);
    const [subnavMP, setSubnavMP] = React.useState(0);
    const history = useHistory();
    const location = useLocation();
    const handleListItemClick = (e, indice) => {
        setSelectedIndex(indice);
    };

    const handleListSubItemClick = (e, indice) => {
        setSelectedIndexI(indice);
    };

    return (
        <List component="nav" aria-label="main mailbox folders">
            <ListItemButton 
                sx={StyleList}
                selected={selectedIndex === 0}
                onClick={(event) => {
                    handleListItemClick(event,0)
                    setSubnavMP(!subnavMP)
                }}
                >
                <ListItemIcon sx={{color: "primary.main"}}> <InboxOutlinedIcon /> </ListItemIcon>
                <ListItemText sx={{color: "primary.main"}} primary={"Mesa de Partes"} />
                {subnavMP? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={subnavMP} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton variant="submenu" sx={{ 
                            pl: 6,
                            mb:0.5,
                            backgroundColor: "#fff",
                            '&:hover': {
                                backgroundColor: 'itemlist.ligth'
                            },
                        }}
                            selected={selectedIndexI === 0}
                            onClick={(event) => {
                                handleListSubItemClick(event, 0);
                                history.push("/doc/misSolicitudes")
                            }}
                        >
                        <ListItemText primary={"Mis solicitudes"} sx={{pl:4}}/>
                    </ListItemButton>
                    <ListItemButton variant="submenu" sx={{ 
                            pl: 6,
                            mb:0.5,
                            backgroundColor: "#fff",
                            '&:hover': {
                                backgroundColor: 'itemlist.ligth'
                            },
                        }}
                            selected={selectedIndexI === 1}
                            onClick={(event) => {
                                handleListSubItemClick(event, 1);
                                history.push("/doc/misDelegados")
                            }}
                        >
                        <ListItemText primary={"Delegadas a mí"} sx={{pl:4}}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    )
}
