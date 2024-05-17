import React, {useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import {FormHelperText} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDebounce} from "../../../Util/useDebounce";
import {useQuery} from "@tanstack/react-query";
import {useWatch} from "react-hook-form";

const AddressSearchQuery = "AddressSearchQuery";

const QuotesNewAddBusinessPartnerModal = (props) => {
  const {
    isCustomer,
    open,
    onClose,
    onInputBlur,
    onInputChange,
    onSubmit,
    inputFields,
    isLoading,
    onModalUserNewClose,
  } = props;
  
  const country = useWatch({ name: 'country', exact: true });
  const [addressSearch, setAddressSearch] = useState('');
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const debouncedAddressSearch = useDebounce(addressSearch, 1000);
  const { isLoading: isAddressItemsLoading, data = {} } = useQuery({
    queryKey: [AddressSearchQuery, debouncedAddressSearch],
    queryFn: async () => {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(debouncedAddressSearch)}&limit=5&apiKey=${apiKey}&filter=countrycode:${country?.slice(0, 2)?.toLowerCase()}`,
      );

      const data = response.json();
      return data ?? {}
    },
    refetchOnWindowFocus: false,
    enabled: !!debouncedAddressSearch,
  });
  
  const apiKey = window.appConfig.geoapify.api.key;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiDialog-paper': {
        minWidth: 420,
      },
    },
    header: {
      marginBottom: theme.spacing(6),
    },
    footer: {
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    textbox: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    spinner: {
      display: 'none',
      position: 'absolute',
    },
    spinnerLoading: {
      display: 'inline-block',
    },
    ctaLoading: {
      color: 'transparent !important',
    },
    addressError: {
      '& .geoapify-autocomplete-input': {
        borderColor: '#f44336'
      }
    },
    autocompleteItems: {
      position: 'absolute',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      boxShadow: '0px 2px 10px 2px rgba(0, 0, 0, 0.1)',
      borderTop: 'none',
      backgroundColor: '#fff',
      
      zIndex: 99,
      top: 'calc(100% + 2px)',
      left: 0,
      right: 0,
      
      '& div': {
        padding: '10px',
        cursor: 'pointer',
        
        '&:hover': {
          
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    addressSearchContainer: {
      position: 'relative',
      width: '100%'
    },
    addressSearchFieldRightContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }));

  const classes = useStyles();
  
  const onAddressChange = (value, fieldIndex) => {
    setShowAddressDropdown(false);
    if (value !== null) {
      const address = JSON.stringify(value.properties);
      onInputChange({currentTarget: {value: address}}, fieldIndex)
    } else {
      onInputChange({currentTarget: {value: ''}}, fieldIndex)
    }
  };
  
  const handleClearAddress = (fieldIndex) => {
    setShowAddressDropdown(false);
    onInputChange({currentTarget: {value: ''}}, fieldIndex);
    setAddressSearch('');
  };
  
  const handleSubmit = () => {
    setAddressSearch('');
    onSubmit();
  };

  const renderInputField = (fieldProps, index) => {
    switch (fieldProps.type) {
      case 'address': {
        const attributes = {
          id: fieldProps.id,
          type: fieldProps.type,
          value: fieldProps.value,
        };
        const addressValue = fieldProps.value ? JSON.parse(fieldProps.value)['address_line2'] : undefined;

        return (
          <FormControl
            onBlur={() => onInputBlur({currentTarget: attributes}, index)}
            className={clsx(classes.textbox, fieldProps.error && classes.addressError)}
            error={fieldProps.error}
            style={{ position: 'relative' }}
          >
            <Box className={classes.addressSearchContainer}>
              <TextField
                fullWidth
                onFocus={() => setShowAddressDropdown(true)}
                placeholder="Search by location, district or sub-district"
                label={fieldProps.label}
                value={addressValue ?? addressSearch}
                onChange={e => setAddressSearch(e.target.value)}
              />
              {addressSearch && (
                <Box className={classes.addressSearchFieldRightContainer}>
                  {isAddressItemsLoading ? <CircularProgress size={18} /> : <IconButton onClick={() => handleClearAddress(index)} size="large"><CloseIcon/></IconButton>}
                </Box>
              )}
            </Box>
            {showAddressDropdown && !isAddressItemsLoading && !!data?.features?.length && (
              <div className={classes.autocompleteItems}>
                {data?.features?.map((addressItem, idx) => (
                  <div key={`address-item-${idx}`} onClick={() => onAddressChange(addressItem, index)}>
                    {addressItem.properties.formatted}
                  </div>
                ))}
              </div>
            )}
            {fieldProps.error && <FormHelperText>{fieldProps.helperText}</FormHelperText>}
          </FormControl>
        );
      }
      case 'select-one': {
        const attributes = {
          ...(fieldProps.error && { error: 'error' }),
          ...(fieldProps.helperText && { helperText: fieldProps.helperText }),
        };
        return (
          <FormControl className={classes.textbox} error={fieldProps.error}>
            <InputLabel htmlFor={fieldProps.id}>{fieldProps.label}</InputLabel>
            <Select
              native
              label={fieldProps.label}
              defaultValue=""
              value={fieldProps.value}
              onBlur={(event) => onInputBlur(event, index)}
              onChange={(event) => onInputChange(event, index)}
              inputProps={{
                key: fieldProps.id,
                id: fieldProps.id,
                name: fieldProps.id,
                required: true,
                ...attributes,
              }}
            >
              <option aria-label="None" value="" disabled></option>
              {
                fieldProps?.options?.map(option => {
                  return <option key={option.id} value={option.id}>{option.name}</option>
                })
              }
            </Select>
            {fieldProps.error && <FormHelperText>{fieldProps.helperText}</FormHelperText>}
          </FormControl>
        );
      }
      default: {
        const attributes = {
          ...(fieldProps.type && { type: fieldProps.type }),
          ...(fieldProps.error && { error: 'error' }),
          ...(fieldProps.helperText && { helperText: fieldProps.helperText }),
        };
        return (
          <TextField
            {...attributes}
            className={classes.textbox}
            key={fieldProps.id}
            id={fieldProps.id}
            name={fieldProps.id}
            value={fieldProps.value}
            label={fieldProps.label}
            onBlur={(event) => onInputBlur(event, index)}
            onChange={(event) => onInputChange(event, index)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        );
      }
    }
  }
  
  return (
    <Dialog open={open} onClose={onModalUserNewClose} className={classes.root}>
      <DialogTitle id="alert-dialog-title">Add new {isCustomer ? 'customer' : 'intermediary'}</DialogTitle>
      <DialogContent>
        <Box color="text.secondary" className={classes.header}>
          <Typography variat="p" color="inherit">
            Your new {isCustomer ? 'customer' : 'intermediary'} will be added to Riskwolf for future use.
          </Typography>
        </Box>

        {inputFields.map((inputField, index) => renderInputField(inputField, index))}
      </DialogContent>
      <DialogActions className={classes.footer}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disableElevation
          {...(isLoading && {
            className: classes.ctaLoading,
            disabled: true,
          })}
        >
          <CircularProgress
            className={clsx(classes.spinner, {
              [classes.spinnerLoading]: isLoading,
            })}
            size={16}
          />
          Add {isCustomer ? 'customer' : 'intermediary'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuotesNewAddBusinessPartnerModal;
