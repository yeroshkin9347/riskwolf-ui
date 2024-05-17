import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ToolboxCoverages from '../Toolbox/ToolboxCoverages';
import TabsBar from '../TabsBar/TabsBar';
import CoveragesSearch from './CoveragesSearch';
import CoveragesData from './CoveragesData';
import CoveragesActivate from './CoveragesActivate';

const Coverages = props => {
  const {
    onTabChange,
    tabIndex,
    tabs,
    coverages,
    loaded,
    page,
    rowsPerPage,
    totalPages,
    totalElements,
    onChangePage,
    onReload,
    refreshLoading,
    onSearchChange,
    selected,
    onSelect,
    handleActivate,
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6)
    },
  }));
  const [openActivate, setOpenActivate] = React.useState(false);

  const classes = useStyles();
  
  const handleActivateOpen = () => {
    setOpenActivate(true);
  };
  
  const handleActivateClose = (object, reason) => {
    if (reason !== 'backdropClick') {
      setOpenActivate(false);
    }
  };
  
  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxCoverages
        selected={selected}
        handleOpen={handleActivateOpen} />
      <TabsBar onTabChange={onTabChange} tabIndex={tabIndex} tabs={tabs}/>
      <CoveragesActivate open={openActivate} handleActivate={handleActivate} handleClose={handleActivateClose}/>
      <CoveragesSearch
        handleReload={onReload}
        {...{onSearchChange, refreshLoading}}
      />
      <CoveragesData {...{coverages, loaded, page, rowsPerPage, totalPages, totalElements, onChangePage, selected, onSelect}} />
    </Box>
  );
}

export default Coverages;
