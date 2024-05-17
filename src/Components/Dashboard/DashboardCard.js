import React from 'react';
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    boxShadow: '0px 3px 12px 0px #0000001F',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }
}))

const DashboardCard = props => {
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      {props.children}
    </Box>
  );
};

export default DashboardCard;
