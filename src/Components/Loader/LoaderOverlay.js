import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import makeStyles from '@mui/styles/makeStyles';

const LoaderOverlay = props => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
  }));

  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoaderOverlay;
