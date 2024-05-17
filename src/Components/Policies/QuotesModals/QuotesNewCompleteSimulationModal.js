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


const QuotesNewCompleteSimulationModal = props => {
  const { open, handleClose } = props;

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
      onClose={handleClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Create quotation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography gutterBottom>
            You will not be able to edit this draft quotation once created.
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to continue?
          </Typography>

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
          Create quotation
        </ButtonSuccessSimple>
      </DialogActions>
    </Dialog>
  );
};

export default QuotesNewCompleteSimulationModal;
