import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { Box } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import ToolboxQuotes from '../Toolbox/ToolboxQuotes';
import TabsBar from '../TabsBar/TabsBar';
import QuotesSearch from './QuotesSearch';
import QuotesTable from './QuotesTable';

const Quotes = props => {
  const {
    quotes,
    loaded,
    onReload,
    onTabChange,
    refreshLoading,
    tabIndex,
    tabs,
    page,
    rowsPerPage,
    totalPages,
    totalElements,
    onChangePage,
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6)
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxQuotes/>
      <TabsBar tabs={tabs} tabIndex={tabIndex} onTabChange={onTabChange}/>
      <QuotesSearch onReload={onReload} refreshLoading={refreshLoading}/>
      <QuotesTable {...{quotes, loaded, page, rowsPerPage, totalPages, totalElements, onChangePage}} />
    </Box>
  );
}

export default Quotes;
