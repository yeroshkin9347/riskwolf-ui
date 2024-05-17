import React from 'react';

import { useWatch, useFormContext } from 'react-hook-form';
import Toolbar from '@mui/material/Toolbar';

import ToolboxQuotesNew from '../../Toolbox/ToolboxQuotesNew';
import Ajax, { GetToken } from '../../../Util/ajax';
import { STEPS } from './QuoteNew';

const QuoteNewHeader = (props) => {
  const {setValue, getValues}= useFormContext();

  const activeStep = useWatch({
    name: 'quoteNewActiveStep',
    exact: true,
  });
  const formHasChanged = useWatch({
    name: 'formHasChanged',
    exact: true,
  });

  const onQuoteSave = async ()=>{
    const newQuote = getValues('newQuote');
    const customerId= getValues('customerId');
    const coveragesSelected = getValues('coveragesSelected');

    const payload = {
      '@type': "NewQuote", // hard-coded
      name: newQuote.name,
      customerId: customerId,
      inceptionDate: newQuote.inceptionDate,
      expiryDate: newQuote.expiryDate,
      quoteItems: [...coveragesSelected.map(coverage => {
        return {
          '@type': "NewQuoteItem",
          coverageId: coverage.id,
          name: coverage.name,
          quantity: coverage.quantity,
          sumInsured: {
            amount: coverage.sumInsured,
            currency: coverage.limit.currency,
          }
        };
      })],
    };
    setValue('backdropOpen', true);
    setValue('snackbarOpen', false);
    setValue('formHasChanged', false);
    try {
      const token = await GetToken();
      let quoteId = newQuote.id;
      
      const API_URL = quoteId ? `${window.appConfig.apiUrl}/internal/quotes/${quoteId}` : `${window.appConfig.apiUrl}/internal/quotes`;
      
      const result = await Ajax.postData(API_URL, payload, token);
      result.commission = newQuote.commission ?? 0.125;
      result.name = newQuote.name;
      setValue('newQuote', result);
    } catch (_) {}
    setValue('backdropOpen', false);
    setValue('snackbarOpen', true);
    setValue('snackbarMessage', 'Quotation Saved');
  }

  return (
    <>
      <Toolbar />
      <ToolboxQuotesNew
        activeStep={activeStep}
        totalSteps={STEPS.length - 1}
        onQuoteSave={onQuoteSave}
        saveEnabled={formHasChanged}
        handleStartQuote={props.handleStartQuote}
      />
    </>
  );
};
export default QuoteNewHeader;
