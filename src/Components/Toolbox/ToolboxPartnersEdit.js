import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { ButtonNav } from '../Buttons/Buttons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';

// import QuotesNewCancelModal from '../Quotes/QuotesModals/QuotesNewCancelModal';
// import QuotesNewCompleteSimulationModal from '../Quotes/QuotesModals/QuotesNewCompleteSimulationModal';

const ToolboxPartnersEdit = props => {

  const { title, onEdit } = props;

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
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.typography.pxToRem(-12),
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
        <Box className={classes.nav}>
          <ButtonNav
            className={classes.nav}
            component={RouterLink}
            to="/clients"
          ><ArrowBackIcon /></ButtonNav>
          <Typography className={classes.title} variant="h6">{title}</Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={onEdit}>
            Edit
          </Button>
        </Box>
      </Toolbar>
      {/*
        <QuotesNewCancelModal
          open={open}
          handleClose={handleAlertClose}/>
        <QuotesNewCompleteSimulationModal
          open={openSimulation}
          start={props.start}
          handleClose={handleAlertClose}/>
      */}
    </Box>
  );
};

export default ToolboxPartnersEdit;
