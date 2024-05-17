import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useFormContext, useWatch } from 'react-hook-form';

import QuoteNewCustomizationStack from './QuoteNewCustomizationStack';
import Format from '../../../../Util/format';

const QuoteNewCustomization = () => {
  const { setValue } = useFormContext();
  const coveragesSelected = useWatch({
    name: 'coveragesSelected',
    exact: true,
  });
  const currency = useWatch({
    name: 'currency',
    exact: true,
  });
  const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: theme.spacing(3),
    },
    row: {
      margin: theme.spacing(-1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 60,
    },
  }));
  const classes = useStyles();

  const totalSumInsured = coveragesSelected.reduce(
    (previousValue, currentValue) => previousValue + currentValue.sumInsured,
    0,
  );

  const onCohortNameChange = (index) => (event) => {
    coveragesSelected[index].name = event.target.value;

    setValue('coveragesSelected', coveragesSelected);
    setValue('formHasChanged', true);
  };
  const onPremiumInsuredNumberChange = (index) => (event) => {
    const value = parseInt(event.target.value) || 0;
    coveragesSelected[index].quantity = value;
    const sumInsuredIndividual = coveragesSelected[index].sumInsuredIndividual || 0;
    const sumInsured = value * sumInsuredIndividual;
    coveragesSelected[index].sumInsured = sumInsured;

    setValue('coveragesSelected', coveragesSelected);
    setValue('formHasChanged', true);
  };

  const onSumInsuredIndividualChange = (index) => (event) => {
    const value = parseInt(event.target.value) || 0;
    coveragesSelected[index].sumInsuredIndividual = value;
    const sumInsured = value * coveragesSelected[index].quantity;
    coveragesSelected[index].sumInsured = sumInsured;

    setValue('coveragesSelected', coveragesSelected);
    setValue('formHasChanged', true);
  };
  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Customize coverages
      </Typography>
      <Box mb={2}>
        {/* Stack */}
        {coveragesSelected.map((coverage, index) => {
          const {
            id,
            trigger,
            triggerUnit,
            indexDefinition,
            minPayout,
            name,
            riskType,
            quantity,
            sumInsuredIndividual,
            sumInsured,
            limit,
            start,
            end,
          } = coverage;

          return (
            <QuoteNewCustomizationStack
              id={id}
              key={id}
              payoutValue={minPayout.value}
              payoutCurrency={minPayout.currency}
              limitValue={limit.value}
              limitCurrency={limit.currency}
              indexDefinition={indexDefinition}
              onPremiumInsuredNumberChange={onPremiumInsuredNumberChange(index)}
              onCohortNameChange={onCohortNameChange(index)}
              onSumInsuredIndividualChange={onSumInsuredIndividualChange(index)}
              cohortName={name}
              numberOfInsured={quantity}
              sumInsuredIndividual={sumInsuredIndividual}
              sumInsured={sumInsured}
              trigger={trigger}
              triggerUnit={triggerUnit}
              start={start}
              end={end}
              riskType={riskType}
            />
          );
        })}
        {/* Stack ./end */}
      </Box>

      <footer>
        <Box className={classes.row}>
          <Box className={classes.spread}>
            <Typography>Total Sum Insured (TSI)</Typography>
          </Box>
          <Box className={classes.spread}>
            <Typography>
              {Format.currency(
                totalSumInsured,
                currency,
              )}
            </Typography>
          </Box>
        </Box>
      </footer>
    </div>
  );
};

export default QuoteNewCustomization;
