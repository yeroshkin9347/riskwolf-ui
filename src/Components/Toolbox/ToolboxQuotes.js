import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import { Link as RouterLink } from 'react-router-dom';

const ToolboxQuotes = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'sticky',
      top: 64,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
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
        <Typography className={classes.title} variant="h6">Quotes</Typography>
        <Button color="primary" variant="contained" component={RouterLink} to="/quotations/new" disableElevation>New Quote</Button>
        </Toolbar>
    </Box>
  );
};

export default ToolboxQuotes;
