import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const QuotesNewAddCustomerModal = props => {
  const {
      open,
      onModalUserNewToggle,
      onInputBlur,
      onInputChange,
      onSubmit,
      inputFields,
      isLoading,
      onModalUserNewClose } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper' : {
        minWidth: 420
      }
    },
    header: {
      marginBottom: theme.spacing(6),
    },
    footer: {
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    textbox: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    spinner: {
      display: 'none',
      position: 'absolute',
    },
    spinnerLoading: {
      display: 'inline-block',
    },
    ctaLoading: {
      color: 'transparent !important',
    },
  }));

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onModalUserNewClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Add new customer</DialogTitle>
      <DialogContent>
        <Box color="text.secondary" className={classes.header}>
          <Typography variat="p" color="inherit">Your new customer will be addded to Riskwolf for future use.</Typography>
        </Box>

        {
          inputFields.map((inputField, index) => {
            const attributes = {
              ...(inputField.type && {type: inputField.type}),
              ...(inputField.error && {error: 'error'}),
              ...(inputField.helperText && {helperText: inputField.helperText})
            }
            return (
              <TextField
                {...attributes}
                className={classes.textbox}
                key={inputField.id}
                id={inputField.id}
                name={inputField.id}
                value={inputField.value}
                label={inputField.label}
                onBlur={event => onInputBlur(event, index)}
                onChange={event => onInputChange(event, index)}
                InputLabelProps={{
                  shrink: true,
                }}
                required/>
            );
          })
        }
      </DialogContent>
      <DialogActions className={classes.footer}>
        <Button onClick={onModalUserNewToggle}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disableElevation
          {...(isLoading) && {
              className: classes.ctaLoading,
              disabled: true,
          }}>
            <CircularProgress
              className={clsx(classes.spinner, {
                [classes.spinnerLoading]: isLoading
              })}
              size={16} />
            Add customer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuotesNewAddCustomerModal;
