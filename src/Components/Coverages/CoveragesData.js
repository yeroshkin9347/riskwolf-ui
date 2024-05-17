import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ButtonNav } from '../Buttons/Buttons';
import Led from '../Led/Led';
import formatMissingValue from '../../Util/formatMissingValue';
import String from '../../Util/string';

const CoveragesData = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
      textAlign: 'right',
      '& .MuiFormControl-root': {
        margin: theme.spacing(1),
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(1),
      }
    },
    tableContainer: {
      maxWidth: '100vw',
      overflowX: 'auto',
      '& .MuiButtonBase-root': {
        padding: 0,
      },
    },
    tableHead: {
      backgroundColor: theme.palette.stripe,
      textTransform: 'uppercase',
    },
    tableCellIndicator: {
      position: 'relative',
      paddingLeft: 22
    },
    definitionCell: {
      width: 200,
      maxWidth: 200,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    icon: {
      color: theme.palette.divider,
    }
  }));

  const classes = useStyles();

  const { coverages: rows = [], page, rowsPerPage, totalPages, totalElements, onChangePage: handleChangePage, selected, onSelect: setSelected } = props;

  const columns = [
    'Label',
    'Monitoring Target',
    'Risk Period',
    'Definition',
    'Payout Structure',
    'Risk Premium',
    'Created By',
    'Status'
  ];
  
  const isSelected = (id) => selected.map(({id}) => id).indexOf(id) !== -1;
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => ({id: n.id, canActivate: n.uiState === 'simulated'}));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  
  const handleClick = (id, canActivate) => {
    const selectedIndex = selected.map(({id}) => id).indexOf(id);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, { id, canActivate });
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  
  const tableCells = rows.map((row, index) => {
    const isItemSelected = isSelected(row.id);
    const labelId = `coverage-table-checkbox-${index}`;
    const canActivate = row.uiState === 'simulated';
    const defaultLabel = row.dataSet + ' Coverage For ' + row.monitoringTarget;
    
    return (
      <TableRow
        onClick={() => handleClick(row.id, canActivate)}
        aria-checked={isItemSelected}
        role="checkbox"
        tabIndex={-1}
        selected={isItemSelected}
        sx={{ cursor: 'pointer' }}
        key={row.id}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell key={1} component="td" scope="row">{row.label ?? defaultLabel}</TableCell>
        <TableCell key={2} component="td" scope="row">{formatMissingValue(row.monitoringTarget)}</TableCell>
        <TableCell key={3} component="td"
                   scope="row">{formatMissingValue(dayjs(row.start).format(dayjs(row.start).isSame(dayjs(row.end), 'year') ? 'DD-MMM' : "DD-MMM'YY") + ' to ' + dayjs(row.end).format("DD-MMM'YY"))}</TableCell>
        <TableCell key={4} component="td" scope="row" className={classes.definitionCell}>
          <Tooltip title={formatMissingValue(row.indexDefinition)}>
            {formatMissingValue(row.indexDefinition)}
          </Tooltip>
        </TableCell>
        <TableCell key={5} component="td"
           scope="row">{formatMissingValue(parseInt(row.trigger * 100) / 100 + " " + row.triggerUnit + " pays " + parseInt(row.minPayout.amount * 100) / 100 + " %" + (row.payoutPerUnit?.amount ? (', then ' + parseInt(row.payoutPerUnit?.amount * 100) / 100 + '% per ' + row.triggerUnit) : ''))}</TableCell>
        <TableCell key={6} component="td"
                   scope="row">{formatMissingValue((row.riskPremium?.amount !== undefined ? parseInt(row.riskPremium?.amount * 100) / 100 : '') + (row.riskPremium?.amount !== undefined ? ' %' : ' - '))}</TableCell>
        <TableCell key={7} component="td" scope="row">{formatMissingValue(row.createdBy)}</TableCell>
        <TableCell key={8} component="td" className={classes.tableCellIndicator} scope="row">
          <Led status={row.uiState}/>
          {row.uiState ? String.capitalize(row.uiState) : null}
        </TableCell>
        <TableCell key={9} component="td" scope="row">
          <ButtonNav to={`/coverages/coverage/${row.id}`} component={RouterLink}>
            <ArrowForwardIcon className={classes.arrowIcon}/>
          </ButtonNav>
        </TableCell>
      </TableRow>
    )
  });

  const headerCells = columns.map((col, index) => {
    return (
      <TableCell className={classes.tableHeadCell} key={index} colSpan={index === columns.length - 1 ? 2 : 1}>
        { col }
      </TableCell>
    );
  });

  const skeleton = Array(14).fill().map((item, index) => {
    return <Skeleton key={index} height={81} />
  });

  const table = (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table aria-label="Coverages table" size="medium">
          <TableHead className={ classes.tableHead }>
            <TableRow>
              <TableCell key={1} component="td" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              { headerCells }
            </TableRow>
          </TableHead>
          <TableBody>
            { tableCells }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage={null}
        rowsPerPageOptions={[]}
        onPageChange={handleChangePage}
        labelDisplayedRows={() => `Page: ${page + 1} of ${totalPages}`}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );

  return (
    props.loaded ? table : skeleton
  );
};

export default CoveragesData;
