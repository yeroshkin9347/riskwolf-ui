import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useWatch } from 'react-hook-form';

const QuoteNewLoader = () => {
  const needShowLoading = useWatch({ name: 'backdropOpen', exact: true });

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
  }));

  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={needShowLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default QuoteNewLoader;
