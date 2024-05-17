import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ButtonNav } from '../Buttons/Buttons';
import String from '../../Util/string';
import Skeleton from '@mui/material/Skeleton';
import { Link as RouterLink } from 'react-router-dom';
import formatMissingValue from '../../Util/formatMissingValue';
import Time from '../../Util/time';
import Led from '../Led/Led';

import ContextTheme from '../../Contexts/Theme';

const PoliciesTable = props => {
  const { loaded, policies, page, rowsPerPage, totalPages, totalElements, onChangePage: handleChangePage } = props;

  const { locale } = useContext(ContextTheme);

  const useStyles = makeStyles(theme => ({
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
      }
    },
    tableHead: {
      backgroundColor: theme.palette.stripe,
      textTransform: 'uppercase',
    },
    tableCellIndicator: {
      position: 'relative',
      paddingLeft: 22
    },
    rowDisabled: {
      backgroundColor: '#FDFDFF',
      color: '#747475',

      '&> td': {
        color: 'inherit',
      }
    },
    indicatorIcon: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      width: 11,
      height: 11,
      color: theme.palette.simulated,
    },
    indicatorIconGreen: {
      color: theme.palette.indicatorGreen,
    },
    indicatorIconGrey: {
      color: theme.palette.indicatorGrey,
    },
    indicatorIconRed: {
      color: theme.palette.indicatorRed,
    },
    indicatorIconOrange: {
      color: theme.palette.indicatorOrange,
    },
    indicatorIconBlue: {
      color: theme.palette.indicatorBlue,
    },
    indicatorIconYellow: {
      color: theme.palette.indicatorYellow,
    },
    tableHeadCell: {
      color: theme.palette.primary.light,
      fontSize: 12,
    },
    cta: {
      padding: 0,
    },
    icon: {
      color: theme.palette.divider,
    }
  }));

  const classes = useStyles();

  const columns = [
    'Policy ID',
    'Policy Holder Name',
    'Effective Date',
    'Expiry Date',
    'Premium Amount',
    'Status',
  ];

  const isRowDisabled = (status='') => {
    const statusFormatted = status.toLowerCase();

    if (statusFormatted === 'expired' || statusFormatted === 'draft') {
      return true;
    }
    return false;
  };

  const tableCells = policies.map(policy => (
    <TableRow onClick={()=>{}} key={policy.id} {
      ...
      (isRowDisabled(policy.status) ? {className: classes.rowDisabled} : {})
      }>
      <TableCell key={1} component="td" scope="row">{policy.id ?? '---'}</TableCell>
      <TableCell key={2} component="td" scope="row">{formatMissingValue(policy.customerName)}</TableCell>
      <TableCell key={4} component="td" scope="row">{Time.getDate(policy.inceptionDate, locale)}</TableCell>
      <TableCell key={5} component="td" scope="row">{Time.getDate(policy.expiryDate, locale)}</TableCell>
      <TableCell key={6} component="td" scope="row">
        {typeof policy.grossPremium.amount === 'number' ? `${policy.grossPremium.currency} ${parseFloat(policy.grossPremium.amount.toLocaleString()).toFixed(2)}` : '---'}
      </TableCell>
      <TableCell key={8} component="td" className={classes.tableCellIndicator} scope="row">
        <Led status={policy.state}/>
        {policy.state && String.capitalize(policy.state)}
      </TableCell>

      <TableCell key={9} component="td" scope="row">
        <ButtonNav
          to={`/policies/policy/${policy.id}`}
          component={RouterLink}>
          <ArrowForwardIcon className={classes.arrowIcon}/>
        </ButtonNav>
      </TableCell>
    </TableRow>
  ));

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
    loaded ? table : skeleton
  );
};

export default PoliciesTable;
