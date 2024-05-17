import React from 'react';
import ToolboxPolicyDraft from '../Toolbox/ToolboxPolicyDraft';
import PolicyBar from './PolicyBar';
import PolicyCompleteModal from './PolicyModals/PolicyCompleteModal';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import PolicyStack from './PolicyStack';


const Policy = props => {
  const {
    status,
    loaded,

    modalMonitorOpen,
    onModalMonitorOpen,
    onModalMonitorClose,

    statusTitle,
    statusPillTitle
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6),
    },
    main: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    cardContainer: {
      marginBottom: theme.spacing(3),
    },
    spaced: {
      marginBottom: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxPolicyDraft loaded={loaded}
        label="Policy details"
        variant={status}
        onModalMonitorOpen={onModalMonitorOpen}/>
      <PolicyBar
        loaded={loaded}
        title={statusTitle}
        pillTitle={statusPillTitle}
        variant={status}/>

      <PolicyStack/>

      <PolicyCompleteModal open={modalMonitorOpen} onModalMonitorClose={onModalMonitorClose}/>

      <Backdrop className={classes.backdrop} open={props.backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Policy;
