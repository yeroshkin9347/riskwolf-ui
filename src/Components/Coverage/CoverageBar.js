import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Pill from '../Pills/Pill';
import clsx from 'clsx';
import String from '../../Util/string';
import CoverageVersions from './CoverageVersions';

const CoverageBar = props => {
  const [open, setOpen] = React.useState(false);
  const status = props.variant ? props.variant.toLowerCase() : '';

  const handleClose = (object, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: theme.spacing(9.25),
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 157,
      zIndex: theme.zIndex.appBar,
      backgroundColor: theme.palette.common.white,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        top: theme.spacing(16 + 1/8),
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    container: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    status: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    row: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(-2),
      '& > *': {
        padding: theme.spacing(2),
      },
    },
    link: {
      textTransform: 'uppercase',
      fontWeight: 500,
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
    },
    title: {
      fontWeight: 400,
      fontSize: 18,
      marginRight: theme.spacing(2),
    },
    green: {
      backgroundColor: theme.palette.indicatorGreenLight,
    },
    simulated: {
      backgroundColor: theme.palette.runningLight,
    },
    running: {
      backgroundColor: theme.palette.simulatedLight,
    },
    fail: {
      backgroundColor: theme.palette.indicatorRedLight,
    }
  }));

  const classes = useStyles();

  const dateTime = dateTime => {
    const dateObj = new Date(dateTime);

    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  return (
    <div className={clsx(classes.root, {
      [classes.simulated]: status === 'simulated',
      [classes.green]: status === 'active',
      [classes.running]: status === 'created',
      [classes.fail]: status === 'fail' || status === 'error',
    })}>
      <CoverageVersions open={open} handleClose={handleClose}/>
      <Container className={classes.container} maxWidth={false}>
        <div className={classes.row}>
          <div className={classes.status}>
              {
                props.loaded ? (
                  <>
                    <Typography variant="h6" className={classes.title}>
                      Version {props.version} - {dateTime(props.createdAt)}
                    </Typography>
                  { status ? <Pill variant={status}>{String.capitalize(status)}</Pill> : null }

                  </>
                ) : (<Skeleton variant="rectangular" height={18} width={250}/>)
              }
          </div>
        </div>
      </Container>
    </div>
  );
};

CoverageBar.defaultProps = {
  variant: '',
};

export default CoverageBar;
