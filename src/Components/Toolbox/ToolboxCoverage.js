import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonSuccess, ButtonNav } from '../Buttons/Buttons';

const ToolboxCoverage = props => {
  const status = props.variant ? props.variant.toLowerCase() : null;

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'sticky',
      top: 56,
      height: 64,
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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '& .MuiButton-root': {
        padding: `${theme.spacing(1.25)} ${theme.spacing(3.5)}`,
        borderRadius: 8,
        fontWeight: 600,
      },
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
      },
    },
    controls: {
      margin: theme.spacing(-0.5),
      '& > *': {
        margin: theme.spacing(0.5),
        [theme.breakpoints.up('md')]: {
          minWidth: 85,
        }
      }
    },
  }));

  const classes = useStyles();

  const buttons = (status === 'created' || status === 'simulated') ? (
    <ButtonSuccess onClick={props.handleOpen}>
      Activate Coverage
    </ButtonSuccess>
  ) : (
    <ButtonSuccess>New quotation</ButtonSuccess>
  );

  const toolbox = status ? (
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
            to="/coverages"
          ><ArrowBackIcon /></ButtonNav>
          {
            props.loaded ? (
              <Typography className={classes.title} variant="h6">{props.label}</Typography>
            ) : (<Skeleton width={120} height={18} variant="rectangular"/>)
          }
        </div>
        {toolbox}
      </Toolbar>
    </Box>
  );
};

ToolboxCoverage.defaultProps = {
  variant: '',
};

export default ToolboxCoverage;
