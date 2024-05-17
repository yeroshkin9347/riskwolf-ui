import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import makeStyles from '@mui/styles/makeStyles';


const TabsPanel = props => {
  const { onTabChange, tabIndex, tabs } = props;

  const useStyles = makeStyles((theme) => ({
    label: {
      textTransform: 'none',
      minWidth: theme.spacing(9),
      maxWidth: theme.spacing(33),
    }
  }));

  const classes = useStyles();

  const renderTabs = tabs.map((tab, index) => {
    return <Tab key={index} label={tab} className={classes.label}/>;
  });

  return (
    <Tabs value={tabIndex} tabs={tabs} onChange={onTabChange} aria-label="Filter tabs">
      {renderTabs}
    </Tabs>
  );
}

export default TabsPanel;
