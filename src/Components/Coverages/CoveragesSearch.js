import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '../../Util/useDebounce';

const CoveragesSearch = props => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);
  
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
  
  useEffect(() => {
    props.onSearchChange(debouncedSearch);
  }, [debouncedSearch])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Button color="primary" variant="outlined" onClick={props.handleReload}
        // className={classes.button}
        disabled={ props.refreshLoading }
        startIcon={<SyncIcon />}>Refresh</Button>
      <FormControl size="small">
        <OutlinedInput
          id="outlined-adornment-password"
          placeholder="Search for coverages"
          notched={false}
          color="primary"
          value={search}
          onChange={e => setSearch(e.target.value)}
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

export default CoveragesSearch;
