import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

const ToolboxPolicies = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'sticky',
      top: 56,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
      [theme.breakpoints.up('sm')]: {
        top: 64,
      }
    },
    Toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
    title: {
      marginRight: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <Typography className={classes.title} variant="h6">Policies</Typography>
        </Toolbar>
    </Box>
  );
};

export default ToolboxPolicies;
