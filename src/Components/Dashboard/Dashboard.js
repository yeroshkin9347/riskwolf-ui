import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DashboardOverviewCards from "./DashboardOverviewCards";
import DashboardDetailCards from "./DashboardDetailCards";
import DashboardEventCard from "./DashboardEventCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    backgroundColor: '#f7f8fc',
    flex: 1,
    padding: theme.spacing(2),
  },
  toolbox: {
    padding: `${theme.spacing(2.5)} ${theme.spacing(2)}`,
    border: '1px solid #EFEFEF',
    position: 'sticky',
    top: 56,
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.up('md')]: {
      top: 64,
    }
  },
  title: {
    marginRight: theme.spacing(2),
    fontSize: 18,
    fontWeight: 700,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <Box className={classes.toolbox}>
        <Typography className={classes.title} variant="h6">Performance Overview</Typography>
      </Box>
      <Box className={classes.main}>
        <DashboardOverviewCards />
        <DashboardDetailCards />
        <DashboardEventCard />
      </Box>
    </Box>
  );
}


export default Dashboard;
