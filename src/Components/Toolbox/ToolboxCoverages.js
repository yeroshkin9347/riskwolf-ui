import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import { Stack } from '@mui/material';
import { ButtonSuccess } from '../Buttons/Buttons';

const ToolboxCoverages = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'sticky',
      top: 64,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
    },
    Toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
    },
    title: {
      marginRight: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <Typography className={classes.title} variant="h6">Coverages</Typography>
        <Stack direction="row">
          {props.selected.length > 1 && !props.selected.find(({canActivate}) => !canActivate) && <ButtonSuccess onClick={props.handleOpen}>Activate {props.selected.length} Coverages</ButtonSuccess>}
          <Button variant="contained" component={RouterLink} to="/coverages/new" color="primary" sx={{ml: 2}} disableElevation>New Coverage</Button>
        </Stack>
      </Toolbar>
    </Box>
  );
};

export default ToolboxCoverages;
