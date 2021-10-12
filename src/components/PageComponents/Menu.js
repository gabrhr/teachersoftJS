import React, { useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
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
    const [selectedIndexI, setSelectedIndexI] = React.useState(null);
    const history = useHistory()
    let {pathNow} = useRouteMatch();
    
    const showSubnav = () => {
      setSubnav(!subnav);
    }

    const handleClick = (e, indice, nav) => {
        handleListItemClick(e, indice)
        if(nav) {
            showSubnav();
        }
    }
    const handleListSubItemClick = (e, indice, path) => {
      setSelectedIndexI(indice);
      history.push(path);
    };

    return (
      <>
        <Link to={`${item.path}`} style={{ textDecoration: 'none' }}>
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
                selected={isSelected}
                onClick={(event) => handleClick(event, item.indice, item.subNav)}
                >
                  
                <ListItemIcon sx={{color: "primary.main"}}>{item.icon}</ListItemIcon>
                <ListItemText sx={{color: "primary.main"}} primary={item.text} />
                {!item.subNav? null: subnav? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
        </Link>
        <Collapse in={subnav} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {open && subnav && item.subNav.map((item, index) => {
                    return (
                        
                      <ListItemButton variant="submenu" sx={{ 
                          pl: 6,
                          backgroundColor: "#fff" ,
                          '&:hover': {
                              backgroundColor: 'itemlist.ligth'
                          },
                      }}
                          key={item.index} 
                          selected={selectedIndexI === index}
                          onClick={(event) => handleListSubItemClick(event, item.indice, item.path)}
                          >
                          <ListItemText  primary={item.text} sx={{pl:4 }}/>
                      </ListItemButton>
                    );
                })}
            </List>
        </Collapse>
                
      </>
    );
  };
  
  export default SubMenu;
