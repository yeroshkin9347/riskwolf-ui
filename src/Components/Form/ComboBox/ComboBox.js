import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ComboBox = props => {
  const {
    id,
    name,
    label,
    disabled,
    options,
    onChange,
  } = props;

  return (
    <Autocomplete
      disabled={disabled}
      id={id}
      name={name}
      options={options}
      onChange={onChange}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default ComboBox;
