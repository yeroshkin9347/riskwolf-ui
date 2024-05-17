import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { ReactComponent as Logo } from '../../assets/images/logo-primary.svg';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";

const Header = props => {
  const { anchorEl, open, handleMenu, handleClose } = props;

  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      logo: {
        display: 'flex',
        alignItems: 'center',
      },
      logoImage: {
        maxWidth: theme.spacing(130/8),
        [theme.breakpoints.up('sm')]: {
          maxWidth: theme.spacing(172/8),
        }
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 100,
        boxShadow: 'none',
      },
      Toolbar: {
        justifyContent: 'space-between'
      },
    }));

  const classes = useStyles();

  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  }
  return (
    <header>
      <AppBar position="fixed" className={ classes.appBar }>
        <Toolbar className={ classes.Toolbar }>
          <Box className={ classes.logo }>
            {/* Show the burger only when user is logged in */}
            { isAuthenticated ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.drawerToggle}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                size="large">
                <MenuIcon />
              </IconButton>
              ) : null}
            <Logo className={classes.logoImage}/>
          </Box>

          {/* Show the icons only when user is logged in */}
          {
            isAuthenticated ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  size="large">
                    <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}>
                    <MenuItem onClick={handleClose}
                              target="_blank"
                              href="https://myaccount.microsoft.com/"
                              component="a">My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu>
              </div>
            ) : null
          }
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
