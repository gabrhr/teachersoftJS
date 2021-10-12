import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
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
  const { open, item, handleListItemClick, isSelected } = props
  const [subnav, setSubnav] = useState(false)
  const classes = useStyles()

  const handleClick = (e, indice) => {
    handleListItemClick(e, indice)
    if (item.subNav) {
      showSubnav();
    }
  }

  const showSubnav = () => {
    setSubnav(!subnav);
  }
  const history = useHistory()
  const location = useLocation()

  return (
    <>
      <Link to={`${item.path}`} style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            pl: 3,
            color: "primary.main",
            backgroundColor: "#fff",
            '&:hover': {
              backgroundColor: 'itemlist.main'
            },
          }}
          key={item.index}
          selected={isSelected}
          onClick={(event) => handleClick(event, item.indice)}
        >

          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {!item.subNav ? null : subnav ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Link>
      <Collapse in={subnav} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {open && subnav && item.subNav.map((item, index) => {
            return (

              <ListItemButton sx={{
                pl: 6,
                backgroundColor: "#fff",
                '&:hover': {
                  backgroundColor: 'itemlist.ligth'
                },

              }}
                key={item.index}
                onClick={() => history.push(item.path)}
                className={location.pathname === item.path ? classes.active : null}
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
