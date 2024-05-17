import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ButtonSuccessSimple } from '../../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';

const QuoteDialogAccept = props => {
  const { open } = props;

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
      <DialogTitle id="alert-dialog-title">Accept Quotation?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Mark this quotation as being accepted by the customer. This action will create a new <Box component="span" fontWeight="fontWeightBold">Draft Policy</Box>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { props.onDialogClose('dialogAcceptOpen')}}>
          Cancel Process
        </Button>
        <ButtonSuccessSimple onClick={props.onCreateNewPolicy}>
          Accept & Create New Policy
        </ButtonSuccessSimple>
      </DialogActions>
    </Dialog>
  );
};

export default QuoteDialogAccept;
