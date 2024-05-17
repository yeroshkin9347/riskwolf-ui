import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

const CoverageEdit = props => {
  const { open, handleClose } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper': {
        [theme.breakpoints.up('md')]: {
          minWidth: 420,
        }
      }
    },
    cta: {
      '& .MuiButton-label': {
        fontWeight: 700,
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
      <DialogTitle id="alert-dialog-title">Edit Coverage?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variat="body1">A new version will be created. You will not lose the current simulation.</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        {/* Edits the coverage */}
        <Button className={classes.cta} href={`/coverages/new?id=${window.location.pathname.split("/").pop()}&mode=edit`} onClick={handleClose}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoverageEdit;
