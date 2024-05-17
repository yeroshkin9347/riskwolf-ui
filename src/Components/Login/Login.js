import React from 'react';

import makeStyles from '@mui/styles/makeStyles';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import logo from '../../assets/images/logo-lg.svg';

import { useMsal } from "@azure/msal-react";
import { requiredScopes } from "../../Vendor/Azure/authConfig";

const Login = () => {
  const { instance } = useMsal();

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%',
      textAlign: 'center',
      backgroundColor: theme.palette.secondary.main,
      paddingTop: theme.spacing(26),
      boxSizing: 'border-box',
    },
    logo: {
      maxWidth: theme.spacing(70),
      marginBottom: theme.spacing(0.8),
    },
    title: {
      marginBottom: '0.8em',
      fontWeight: '700',
    },
    section: {
      padding: theme.spacing(3),
    },
    cta: {
      minWidth: theme.spacing(24),
    }
  }));

  const classes = useStyles();

  const handleLogin = () => {
    instance.loginRedirect(requiredScopes).catch(e => {
        console.log(e);
    });
  };

  return (
    <main className={classes.root}>
      <section className={classes.section}>
        <img className={classes.logo} src={logo} alt="Plaform logo"/>
        <Typography variant="h5" className={classes.title}>Platform Access</Typography>
        <Button className={classes.cta} variant="contained" onClick={handleLogin} size="large" color="primary">Login
        </Button>
      </section>
    </main>
  );

};

export default Login;
