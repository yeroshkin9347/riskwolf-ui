import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ButtonSuccessSimple } from '../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';

const CoveragesAlert = props => {
  const { open, handleClose } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper' : {
        [theme.breakpoints.up('sm')]: {
          minWidth: 420
        }
      }
    },
  }));

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Simulate Coverage?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Simulations can take up to 10 minutes to complete.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <ButtonSuccessSimple onClick={() => {
          handleClose()
          props.start()
        }}>
          Simulate
        </ButtonSuccessSimple>
      </DialogActions>
    </Dialog>
  );
};

export default CoveragesAlert;
