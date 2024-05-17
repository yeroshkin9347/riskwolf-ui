import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Stack, Typography } from '@mui/material';

const CardStack = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      minHeight: 100,
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 12,
      boxShadow: '0px 3px 12px 0px #0000001F',
      flex: 1,
    },
    title: {
      fontWeight: 700,
      fontSize: 20,
      marginTop: 'auto',
    },
    content: {
      fontWeight: 700,
      fontSize: 48,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.content}>{props.content}</Typography>
      <Typography variant="h6" className={classes.title}>{props.title}</Typography>
      <Stack sx={{ mt: 1 }}>{props.description}</Stack>
    </div>
  );
};

export default CardStack;
