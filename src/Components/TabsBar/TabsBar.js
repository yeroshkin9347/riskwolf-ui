import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

import TabsPanel from './TabsPanel';

const TabsBar = props => {
  const { onTabChange, tabIndex, tabs } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: `0px 1px 2px rgba(0, 0, 0, 0.24)`,
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TabsPanel onTabChange={onTabChange} tabIndex={tabIndex} tabs={tabs}/>
    </Box>
  );
};

export default TabsBar;
