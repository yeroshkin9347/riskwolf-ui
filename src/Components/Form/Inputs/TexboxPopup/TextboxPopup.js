import React from 'react';

import makeStyles from '@mui/styles/makeStyles';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { ButtonSuccess } from '../../../Buttons/Buttons';

import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import { IconRound as iconRound } from '../../../../Styles/Components/Buttons';

const CancelSearch = (props) => {
  const { onInputClear } = props;

  const useStyles = makeStyles((theme) => ({
    icon: iconRound,
  }));

  const classes = useStyles();

  return <CancelIcon className={classes.icon} onClick={onInputClear} />;
};

const AddName = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      textTransform: 'uppercase',
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      backgroundColor: theme.palette.success.light,
      fontSize: theme.typography.pxToRem(12),
      color: theme.palette.background.paper,
      borderradius: theme.typography.pxToRem(12),
    },
  }));

  const classes = useStyles();

  return <Typography className={classes.root}>Select</Typography>;
};

const TextboxItem = (props) => {
  const { name, id, onItemSelect } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: theme.spacing(-1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    btn: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.spacing(1),
      textTransform: 'none',
    },
  }));

  const classes = useStyles();

  const customerData = [name, id];

  return (
    <div className={classes.root}>
      <Button className={classes.btn} onClick={() => onItemSelect(customerData)}>
        <Typography>{name}</Typography>
        <AddName />
      </Button>
    </div>
  );
};

const TextboxPopup = (props) => {
  const {
    isCustomer,
    onModalUserNewToggle,
    onCustomerSearchChange,
    onInputClear,
    searchTerm,
    searchTermSelected,
    searchLoading,
    found,
    dropdownOpen,
    searchResults,
    onItemSelect,
    disabled,
  } = props;

  const dropdownShow = dropdownOpen;

  const useStyles = makeStyles((theme) => ({
    hidden: {
      display: 'none',
    },
    content: {
      paddingRight: theme.spacing(14 / 8),
    },
    tool: {
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const renderIcon = searchTerm.length ? (
    <CancelSearch onInputClear={onInputClear} />
  ) : (
    <SearchIcon />
  );

  const renderTexboxItems = searchResults.map((result) => {
    return (
      <TextboxItem key={result.id} name={result.name} id={result.id} onItemSelect={onItemSelect} />
    );
  });

  const renderToolbox = found ? (
    renderTexboxItems
  ) : (
    <>
      <Typography className={classes.tool}>{isCustomer ? 'Customer' : 'Intermediary'} not found</Typography>
      <div className={classes.tool}>
        <ButtonSuccess
          size="small"
          variant="contained"
          onClick={() => {
            onModalUserNewToggle('open');
          }}
          color="primary"
        >
          + Add new {isCustomer ? 'customer' : 'intermediary'}
        </ButtonSuccess>
      </div>
    </>
  );

  const renderDropdown = dropdownShow ? (
    <Card>
      <CardContent className={classes.content}>{renderToolbox}</CardContent>
      <CardActions className={classes.hidden}></CardActions>
    </Card>
  ) : null;

  return (
    <>
      <OutlinedInput
        onChange={(event) => {
          onCustomerSearchChange(event);
        }}
        placeholder={`Search for a ${isCustomer ? 'customer' : 'intermediary'}...`}
        id="insured-amount"
        name="insuredAmount"
        variant="outlined"
        autoFocus={true}
        disabled={disabled}
        value={searchTermSelected ? searchTermSelected : searchTerm}
        // defaultValue={searchTerm}
        // key={props.state.insuredAmount}
        // inputProps={{
        //   defaultValue: props.state.insuredAmount ? props.state.insuredAmount : null,
        //   placeholder: props.state.insuredAmount ? null : '---'
        // }}
        // {
        //   ...(searchTermSelected) && ({value: searchTermSelected})
        // }
        endAdornment={
          <InputAdornment position="end">
            {searchLoading ? <CircularProgress size={20} /> : renderIcon}
          </InputAdornment>
        }
      />
      {renderDropdown}
    </>
  );
};

export default TextboxPopup;
