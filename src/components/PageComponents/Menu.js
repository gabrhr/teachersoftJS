/* Author: Gabriela
 *
 * Menu Item del Drawer (aka. SideMenu, aka. NavBar)
 */
import React, { useState } from 'react';
import { Redirect,useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import { List, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(themex => ({
  active: {
    backgroundColor: '#000'
  }
}))


const SubMenu = (props) => {
    const { open, item, handleListItemClick, isSelected, ...other } = props
    const [subnav, setSubnav] = useState(false)
    const [selectedIndexI, setSelectedIndexI] = React.useState(0);
    const history = useHistory()
    const location = useLocation()
    let {pathNow} = useRouteMatch();
    
    /* "ESTE ES EL SUBNAV" */
    const showSubnav = () => {
      console.log("ANTES subnavvvvvvvv",subnav)
      setSubnav(!subnav);
      console.log("subnavvvvvvvv",subnav)
    }

    const handleClick = (e, indice, nav, path) => {
     
      if(nav) {
        showSubnav();
      }else{
          handleListItemClick(e, indice)
            history.push(path)
        }
    }
    const handleListSubItemClick = (e, indice, path) => {
      setSelectedIndexI(indice);
      history.push(path);
    };

    return (
      <>
        <ListItemButton 
            sx={{ 
                pl: 3, 
                color: "primary.main",
                backgroundColor: "#fff" ,
                '&:hover': {
                    backgroundColor: 'itemlist.main'
                }
            }}
            key={item.index} 
            selected={location.pathname === item.path ? isSelected : false}
            onClick={(event) => {handleClick(event, item.indice, item.subNav, item.path)}}
            >
            <ListItemIcon sx={{color: "primary.main"}}>{item.icon}</ListItemIcon>
            <ListItemText sx={{color: "primary.main"}} primary={item.text} />
            {!item.subNav? null: subnav? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={subnav} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {open && subnav && item.subNav.map((item, index) => {
                    return (
                        
                      <ListItemButton variant="submenu" sx={{ 
                          pl: 6,
                          mb:0.5,
                          backgroundColor: "#fff" ,
                          '&:hover': {
                              backgroundColor: 'itemlist.ligth'
                          },
                      }}
                          key={index} 
                          selected={location.pathname === item.path ? selectedIndexI === index : false}
                          onClick={(event) => {handleListSubItemClick(event, index, item.path)}}
                          >
                          <ListItemText primary={item.text} sx={{pl:4}}/>
                      </ListItemButton>
                    );
                })}
            </List>
        </Collapse>
                
      </>
    );
  };
  
  export default SubMenu;
