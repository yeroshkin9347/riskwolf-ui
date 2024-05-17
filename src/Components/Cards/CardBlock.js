import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const CardBlock = props => {
  const { title, content, loaded } = props;
  const useStyles = makeStyles(theme=> ({
    root: {
      border: '1px solid',
      borderColor: theme.palette.border,
      borderradius: theme.shape.borderRadiusLg,
      padding: theme.spacing(4),
      textAlign: 'center',
      backgroundColor: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'auto',
      flexGrow: 1,
    },
    title: {
      color: '#9FA2B4',
      fontWeight: 'bold',
    },
    content: {
      fontSize: theme.typography.pxToRem(28),
      fontWeight: '600',
      wordBreak: 'break-word',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.content}>{
        loaded ? content || '---' : <Skeleton/>
      }</Typography>
    </div>
  );
};

export default CardBlock;
