import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import getSymbolFromCurrency from 'currency-symbol-map';
import Format from '../../Util/format';

const QuotesNewStack = props => {
  const {
   title,
   id,
   trigger,
   payoutValue,
   payoutCurrency,
   limitValue,
   limitCurrency,
   cohortName,
   numberOfInsured,
   sumInsuredIndividual,
   sumInsured,
   onCohortNameChange,
   onSumInsuredIndividualChange,
   onPremiumInsuredNumberChange } = props;

  const [wasEditedName, setWasEditedName] = useState(false);
  const [wasEditedSumInsured, setWasEditedSumInsured] = useState(false);
  const [wasEditedSumInsuredIndividual, setWasEditedSumInsuredIndividual] = useState(false);

  const useStyles = makeStyles((theme) => ({
    stack: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
    },
    row: {
      margin: theme.spacing(-1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 60,
    },
    spread: {
      padding: theme.spacing(1),
    },
    spreadAside: {
      padding: theme.spacing(1),
      maxWidth: 206,
    },
  }));

  const classes = useStyles();

  const payoutPercentage = (value, limit) => `${value/limit*100}%`;

  return (
    <Box className={classes.stack}>
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>{ title }</Typography>
        <Typography><Box component="span" fontStyle="italic">{trigger} waiting time - {payoutValue}/{limitValue}{getSymbolFromCurrency(limitCurrency)} Payout ({payoutPercentage(payoutValue, limitValue)})</Box></Typography>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Cohort name</Typography>
        </Box>
        <Box className={classes.spreadAside}>
          <OutlinedInput
            onChange={event => {
              onCohortNameChange(event, {id: id});
              setWasEditedName(true);
            }}
            value={cohortName}
            placeholder="i.e. Landline Bangkok"
            id="cohort-name"
            name="cohortName"
            variant="outlined"
            autoFocus={true}
            error={
              cohortName.length < 3 &&
              wasEditedName ? true : false
            }
            // value={searchValue}
            // key={props.state.insuredAmount}
            // inputProps={{
            //   defaultValue: props.state.insuredAmount ? props.state.insuredAmount : null,
            //   placeholder: props.state.insuredAmount ? null : '---'
            // }}
            />
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Quantity (e.g. number of insured, acres etc.)</Typography>
        </Box>
        <Box className={classes.spreadAside}>
          <OutlinedInput
            onChange={event => {
              setWasEditedSumInsured(true);
              onPremiumInsuredNumberChange(event, {
                id: id,
              });
            }}
            placeholder="i.e. 10,000"
            id="number-of-insured"
            name="numberOfInsured"
            variant="outlined"
            autoFocus={true}
            // type="number"
            error={
              isNaN(numberOfInsured) &&
              numberOfInsured <= 0 &&
              wasEditedSumInsured ? true : false
            }

            value={numberOfInsured}
            // key={props.state.insuredAmount}
            // inputProps={{
            //   defaultValue: props.state.insuredAmount ? props.state.insuredAmount : null,
            //   placeholder: props.state.insuredAmount ? null : '---'
            // }}
            />

        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Sum Insured Individual</Typography>
        </Box>
        <Box className={classes.spreadAside}>
          <OutlinedInput
            onChange={event => {
              onSumInsuredIndividualChange(event, {
                id: id
              })
            }}
            value={sumInsuredIndividual}
            placeholder="i.e. 200$"
            id="sum-insured-individual"
            name="sumInsuredIndividual"
            variant="outlined"
            autoFocus={true}
            endAdornment={<InputAdornment position="end">{getSymbolFromCurrency(limitCurrency)}</InputAdornment>}
            error={
              isNaN(sumInsuredIndividual) &&
              sumInsuredIndividual <= 0 &&
              wasEditedSumInsuredIndividual ? true : false
            }
            />
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Sum Insured</Typography>
        </Box>
        <Box className={classes.spread}>
          <Typography>{Format.currency(sumInsured, limitCurrency)}</Typography>
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Payout</Typography>
        </Box>
        <Box className={classes.spread}>
          <Typography>({payoutValue}%)  {Format.currency(
            numberOfInsured * sumInsuredIndividual * (payoutValue * 0.01),
            payoutCurrency
          )}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuotesNewStack;
