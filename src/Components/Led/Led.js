
import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import clsx from 'clsx';

const Led = props => {
  const { status } = props;
  const statusLower = status ? status.toLowerCase() : null;

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: 11,
      height: 11,
      color: 'transparent', // hide if there's no status provided
    },
    indicatorIconGreen: {
      color: theme.palette.indicatorGreen,
    },
    indicatorIconRed: {
      color: theme.palette.indicatorRed,
    },
    indicatorIconBlue: {
      color: theme.palette.indicatorBlue,
    },
    indicatorIconYellow: {
      color: theme.palette.indicatorYellow,
    },
    indicatorIconGrey: {
      color: theme.palette.indicatorGrey,
    },
  }));

  const classes = useStyles();

  return (
    <FiberManualRecordIcon className={clsx(
      classes.root, {
        [classes.indicatorIconGreen]: statusLower === 'green' || statusLower === 'active' || statusLower === 'completed',
        [classes.indicatorIconBlue]: statusLower === 'blue' || statusLower === 'running',
        [classes.indicatorIconRed]: statusLower === 'red' || statusLower === 'fail' || statusLower === 'initialization_error' || statusLower === 'error',
        [classes.indicatorIconYellow]: statusLower === 'yellow' || statusLower === 'simulated',
        [classes.indicatorIconGrey]: statusLower === 'grey' || statusLower === 'queued' || statusLower === 'created' || statusLower === 'draft',
      }
    )}/>
  );
};

Led.defaultProps = {
  status: "draft",
}

export default Led;
