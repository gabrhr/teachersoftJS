import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom' 
import {  List,ListItemIcon ,ListItemText, ListItemButton, Collapse } from '@mui/material'
import { makeStyles } from '@mui/styles' 
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(themex => ({
    active: {
        backgroundColor: '#000'
    }
}))

const SubMenu = ({ open,item}) => {
    const [subnav, setSubnav] = useState(false)
    const classes= useStyles()
    const showSubnav = () => {
      setSubnav(!subnav);
    }
    const history = useHistory()
    const location = useLocation()
    return (
      <>
        <ListItemButton 
            sx={{ pl: 3 }}
            key={item.text} 
            // onClick={() => history.push(item.path)}
            className={location.pathname === item.path ? classes.active: null}
            selected = {location.pathname === item.path ? console.log(" s true"): console.log(location.pathname)}
            onClick={item.subNav && showSubnav}
            >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {!item.subNav? null: subnav? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={subnav} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {open && subnav && item.subNav.map((item, index) => {
                    return (
                        <ListItemButton sx={{ pl: 6 }} 
                            key={item.text} 
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active: null}
                            >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Collapse>
                
      </>
    );
  };
  
  export default SubMenu;