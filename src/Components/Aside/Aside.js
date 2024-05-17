import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import AsideListSecondary from './AsideListSecondary';

import createKey from '../../Util/createKey';
import hexToRgba from 'hex-to-rgba';

const Aside = props => {

  const theme = useTheme();

  const drawerWidth = theme.drawerWidth;

  const listItemStyles = makeStyles({
    // root: {
    //   marginTop: '10px',
    // },
    active: {
      boxShadow: `4px 0 0 0 ${hexToRgba(theme.palette.secondary.main)} inset`,
    },
    listItemText: {
      fontWeight: 700,
    },
    icon: {
      color: 'inherit',
    },
    listPrimary: {
      paddingBottom: theme.spacing(7),
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      border: 0,
      width: drawerWidth,
      boxShadow: '4px 0px 12px rgba(0, 0, 0, 0.25)',
    },
    drawerContainer: {
      overflow: 'auto',
    },
  });

  const classes = listItemStyles()

  const listItems = props.menu.map((item, index)=> {
    const key = createKey(index + item.title);

    const isActive = (index, activeIndex) => index === activeIndex;

    return (
      <ListItem
        key={key}
        button
        component={RouterLink}
        // Item is disabled: don't navigate anywhere.
        to={ item.disabled ? '' : item.url}
        onClick={()=> {
          item.disabled ? props.onModalOpen() : props.handleAsideClick(index)
        }}
        className={ isActive(index, props.activeIndex) ? classes.active : null }>
          <ListItemIcon className={classes.icon}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={ item.title } primaryTypographyProps={ isActive(index, props.activeIndex) ? { style: { fontWeight: 700} } : null} />
      </ListItem>
    );
  })

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.drawerIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List component="nav" aria-label="main navigation" className={classes.listPrimary}>
        { listItems }
      </List>
      <AsideListSecondary/>
    </Drawer>
  );
};

export default Aside;
