import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { ButtonError } from '../../../Buttons/Buttons';

const QuotesLocationNoFeaturesModal = props => {
  const { open, handleClose, address } = props;
  
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
      <DialogTitle id="alert-dialog-title">Area not available</DialogTitle>
      <DialogContent>
        <Typography variat="body1">The selected location "{address}" is not available for insurance coverage.</Typography>
      </DialogContent>
      <DialogActions>
        <ButtonError onClick={handleClose}>
          Close
        </ButtonError>
      </DialogActions>
    </Dialog>
  );
};

export default QuotesLocationNoFeaturesModal;
