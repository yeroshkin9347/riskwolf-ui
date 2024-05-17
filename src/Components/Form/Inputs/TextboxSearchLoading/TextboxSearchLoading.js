import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';

import SearchIcon from '@mui/icons-material/Search';

const TextboxSearchLoading = props => {

  const {loading} = props;

  return (
    <>
      <OutlinedInput
        {...props}
        variant="outlined"
        autoFocus={true}
        endAdornment={
          <InputAdornment position="end">
            { loading ? <CircularProgress size={20}/> : <SearchIcon/> }
          </InputAdornment>
        }/>
    </>
  );
};

export default TextboxSearchLoading;
