import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import clsx from 'clsx';

const CardSpan = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      border: '1px solid',
      borderColor: '#DFE0EB',
      borderradius: theme.shape.borderRadiusLg,
      padding: theme.spacing(10/8),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
    },
    content: {
      color: '#252733',
      fontSize: 16,
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
      <Typography variant="body1" className={classes.content}>{props.children}</Typography>
    </div>
  );
};

export default CardSpan;
