import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ButtonSuccessSimple } from '../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';

const CoveragesActivate = props => {
  const { open, handleClose } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper': {
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
      <DialogTitle id="alert-dialog-title">Activate Coverage?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This coverage will be activated on the Riskwolf platform and will become available for quotation.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <ButtonSuccessSimple
          href="#!"
          onClick={() => {
          handleClose();
          props.handleActivate();
        }}>
          Activate
        </ButtonSuccessSimple>
      </DialogActions>
    </Dialog>
  );
};

export default CoveragesActivate;
