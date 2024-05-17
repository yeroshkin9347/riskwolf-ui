import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { FormControl, FormLabel, InputAdornment } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import validator from 'validator';

import { FormControl as formControl } from '../../../../Styles/Components/Forms';
import TextboxPopup from '../../../Form/Inputs/TexboxPopup/TextboxPopup';
import Ajax, { GetToken } from '../../../../Util/ajax';
import QuotesNewAddBusinessPartnerModal from '../../../Policies/QuotesModals/QuotesNewAddBusinessPartnerModal';
import { Slider as slider } from '../../../../Styles/Components/Sliders';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 0.15,
    label: '15%',
  },
];

export const QuoteNewTermsInsuredQuery = ['QuoteNewTermsInsuredQuery-Search'];
export const QuoteNewTermsTaxStatusQuery = ['QuoteNewTermsTaxStatusQuery'];
export const QuoteNewTermsIntermediaryQuery = ['QuoteNewTermsIntermediaryQuery-Search'];
const QuoteNewTerms = () => {
  const { setValue, getValues } = useFormContext();
  //used key to handle refetch search
  const [insuredSearch, setInsuredSearch] = useState('');
  const [modalCustomerCreateOpen, setModalCustomerCreateOpen] = useState(false);
  const [modalIntermediaryCreateOpen, setModalIntermediaryCreateOpen] = useState(false);
  const [intermediarySearch, setIntermediarySearch] = useState('');
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [intermediaryDropdownOpen, setIntermediaryDropdownOpen] = useState(false);
  const [customerSearchTermSelected, setCustomerSearchTermSelected] = useState('');
  const [intermediarySearchTermSelected, setIntermediarySearchTermSelected] = useState('');
  const { isLoading: isCustomerSearchLoading, data: customers = [] } = useQuery({
    queryKey: [QuoteNewTermsInsuredQuery, insuredSearch],
    queryFn: async () => {
      const token = await GetToken();
      const { content: data } = await Ajax.getData(
        `${window.appConfig.apiUrl}/internal/business-partners?role=POLICY_HOLDER&name=${insuredSearch}&page=0&size=10000`,
        token,
      );
      const customerId = getValues('customerId');
      if (data && data[0]?.id !== customerId) {
        setCustomerDropdownOpen(true);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!insuredSearch,
  });
  
  const { isLoading: isTaxStatusLoading, data: taxStatuses = [] } = useQuery({
    queryKey: [QuoteNewTermsTaxStatusQuery],
    queryFn: async () => {
      const token = await GetToken();
      return await Ajax.getData(
        `${window.appConfig.apiUrl}/internal/tax-statuses`,
        token,
      );
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });
  
  const { isLoading: isIntermediarySearchLoading, data: intermediaries = [] } = useQuery({
    queryKey: [QuoteNewTermsIntermediaryQuery, intermediarySearch],
    queryFn: async () => {
      const token = await GetToken();
      const { content: data } = await Ajax.getData(
        `${window.appConfig.apiUrl}/internal/business-partners?role=INTERMEDIARY&name=${intermediarySearch}&page=0&size=10000`,
        token,
      );
      const customerId = getValues('intermediaryId');
      if (data && data[0]?.id !== customerId) {
        setIntermediaryDropdownOpen(true);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: !!intermediarySearch,
  });
  
  const newQuote = useWatch({
    name: 'newQuote',
    exact: true,
  });
  const termsInsuredSearch = useWatch({
    name: 'termsInsuredSearch',
    exact: true,
  });
  const termsIntermediarySearch = useWatch({
    name: 'termsIntermediarySearch',
    exact: true,
  });
  const program = useWatch({
    name: 'program',
    exact: true,
  });
  const insuranceProgram = useWatch({
    name: 'insuranceProgram',
    exact: true,
  });
  const postcode = useWatch({
    name: 'postcode',
    exact: true,
  });
  const city = useWatch({
    name: 'city',
    exact: true,
  });
  const newCustomer = useWatch({
    name: 'newCustomer',
    exact: true,
  });
  const newIntermediary = useWatch({
    name: 'newIntermediary',
    exact: true,
  });
  const commission = useWatch({
    name: 'commission',
    exact: true,
  });
  const country = useWatch({
    name: 'country',
    exact: true,
  });

  useEffect(() => {
    if (!termsInsuredSearch) {
      setCustomerDropdownOpen(false);
      setCustomerSearchTermSelected('');
    }
    const timeout = setTimeout(() => {
      setInsuredSearch(termsInsuredSearch);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [termsInsuredSearch]);

  useEffect(() => {
    if (!termsIntermediarySearch) {
      setIntermediaryDropdownOpen(false);
      setIntermediarySearchTermSelected('');
    }
    const timeout = setTimeout(() => {
      setIntermediarySearch(termsIntermediarySearch);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [termsIntermediarySearch]);

  useEffect(() => {
    if (!!program || !!insuranceProgram || !!postcode || !!city) {
      setValue(
        'newQuote',
        {
          ...newQuote,
          name: `${program} ${insuranceProgram} ${postcode} ${city}`
        });
    }
  }, [program, insuranceProgram, postcode, city]);

  const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: theme.spacing(2),
    },
    formControl: formControl(),
    slider: slider(),
  }));
  const classes = useStyles();
  const onQuoteNameChange = (event) => {
    setValue('newQuote', { ...newQuote, name: event.target.value });
    setValue('formHasChanged', true);
  };
  
  const onCustomerSearchChange = (event) => {
    const value = event.target.value;
    setValue('termsInsuredSearch', value);
    setCustomerSearchTermSelected('');

    if (value) {
      newCustomer.inputFields[0].value = value;
      setValue('newCustomer', { ...newCustomer });
    }
  };
  const onIntermediarySearchChange = (event) => {
    const value = event.target.value;
    setValue('termsIntermediarySearch', value);
    setIntermediarySearchTermSelected('');
    
    if (value) {
      newIntermediary.inputFields[0].value = value;
      setValue('newIntermediary', { ...newIntermediary });
    }
  };

  // Select customer from the dropdown.
  const onCustomerSelect = (customerData = []) => {
    const [name, id] = customerData;
    setValue('customerName', name);
    setValue('termsInsuredSearch', name);
    setValue('customerId', id);
    setCustomerSearchTermSelected(name);
    setCustomerDropdownOpen(false);
    setValue('formHasChanged', true);
  };
  const onCustomerSearchClear = () => {
    setValue('termsInsuredSearch', '');
    setValue('customerName', '');
    setValue('customerId', '');
    setValue('formHasChanged', true);
  };
  const onCustomerSearchDropdownClose = () => {
    setCustomerDropdownOpen(false);
  };
  // Select intermediary from the dropdown.
  const onIntermediarySelect = (intermediaryData = []) => {
    const [name, id] = intermediaryData;
    setValue('intermediaryName', name);
    setValue('termsIntermediarySearch', name);
    setValue('intermediaryId', id);
    setIntermediarySearchTermSelected(name);
    setIntermediaryDropdownOpen(false);
    setValue('formHasChanged', true);
  };
  const onIntermediarySearchClear = () => {
    setValue('termsIntermediarySearch', '');
    setValue('intermediaryName', '');
    setValue('intermediaryId', '');
  };
  const onIntermediarySearchDropdownClose = () => {
    setIntermediaryDropdownOpen(false);
  };

  const onModalCustomerNewToggle = (flag) => {
    setModalCustomerCreateOpen(flag === 'open');
  };
  
  const onModalIntermediaryNewToggle = (flag) => {
    setModalIntermediaryCreateOpen(flag === 'open');
  };
  
  const inputIsInvalid = (value, id, fieldIndex, type = 'text') => {
    const validateField = (type, value) => {
      if (value) {
        if (type === 'email') {
          return validator.isEmail(value);
        } else if (type === 'select-one') {
          return !validator.isEmpty(value);
        } else {
          return !validator.isEmpty(value) && value.length >= 3;
        }
      }

      return false;
    };

    // Check if the field input is valid.
    if (!validateField(type, value)) {
      const getErrorMessage = (type) => {
        if (type === 'email') {
          return 'Email is invalid.';
        } else if (type === 'select-one') {
          return 'Field required';
        } else if (type === 'address') {
          return 'You must input address';
        } else {
          return 'You must input minimum 3 characters';
        }
      };

      if (fieldIndex >= 0) {
        return getErrorMessage(type);
      }
    }

    // Field is valid.
    return false;
  };

  const onNewCustomerInputChange = (event, fieldIndex) => {
    const value = event.currentTarget.value;
    
    newCustomer.inputFields[fieldIndex].error = false;
    newCustomer.inputFields[fieldIndex].helperText = '';
    newCustomer.inputFields[fieldIndex].value = value;
    setValue(`newCustomer`, newCustomer);
  };
  
  const onNewIntermediaryInputChange = (event, fieldIndex) => {
    const value = event.currentTarget.value;
    
    newIntermediary.inputFields[fieldIndex].error = false;
    newIntermediary.inputFields[fieldIndex].helperText = '';
    newIntermediary.inputFields[fieldIndex].value = value;
    
    setValue('newIntermediary', newIntermediary);
  };
  
  const onNewCustomerInputBlur = (event, fieldIndex) => {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;
    const type = event.currentTarget.type;

    const errorMessage = inputIsInvalid(value, id, fieldIndex, type);

    if (!newCustomer.inputFields[fieldIndex].error && errorMessage) {
      newCustomer.inputFields[fieldIndex].error = true;
      newCustomer.inputFields[fieldIndex].helperText = errorMessage;
    } else {
      newCustomer.inputFields[fieldIndex].value = value;
      newCustomer.inputFields[fieldIndex].error = false;
      newCustomer.inputFields[fieldIndex].helperText = '';
    }

    setValue('newCustomer', { ...newCustomer });
  };
  
  const clearNewCustomerForm = () => {
    newCustomer.inputFields?.forEach((_, index) => {
      if (index !== 0) {
        newCustomer.inputFields[index].value = '';
        newCustomer.inputFields[index].error = false;
        newCustomer.inputFields[index].helperText = '';
      }
    })
  };
  
  const clearNewIntermediaryForm = () => {
    newIntermediary.inputFields?.forEach((_, index) => {
      if (index !== 0) {
        newIntermediary.inputFields[index].value = '';
        newIntermediary.inputFields[index].error = false;
        newIntermediary.inputFields[index].helperText = '';
      }
    })
  };
  
  const onNewIntermediaryInputBlur = (event, fieldIndex) => {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;
    const type = event.currentTarget.type;
    
    const errorMessage = inputIsInvalid(value, id, fieldIndex, type);
    if (!newIntermediary.inputFields[fieldIndex].error && errorMessage) {
      newIntermediary.inputFields[fieldIndex].error = true;
      newIntermediary.inputFields[fieldIndex].helperText = errorMessage;
    } else {
      newIntermediary.inputFields[fieldIndex].value = value;
      newIntermediary.inputFields[fieldIndex].error = false;
      newIntermediary.inputFields[fieldIndex].helperText = '';
    }
    
    setValue('newIntermediary', { ...newIntermediary });
  };

  const onNewBusinessPartnerSubmit = async (isCustomer) => {
    const newUser = isCustomer ? newCustomer : newIntermediary;
    
    const hasValidationErrors = newUser.inputFields.some((inputField, fieldIndex) => {
      return inputIsInvalid(
        inputField.value,
        inputField.id,
        fieldIndex,
        inputField.type,
      );
    });
    
    // Go through all the inputs and validate them.
    if (hasValidationErrors) {
      return;
    }

    // All fields passed validation.
    const URI = `${window.appConfig.apiUrl}/internal/business-partners`;

    const getStagedFieldValue = (id) => {
      const item = newUser.inputFields.find((element) => element.id === id);
      return item?.value;
    };

    const contactName = getStagedFieldValue('contact-name');
    const email = getStagedFieldValue('email');
    const organization = getStagedFieldValue('organization-name');
    const address = JSON.parse(getStagedFieldValue('address'));
    const taxStatus = getStagedFieldValue('tax-status');
    const phoneNumber = getStagedFieldValue('phone-number');
    const role = isCustomer ? 'POLICY_HOLDER' : 'INTERMEDIARY';

    try {
      const payload = {
        '@type': 'NewBusinessPartner',
        name: organization,
        country,
        role,
        contactName,
        contactEmailAddress: email,
        contactPhoneNumber: phoneNumber,
        address: {
          '@type': 'NewAddress',
          country: address.country,
          postcode: address.postcode,
          state: address.state,
          stateCode: address.state_code,
          countryCode: address.country_code,
          houseNumber: address.housenumber ?? null,
          street: address.street ?? null,
          district: address.district ?? null,
          city: address.city ?? null,
          county: address.county ?? null,
        },
        ...(isCustomer && {taxStatus}),
      };
      
      if (isCustomer) {
        setValue('newCustomer', { ...newCustomer, isLoading: true });
      } else {
        setValue('newIntermediary', { ...newIntermediary, isLoading: true });
      }

      const token = await GetToken();

      const response = await Ajax.postData(URI, payload, token);
      const { id, name } = response;
      if (isCustomer) {
        onCustomerSelect([name, id]);
      } else {
        onIntermediarySelect([name, id]);
      }
      if (isCustomer) {
        setValue('newCustomer', {...newCustomer, isLoading: false});
        setValue('newQuote', {
          ...newQuote,
          policyHolder: {
            '@type': 'BusinessPartner',
            version: 1,
            id: id,
          },
        });
        clearNewCustomerForm();
        onModalCustomerNewToggle();
      } else {
        setValue('newIntermediary', { ...newIntermediary, isLoading: false });
        clearNewIntermediaryForm();
        onModalIntermediaryNewToggle();
      }
      setValue('formHasChanged', true);
    } catch (error) {
      if (isCustomer) {
        setValue('newCustomer', {...newCustomer, isLoading: false});
      } else {
        setValue('newIntermediary', { ...newIntermediary, isLoading: false });
      }
    }
  };
  
  const onHandleCommisionChange = (_, newValue) => {
    setValue('commission', newValue);
    setValue('formHasChanged', true);
  };
  
  const handleCloseNewBusinessPartnerModal = () => {
    if (modalCustomerCreateOpen) {
      clearNewCustomerForm();
      onModalCustomerNewToggle();
    } else {
      clearNewIntermediaryForm();
      onModalIntermediaryNewToggle();
    }
  };

  const quoteName = newQuote.name;
  
  useEffect(() => {
    setValue('newCustomer', {
      ...newCustomer,
      inputFields: newCustomer.inputFields?.map((field) => field.id === 'tax-status' ? {
        ...field,
        options: taxStatuses.map(({ id, description }) => ({id, name: description}))
      } : field)
    })
  }, [taxStatuses])

  return (
    <div>
      <Typography variant={'h5'} className={classes.title}>
        Quote Details
      </Typography>
      {/* Quote Name */}
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel htmlFor={'risk-main-type'} required>
          Quote Name
        </FormLabel>
        <TextField
          value={quoteName}
          defaultValue={quoteName}
          onChange={onQuoteNameChange}
          id={'quote-name'}
          name={'quoteName'}
        />
      </FormControl>
      {/* Quote Name ./end*/}

      {/*Customer Name*/}
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel htmlFor="risk-main-type" required>
          Insured Name
        </FormLabel>
        <TextboxPopup
          isCustomer={true}
          searchLoading={isCustomerSearchLoading && termsInsuredSearch}
          onModalUserNewToggle={onModalCustomerNewToggle}
          searchTerm={termsInsuredSearch}
          searchTermSelected={customerSearchTermSelected}
          found={customers.length}
          searchResults={customers}
          dropdownOpen={customerDropdownOpen}
          onItemSelect={onCustomerSelect}
          onInputClear={onCustomerSearchClear}
          onDropdownClose={onCustomerSearchDropdownClose}
          onCustomerSearchChange={onCustomerSearchChange}
        />
      </FormControl>
      {/*Customer Name./end*/}
      
      {/*Intermediary*/}
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel htmlFor="risk-main-type">
          Intermediary
        </FormLabel>
        <TextboxPopup
          searchLoading={isIntermediarySearchLoading && termsIntermediarySearch}
          onModalUserNewToggle={onModalIntermediaryNewToggle}
          searchTerm={termsIntermediarySearch}
          searchTermSelected={intermediarySearchTermSelected}
          found={intermediaries.length}
          searchResults={intermediaries}
          dropdownOpen={intermediaryDropdownOpen}
          onItemSelect={onIntermediarySelect}
          onInputClear={onIntermediarySearchClear}
          onDropdownClose={onIntermediarySearchDropdownClose}
          onCustomerSearchChange={onIntermediarySearchChange}
        />
      </FormControl>
      {/*Intermediary./end*/}
      
      {/*Remarks*/}
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel htmlFor="risk-main-type">
          Remarks
        </FormLabel>
        <Typography>{program}</Typography>
      </FormControl>
      {/*Remarks./end*/}
      <Box mb={4}>
        <Typography variant="h5" className={classes.title}>
          Quotation commission
        </Typography>
        <Typography gutterBottom className={classes.description}>
          Adjust the commission that can be gained from the sale of this quotation.
        </Typography>
      </Box>
      {/* Slider */}
      <Box mb={6}>
        <div className={classes.slider}>
          <FormControl>
            <TextField
              id="commission"
              name="commission"
              value={`${(commission * 100).toFixed(1)}`}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </FormControl>
          <Slider
            value={commission}
            aria-labelledby="commission"
            min={0}
            max={0.15}
            step={0.005}
            marks={marks}
            valueLabelDisplay="on"
            valueLabelFormat={`${(commission * 100).toFixed(1)}%`}
            onChange={onHandleCommisionChange}
          />
        </div>
      </Box>
      <QuotesNewAddBusinessPartnerModal
        isCustomer={modalCustomerCreateOpen}
        isLoading={modalCustomerCreateOpen ? newCustomer.isLoading || isTaxStatusLoading : newIntermediary.isLoading}
        inputFields={modalCustomerCreateOpen ? newCustomer.inputFields : newIntermediary.inputFields}
        open={modalCustomerCreateOpen || modalIntermediaryCreateOpen}
        onInputChange={modalCustomerCreateOpen ? onNewCustomerInputChange : onNewIntermediaryInputChange}
        onInputBlur={modalCustomerCreateOpen ? onNewCustomerInputBlur : onNewIntermediaryInputBlur}
        onSubmit={() => onNewBusinessPartnerSubmit(modalCustomerCreateOpen)}
        onCustomerSelect={modalCustomerCreateOpen ? onCustomerSelect : onIntermediarySelect}
        onClose={handleCloseNewBusinessPartnerModal}
      />
    </div>
  );
};

export default QuoteNewTerms;
