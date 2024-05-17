import React from 'react';
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';

const Title = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      fontWeight: 700,
      fontSize: 24,
      marginBottom: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <Typography variant="h6" className={classes.root}>{props.children}</Typography>
  );
};

export default Title;
