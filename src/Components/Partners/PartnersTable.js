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
import { ButtonNav } from '../Buttons/Buttons';
import Skeleton from '@mui/material/Skeleton';

const PartnersTable = props => {

  const { loaded, partners, page, rowsPerPage, totalPages, totalElements, onChangePage: handleChangePage } = props;

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
    'Name',
    'E-Mail',
    'Address',
    'Country',
  ];
  
  const tableCells = partners.map((partner, index) => {
    const address = partner.address ? `${partner.address.houseNumber ? partner.address.houseNumber : ''} ${partner.address.street ? partner.address.street : ''}${partner.address.city ? `${(!!partner.address.houseNumber && !!partner.address.street) ? ', ' : ''}${partner.address.city}` : ''}${partner.address.county ? `${partner.address.city ? ', ' : ''}${partner.address.county}` : ''}${partner.address.state ? `${partner.address.county ? ', ' : ''}${partner.address.state}` : ''}` : '-';
    
    return (
      <TableRow onClick={()=>{}} key={index}>
        <TableCell key={1} component="td" scope="row">{partner.name}</TableCell>
        <TableCell key={2} component="td" scope="row">{partner.contactEmailAddress ?? '-'}</TableCell>
        <TableCell key={3} component="td" scope="row">{address}</TableCell>
        <TableCell key={4} component="td" scope="row">{partner?.address?.country ?? '-'}</TableCell>
        <TableCell key={6} component="td" scope="row">
          <ButtonNav
            // to={`clients/client/${partner.id}`}
            // component={RouterLink}
          >
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

export default PartnersTable;
