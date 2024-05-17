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


const PolicyMonitorModal = props => {
  const { open, onModalMonitorClose } = props;

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
      onClose={onModalMonitorClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Monitor Policy</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography gutterBottom>
            After submitting the policy, Riskwolf will monitor ongoing activity and generate claim notices when required.
          </Typography>
          <Typography gutterBottom>
            Do you want to continue?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalMonitorClose}>
          Cancel
        </Button>
        <ButtonSuccessSimple onClick={() => {
          onModalMonitorClose()
        }}>
          Submit
        </ButtonSuccessSimple>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyMonitorModal;
