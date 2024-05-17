import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';

const CoverageVersions = props => {
  const { open, handleClose } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper': {
        width: '100%',
        maxWidth: 1180,
      }
    },
    title: {
      fontSize: 18,
      fontWeight: 400,
    },
    tableHead: {
      backgroundColor: theme.palette.stripe,
      textTransform: 'uppercase',
    },
    tableHeadCell: {
      color: theme.palette.primary.light,
      fontSize: 12,
    },
    tableCell: {
      minWidth: '6ch',
    },
    running: {
      backgroundColor: theme.palette.runningLight,
    }
  }));
  
  const classes = useStyles();

  const rows = [
    {
      version: 1,
      template: 'Connectivity - Latency Excess',
      payout: 'Lump sum',
      currency: 'USD',
      rp: 1.6,
      elr: 60,
      by: 'A.Auliya Bidadari Nawalwhatever',
      at: '12/08/2021 - 15:02',
      status: 'Simulated'
    },
    {
      version: 2,
      template: 'Connectivity - Latency Excess',
      payout: 'Lump sum',
      currency: 'USD',
      rp: 1.6,
      elr: 60,
      by: 'A.Auliya Bidadari Nawalwhatever',
      at: '12/08/2021 - 15:02',
      status: 'Simulated'
    },
    {
      version: 3,
      template: 'Connectivity - Latency Excess',
      payout: 'Lump sum',
      currency: 'USD',
      rp: '-',
      elr: '-',
      by: 'A.Auliya Bidadari Nawalwhatever',
      at: '-',
      status: 'Running'
    },
  ]

  const columns = [
    'Version',
    'Template',
    'Payout',
    'Currency',
    'RP (%)',
    'ELR (%)',
    'Created by',
    'Simulated at',
    'Status',
  ];

  const tableCells = rows.map((row, index) => {
    return (
      <TableRow key={index} className={clsx({
        [classes.running]: row.status.toLowerCase() === 'running',
      })}>
        <TableCell className={classes.tableCell} component="td" scope="row">{index + 1}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.template}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.payout}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.currency}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.rp}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.elr}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.by}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.at}</TableCell>
        <TableCell className={classes.tableCell} component="td" scope="row">{row.status}</TableCell>
      </TableRow>
    );
  });

  const headerCells = columns.map((col, index) => {
    return (
      <TableCell className={classes.tableHeadCell} key={index}>
        {col}
      </TableCell>
    );
  });
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>Version List</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table aria-label="Coverages table">
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
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoverageVersions;
