import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import clsx from 'clsx';
import Skeleton from '@mui/material/Skeleton';

const CardTitle = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      border: '1px solid',
      borderColor: '#DFE0EB',
      borderradius: theme.shape.borderRadiusLg,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 10,
    },
    content: {
      fontSize: 14,
    },
    spacedBottom: {
      marginBottom: theme.spacing(2),
    }
  }));

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, {
      [classes.spacedBottom]: { ...props.needsAir }
    })}>
      {
        props.loaded ? (
          <Typography variant="h6" className={classes.title}>{props.title}</Typography>
        ) : (<Skeleton/>)
      }
      {
        props.loaded ? (
          <Typography variant="body1" className={classes.content}>{props.children}</Typography>
        ) : (<Skeleton type="rec" height={160}/>)
      }
    </div>
  );
};

export default CardTitle;
