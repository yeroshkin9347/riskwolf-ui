import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ToolboxPartnersNew from '../Toolbox/ToolboxPartnersNew';
import ToolboxPartnersEdit from '../Toolbox/ToolboxPartnersEdit';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const Partner = props => {

  const {
    edit,
    mode,
    title,
    company,
    type,
    name,
    email,
    phone,
    website,
    notes,
    onEdit,
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6),
    },
    formGroup: {
      '& + *': {
        marginTop: theme.spacing(5),
      }
    },
    main: {
      maxWidth: theme.typography.pxToRem(388),
      paddingTop: theme.spacing(5),
      marginRight: 'auto',
      flexGrow: 1,
    },
    panelItem: {
      '& + *': {
        paddingTop: theme.spacing(5),
      }
    },
    panelItemLabel: {
      fontSize: theme.typography.pxToRem(14),
      marginBottom: theme.spacing(1.2),
    },
    panelItemTextbox: {

    }
  }));

  // Edit mode is default.
  const toolbox = (mode === 'new' || edit) ? <ToolboxPartnersNew/> : <ToolboxPartnersEdit title={title} onEdit={onEdit}/>

  const classes = useStyles();

  // Data to be added/edited
  const form = (
    <form noValidate autoComplete="off">
      <Box className={classes.formGroup}>
        <TextField id="company-name" name="companyName" label="Company name" fullWidth required
        {...(edit && mode !== 'new' && company) && {value: company}}/>
      </Box>
      <Box className={classes.formGroup}>
        <FormControl fullWidth>
          <InputLabel id="typeLabel">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            // value={age}
            // onChange={handleChange}
            label="Type"
            variant="standard"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.formGroup}>
        <TextField id="contect-name" name="contactName" label="Contact name" fullWidth required/>
      </Box>
      <Box className={classes.formGroup}>
        <TextField id="email" name="email" label="Email (contact person)" type="email" fullWidth required/>
      </Box>
      <Box className={classes.formGroup}>
        <TextField id="phone" name="phone" label="Phone (contact person)" type="tel" fullWidth required/>
      </Box>
      <Box className={classes.formGroup}>
        <TextField id="website" name="website" label="Website" type="url" fullWidth required/>
      </Box>
      <Box className={classes.formGroup}>
        <TextField id="notes" name="notes" label="Notes"  fullWidth minRows={9} multiline/>
      </Box>
    </form>
  );

  // Read only data
  const panel = (
    <>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Company name</Typography>
        <Typography>{company}</Typography>
      </Box>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Type</Typography>
        <Typography>{type}</Typography>
      </Box>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Contact name</Typography>
        <Typography>{name}</Typography>
      </Box>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Email (contact person)</Typography>
        <Typography>{email}</Typography>
      </Box>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Phone number (contact person)</Typography>
        <Typography>{phone}</Typography>
      </Box>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Website</Typography>
        <Typography>{website}</Typography>
      </Box>
      <Box className={classes.panelItem}>
        <Typography className={classes.panelItemLabel}>Notes</Typography>
        <Typography>{notes}</Typography>
      </Box>
    </>
  );

  return (
    <Box className={classes.root}>
      <Toolbar/>
      {toolbox}
      <Container>
        <Grid container>
          <main className={classes.main}>
            {
              (mode === 'new' || edit) ? form : panel
            }
          </main>
        </Grid>
      </Container>
    </Box>
  );
};

export default Partner;
