import React from 'react';

import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Section = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
      paddingBottom: theme.spacing(6),
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar />
      { props.children }
    </Box>
  );

};

export { Section };
