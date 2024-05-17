import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { Box } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import ToolboxPartners from '../Toolbox/ToolboxPartners';
import PartnersSearch from './PartnersSearch';
import PartnersTable from './PartnersTable';
import TabsBar from '../TabsBar/TabsBar';

const Partners = props => {
  const {
    partners,
    loaded,
    tabs,
    tabIndex,
    onTabChange,
    onReload,
    refreshLoading,
    page,
    rowsPerPage,
    totalPages,
    totalElements,
    onChangePage,
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6)
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxPartners/>
      <TabsBar tabs={tabs} tabIndex={tabIndex} onTabChange={onTabChange}/>
      <PartnersSearch handleReload={onReload} refreshLoading={refreshLoading}/>
      <PartnersTable {...{partners, loaded, page, onChangePage, rowsPerPage, totalPages, totalElements}} />
    </Box>
  );
}

export default Partners;
