import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ButtonSuccessSimple } from '../../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';


const PolicyConfirmSignedModal = props => {
  const { open, onClose, onConfirm } = props;
  
  const useStyles = makeStyles(theme => ({
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
      onClose={onClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Activate policy</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography gutterBottom>
            Confirm, that policy was signed and document uploaded.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Back
        </Button>
        <ButtonSuccessSimple onClick={onConfirm}>
          Confirm
        </ButtonSuccessSimple>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyConfirmSignedModal;
