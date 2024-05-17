import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ButtonCancel } from '../../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';

const QuoteDialogAccept = props => {
  const { open, onDialogClose, onRejectPolicy } = props;

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
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Reject Quotation?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Once rejected this quotation will be archived.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onDialogClose('dialogRejectOpen')}}>
          Cancel
        </Button>
        <ButtonCancel onClick={onRejectPolicy}>
          Reject Policy
        </ButtonCancel>
      </DialogActions>
    </Dialog>
  );
};

export default QuoteDialogAccept;
