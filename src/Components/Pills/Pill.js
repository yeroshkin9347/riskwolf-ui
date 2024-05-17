import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import clsx from 'clsx';

const Pill = props => {
  const { variant } = props;

  const status = variant ? variant.toLowerCase() : '';

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-block',
      padding: `${5/13}em ${13/13}em`,
      borderRadius: theme.spacing(8),
      backgroundColor: theme.palette.activated,
      color: theme.palette.primary.main,
    },
    title: {
      color: 'inherit',
      fontSize: 13,
    },
    simulated: {
      backgroundColor: theme.palette.indicatorYellow,
      color: theme.palette.common.white,
    },
    created: {
      backgroundColor: theme.palette.indicatorBlue,
    },
    green: {
      backgroundColor: theme.palette.indicatorGreen,
    },
    grey: {
      backgroundColor: theme.palette.indicatorGrey,
    },
    black: {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.primary.main,
    },
    // Red
    fail: {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.indicatorRed,
    },
  }));

  const classes = useStyles();

  return (
    <span className={clsx(classes.root, {
      [classes.simulated]: status === 'simulated',
      [classes.created]: status === 'created',
      [classes.green]: status === 'green' || status === 'active',
      [classes.grey]: status === 'grey',
      [classes.black]: status === 'black',
      [classes.fail]: status === 'fail' || status === 'error',
    })}>
      <Typography className={classes.title}>
        {props.children}
      </Typography>
    </span>
  );
};

export default Pill;
