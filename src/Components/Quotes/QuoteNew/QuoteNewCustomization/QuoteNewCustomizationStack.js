import React, { useContext, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import getSymbolFromCurrency from 'currency-symbol-map';
import Format from '../../../../Util/format';
import ContextTheme from '../../../../Contexts/Theme';

const QuoteNewCustomizationStack = (props) => {
  const {
    id,
    trigger,
    triggerUnit,
    payoutValue,
    indexDefinition,
    limitValue,
    cohortName,
    numberOfInsured,
    sumInsuredIndividual,
    sumInsured,
    onCohortNameChange,
    onSumInsuredIndividualChange,
    onPremiumInsuredNumberChange,
    start,
    end,
  } = props;

  const { getValues } = useFormContext();
  const [wasEditedName, setWasEditedName] = useState(false);
  const [wasEditedSumInsured, setWasEditedSumInsured] = useState(false);
  
  const currency = useWatch({
    name: 'currency',
    exact: true,
  });

  const insuredUnit = getValues('insuredUnit');
  
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
  
  const payoutPercentage = (value, limit) => `${(value / limit) * 100}%`;
  
  const { locale } = useContext(ContextTheme);

  const startDateFormatOptions = new Date(start).getFullYear() === new Date(end).getFullYear() ? { month: 'short', day: '2-digit'} : { month: 'short', day: '2-digit', year: 'numeric' };
  const endDateFormatOptions = { month: 'short', day: '2-digit' };
  
  return (
    <Box className={classes.stack}>
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          {cohortName} ({Format.date(start, locale, startDateFormatOptions).replace(/\s/g, '-')} to {Format.date(end, locale, endDateFormatOptions).replace(/\s/g, '-')} {new Date(end).getFullYear()})
        </Typography>
        <Typography>
          <Box component="span" fontStyle="italic">
            {indexDefinition.replace('Trigger', trigger)}{triggerUnit} / {payoutPercentage(payoutValue, limitValue)}
          </Box>
        </Typography>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Name</Typography>
        </Box>
        <Box className={classes.spreadAside}>
          <OutlinedInput
            onChange={(event) => {
              onCohortNameChange(event, { id: id });
              setWasEditedName(true);
            }}
            value={cohortName}
            placeholder="i.e. Landline Bangkok"
            id="cohort-name"
            name="cohortName"
            variant="outlined"
            autoFocus={true}
            error={cohortName?.length < 3 && wasEditedName}
          />
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Insured Extent</Typography>
        </Box>
        <Box className={classes.spreadAside}>
          <OutlinedInput
            onChange={(event) => {
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
            error={
              isNaN(numberOfInsured) && numberOfInsured <= 0 && wasEditedSumInsured ? true : false
            }
            value={numberOfInsured}
            endAdornment={
              <InputAdornment position="end">{insuredUnit}</InputAdornment>
            }
          />
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Sum Insured per {insuredUnit}</Typography>
        </Box>
        <Box className={classes.spreadAside}>
          <OutlinedInput
            onChange={(event) => {
              onSumInsuredIndividualChange(event, {
                id: id,
              });
            }}
            value={sumInsuredIndividual}
            placeholder="i.e. 200$"
            id="sum-insured-individual"
            name="sumInsuredIndividual"
            variant="outlined"
            autoFocus={true}
            endAdornment={
              <InputAdornment position="end">{getSymbolFromCurrency(currency)}</InputAdornment>
            }
            error={false}
          />
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Payout</Typography>
        </Box>
        <Box className={classes.spread}>
          <Typography>
            ({payoutValue}%){' '}
            {Format.currency(
              numberOfInsured * sumInsuredIndividual * (payoutValue * 0.01),
              currency,
            )}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.spread}>
          <Typography>Sum Insured per coverage</Typography>
        </Box>
        <Box className={classes.spread}>
          <Typography>{Format.currency(sumInsured, currency)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuoteNewCustomizationStack;
