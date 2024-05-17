import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonCancel } from '../../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';

const QuotesNewCancelModal = props => {
  const { open, handleClose } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper' : {
        minWidth: 420
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
      <DialogTitle id="alert-dialog-title">Cancel Quotation?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variat="body1">All progress will be lost</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          No
        </Button>
        <ButtonCancel href="/coverages">
          Yes, Cancel
        </ButtonCancel>
      </DialogActions>
    </Dialog>
  );
};

export default QuotesNewCancelModal;
