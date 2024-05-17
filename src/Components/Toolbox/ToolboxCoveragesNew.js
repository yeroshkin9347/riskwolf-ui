import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Unstable_Grid2';
import { ButtonCancel, ButtonSuccess } from '../Buttons/Buttons';
import CoveragesAlert from '../Coverages/CoveragesAlert';
import CoveragesAlertSimulation from '../Coverages/CoveragesAlertSimulation';

const ToolboxCoveragesNew = props => {

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'sticky',
      top: 56,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
      [theme.breakpoints.up('sm')]: {
        top: 64,
      },
    },
    Toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    cancel: {
      color: theme.palette.error.main
    },
    title: {
      marginBottom: '1em',
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
        marginBottom: 0,
      },
    }
  }));

  const classes = useStyles();

  // Dialog box state.
  const [open, setOpen] = React.useState(false);
  const [openSimulation, setOpenSimulation] = React.useState(false);

  const handleCancel = () => {
    setOpen(true);
  };

  const handleStartSimulation = () => {
    setOpenSimulation(true);
  };

  const handleAlertClose = (object, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      setOpenSimulation(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <Typography className={classes.title} variant="h6">New Coverage</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonCancel onClick={handleCancel}>Cancel</ButtonCancel>
            </Grid>
            <Grid item>
              <ButtonSuccess variant="contained"
                color="primary"
                disabled={props.activeStep < 3}
                disableElevation
                onClick={handleStartSimulation}
                >Simulate Coverage</ButtonSuccess>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
      <CoveragesAlert
        open={open}
        handleClose={handleAlertClose}/>
      <CoveragesAlertSimulation
        open={openSimulation}
        start={props.start}
        handleClose={handleAlertClose}/>
    </Box>
  );
};

export default ToolboxCoveragesNew;
