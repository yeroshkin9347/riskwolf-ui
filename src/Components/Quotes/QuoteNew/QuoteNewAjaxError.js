import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import ModalAjaxError from '../../Modals/ModalAjaxError';

const QuoteNewAjaxError = () => {
  const { setValue } = useFormContext();
  const ajaxError = useWatch({ name: 'ajaxError', exact: true });

  const handleModalClose = () => {
    setValue('ajaxError', false);
  }
  if (!ajaxError) {
    return null;
  }
  return (
    <ModalAjaxError open={ajaxError} handleClose={handleModalClose} message={''}/>
  );
};

export default QuoteNewAjaxError;
