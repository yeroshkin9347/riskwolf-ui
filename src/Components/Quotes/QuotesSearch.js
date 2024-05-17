import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';

const QuotesSearch = props => {
  const { onReload, refreshLoading } = props;

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
      <Button color="primary" variant="outlined" onClick={onReload}
        // className={classes.button}
        disabled={ refreshLoading }
        startIcon={<SyncIcon />}>Refresh</Button>
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

export default QuotesSearch;
