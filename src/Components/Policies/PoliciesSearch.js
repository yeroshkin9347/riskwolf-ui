import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PoliciesSearch = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
      textAlign: 'right',
      '& .MuiFormControl-root': {
        margin: theme.spacing(1),
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(1),
      }
    },
    icon: {
      color: theme.palette.divider,
    }
  }));

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl size="small">
        <OutlinedInput
          id="quotes-search"
          placeholder="Search"
          notched={false}
          color="primary"
          // value={values.password}
          // onChange={handleChange('password')}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon className={classes.icon}/>
            </InputAdornment>
          }
        />
        </FormControl>
    </form>
  );
};

export default PoliciesSearch;
