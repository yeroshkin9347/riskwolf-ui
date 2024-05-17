import React from 'react';
import {  Snackbar,  } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import MuiAlert from '@mui/material/Alert';

const QuoteNewSnackbar = () => {
  const { setValue } = useFormContext();
  const snackbarOpen = useWatch({ name: 'snackbarOpen', exact: true });
  const snackbarMessage = useWatch({ name: 'snackbarMessage', exact: true });

  const onSnackbarClose = () => {
    setValue('snackbarOpen', false);
    setValue('snackbarMessage', '');
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={onSnackbarClose}>
      <MuiAlert onClose={onSnackbarClose} severity="success" elevation={6} variant="filled">
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default QuoteNewSnackbar;
