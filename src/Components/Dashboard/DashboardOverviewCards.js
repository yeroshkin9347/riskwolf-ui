import React from 'react';
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { ReactComponent as CaretUpIcon } from '../../assets/images/caret-up.svg';
import { ReactComponent as CaretDownIcon } from '../../assets/images/caret-down.svg';
import DashboardCard from "./DashboardCard";

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'flex',
    lineHeight: 1.36,
  },
  cardValue: {
    fontWeight: 700,
    fontSize: 48,
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: 20,
  },
  amountContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  amount: {
    fontSize: 18,
    fontWeight: 700,
    color: 'inherit',
  },
  green: {
    color: '#31D158',
  },
  red: {
    color: '#F44336',
  }
}))

const DashboardOverviewCards = () => {
  const classes = useStyles();
  
  const overviewData = [
    {
      value: 1423,
      title: 'Quotes created',
      amount: 56,
    },
    {
      value: 92,
      title: 'Accepted by customer',
      unit: '%',
      amount: -6,
    },
    {
      value: 21,
      title: 'Converted to policies',
      unit: '%',
      amount: -8,
    },
    {
      value: 284,
      title: 'Active policies',
    },
  ]
  
  return (
    <Box className={classes.root}>
      {overviewData.map((item, index) => (
        <DashboardCard key={`dashboard-overview-card-${index}`}>
          <Typography className={classes.cardValue}>{item.value.toLocaleString('en-US')}<Typography component="span" className={classes.amount}>{item.unit}</Typography></Typography>
          <Typography className={classes.cardTitle}>{item.title}</Typography>
          {item.amount && (
            <Box className={clsx(classes.amountContainer, item.amount < 0 ? classes.red : classes.green)}>
              {item.amount < 0 ? <CaretDownIcon /> : <CaretUpIcon />}
              <Typography className={classes.amount}>{Math.abs(item.amount)}{item.unit}</Typography>
            </Box>
          )}
        </DashboardCard>
      ))}
    </Box>
  );
}

export default DashboardOverviewCards;
