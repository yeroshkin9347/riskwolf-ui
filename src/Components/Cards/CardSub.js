import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import clsx from 'clsx';

const CardSub = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderRadius: 12,
      boxShadow: '0px 3px 12px 0px #0000001F',
      padding: theme.spacing(2),
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    title: {
      fontSize: 36,
      fontWeight: 700,
      marginBottom: theme.spacing(1.7),
      [theme.breakpoints.down('md')]: {
        fontSize: 32,
      }
    },
    sub: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: theme.spacing(1),
    },
    content: {
      fontSize: 20,
      fontWeight: 400,
    },
    spacedBottom: {
      marginBottom: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <Typography variant="h6" className={classes.title}>{props.title}</Typography>
      <Typography variant="h6" className={classes.sub}>{props.sub}</Typography>
      <Typography variant="body1" className={classes.content}>{props.children}</Typography>
    </div>
  );
};

export default CardSub;
