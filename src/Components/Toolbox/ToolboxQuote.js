import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonSuccess, ButtonError, ButtonNav } from '../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from '@mui/material/Skeleton';
import ButtonDropdown from '../Buttons/ButtonDropdown';
import { Link as RouterLink } from 'react-router-dom';

const ToolboxQuote = props => {
  const { variant, label, loaded } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'sticky',
      top: 56,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.appBar,
      [theme.breakpoints.up('md')]: {
        top: 64,
      }
    },
    Toolbar: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        paddingBottom: 0,
        flexDirection: 'row',
      },
    },
    title: {
      marginRight: theme.spacing(2),
      fontSize: 18,
      fontWeight: 700,
    },
    toolbox: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: -12,
      [theme.breakpoints.up('md')]: {
        maxWidth: 'calc(100% - 364px)',
      }
    },
    controls: {
      margin: theme.spacing(-1),
      '& > *': {
        margin: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
          minWidth: 180,
        }
      }
    },
  }));

  const classes = useStyles();


  const buttons = variant.toLowerCase() === 'created' ? (
    <>
      <ButtonDropdown loaded={loaded}>
        <ButtonSuccess
          disabled={props.status !== 'COMPLETED' && true}
          fullWidth
          onClick={() => props.onDialogOpen('dialogAcceptOpen')}
          >Create Policy</ButtonSuccess>
        <ButtonError
          fullWidth
          onClick={() => props.onDialogOpen('dialogRejectOpen')}
        >Reject Quote</ButtonError>
      </ButtonDropdown>
    </>
  ) : (
    <>
      <Button
        variant="outlined"
        href="#!"
        color="primary"
        disableElevation
        onClick={props.handleEditOpen}>Copy Quote</Button>
      <Button
        variant="outlined"
        href="#!"
        color="primary"
        disableElevation
        onClick={props.handleEditOpen}>Copy coverage</Button>
    </>
  );

  const toolbox = variant ? (
    <div className={classes.controls}>
      {buttons}
    </div>
  ) : null;

  return (
    <Box className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <div className={classes.toolbox}>
          <ButtonNav
            component={RouterLink}
            to="/quotations"
          ><ArrowBackIcon /></ButtonNav>
          {
            loaded ? (
              <Typography className={classes.title} variant="h6">{label}</Typography>
            ) : (<Skeleton width={120} height={18} variant="rectangular"/>)
          }
        </div>
        {toolbox}
      </Toolbar>
    </Box>
  );
};

export default ToolboxQuote;
