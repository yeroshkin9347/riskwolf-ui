import React from 'react';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import makeStyles from '@mui/styles/makeStyles';
import { useFormContext, useWatch } from 'react-hook-form';

import Ajax, { GetToken } from '../../../../Util/ajax';
import CardSelectList from '../../../Form/Checkboxes/CardSelect/CardSelectList';
import programData from './rw-programs-demo.json';

const QuoteNewProgramQuery = ['QuoteNewProgram-All'];

const QuoteNewProgram = () => {
  const { setValue } = useFormContext();
  const {
    // data,
    isLoading
  } = useQuery({
    queryKey: QuoteNewProgramQuery,
    queryFn: async () => {
      const token = await GetToken();
      const result = await Ajax.getData(
        `${window.appConfig.apiUrl}/internal/sum-insured-basis`,
        token,
      );
      setValue('backdropOpen', false);
      return result;
    },
    initialData: [],
  });

  const program = useWatch({ name: 'program', exact: true });
  const country = useWatch({ name: 'country', exact: true });

  const useStyles = makeStyles((theme) => ({
    title: {
      fontWeight: 700,
      marginBottom: theme.spacing(4),
    },
    description: {
      paddingBottom: theme.spacing(27 / 8),
    },
  }));
  const classes = useStyles();

  const onInsuranceCheckboxChange = ({ insuredValue, selectionType, insuredUnit, sumInsuredBasis, defaultSIperUnit, name, country, currency }) => {
    setValue('program', insuredValue);
    setValue('selectionType', selectionType);
    setValue('insuredUnit', insuredUnit);
    setValue('sumInsuredBasis', sumInsuredBasis);
    setValue('defaultSIperUnit', defaultSIperUnit);
    setValue('insuranceProgram', name);
    setValue('country', country);
    setValue('currency', currency);
    setValue('targetId', undefined);
  };
  const cards = programData.map((item) => ({
    ...item,
    selected: program === item.InsuredValue && country === item.Country,
  }));
  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Choose an Insurance Program
      </Typography>
      <Typography className={classes.description}>
        Select the parametric insurance program that suits your nedds. Tailor your coverage by
        setting the parameters that matter to you. Adjust coverage limits, trigger conditions, and
        more to create a policy that's uniquely yours.
      </Typography>
      <CardSelectList
        cards={cards.map(card => ({
          ...card,
          name: `${card.Name} (${card.Country})`,
          description: card.Description,
          icon: card.Icon,
          id: {
            insuredValue: card.InsuredValue,
            selectionType: card.SelectionType,
            insuredUnit: card.InsuredUnit,
            sumInsuredBasis: card.SumInsuredBasis,
            defaultSIperUnit: card.DefaultSIperUnit,
            name: card.Name,
            country: card.Country,
            currency: card.Currency,
          },
        }))}
        loaded={!isLoading}
        onCheckboxChange={onInsuranceCheckboxChange}
      />
    </div>
  );
};

export default QuoteNewProgram;
