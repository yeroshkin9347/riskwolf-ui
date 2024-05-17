import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ButtonNav } from '../Buttons/Buttons';
import Led from '../Led/Led';
import formatMissingValue from '../../Util/formatMissingValue';
import String from '../../Util/string';
import Format from '../../Util/format';

const QuotesTable = props => {

  const { loaded, quotes, page, rowsPerPage, totalPages, totalElements, onChangePage: handleChangePage } = props;

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
    },
    disabled: {
      opacity: 0.5,
    }
  }));

  const classes = useStyles();

  const columns = [
    'Label',
    'Insured Name',
    'Address',
    'Period of Cover',
    'Total Sum Insured (TSI)',
    'Premium',
    'Status',
  ];

  const tableCells = quotes.map((quote) => {
      const statusLower = quote.uiState ? quote.uiState.toLowerCase() : '';
      let status = '';

      if (statusLower === 'completed') {
        status = 'green';
      } else if (statusLower === 'created') {
        status = 'yellow';
      } else if (statusLower === 'draft') {
        status = 'grey';
      } else if (statusLower === 'fail') {
        status = 'red';
      }

      const address = quote.customer?.address;

      const joinedAddress = address ? `${address.houseNumber ? address.houseNumber : ''} ${address.street ? address.street : ''}${address.city ? `${(!!address.houseNumber && !!address.street) ? ', ' : ''}${address.city}` : ''}${address.county ? `${address.city ? ', ' : ''}${address.county}` : ''}${address.state ? `${address.county ? ', ' : ''}${address.state}` : ''}` : '-';

      const currentYear = new Date().getFullYear();
      const startDate = new Date(quote.inceptionDate);
      const endDate = new Date(quote.expiryDate);
      const startDateString = quote.inceptionDate ? dayjs(startDate).format(currentYear === startDate?.getFullYear() ? 'MMM-DD' : 'MMM-DD, YY') : '---';
      const endDateString = quote.expiryDate ? dayjs(endDate).format('MMM-DD, YY') : '---';

      return (
        <TableRow onClick={()=>{}} key={quote.id}>
          <TableCell component="td" scope="row">{formatMissingValue(quote.name)}</TableCell>
          <TableCell component="td" scope="row">{formatMissingValue(quote.customer?.name)}</TableCell>
          <TableCell component="td" scope="row">{joinedAddress}</TableCell>
          <TableCell component="td" scope="row">{startDateString} to {endDateString}</TableCell>
          <TableCell component="td" scope="row">{quote.totalSumInsured ? `${quote.totalSumInsured.currency} ${parseFloat(quote.totalSumInsured.amount.toLocaleString()).toFixed(2)}` : formatMissingValue()}</TableCell>
          <TableCell component="td" scope="row">{quote.grossPremium ? `${quote.grossPremium.currency} ${parseFloat(quote.grossPremium.amount.toLocaleString()).toFixed(2)}` : formatMissingValue()} / {quote.grossPremiumRatePct ? Format.percentageWrapFormat(quote.grossPremiumRatePct) : formatMissingValue()}</TableCell>
          <TableCell component="td" className={classes.tableCellIndicator} scope="row">
            <Led status={status}/>
              {quote.uiState && String.capitalize(quote.uiState)}
            </TableCell>
          <TableCell component="td" scope="row">
            <ButtonNav
              className={clsx({
                [classes.disabled]: quote.uiState !== 'completed'.toUpperCase() && quote.uiState !== 'accepted'.toUpperCase()
              })}
              disabled={quote.uiState !== 'completed'.toUpperCase() && quote.uiState !== 'accepted'.toUpperCase()}
              to={`/quotations/quotation/${quote.id}`}
              component={RouterLink}>
              <ArrowForwardIcon className={classes.arrowIcon}/>
            </ButtonNav>
          </TableCell>
        </TableRow>
      )
    }
  );

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

export default QuotesTable;
