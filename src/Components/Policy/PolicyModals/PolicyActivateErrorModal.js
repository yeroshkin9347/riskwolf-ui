import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';


const PolicyActivateErrorModal = props => {
  const { open, onClose } = props;
  
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
      <DialogTitle id="alert-dialog-title">Activate policy error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography gutterBottom>
            Policy cannot be activate - start date has to be X days in the future, ...
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyActivateErrorModal;
