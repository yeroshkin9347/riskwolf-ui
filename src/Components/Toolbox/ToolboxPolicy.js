import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ButtonNav } from '../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const ToolboxPolicy = props => {
  const { label, loaded, variant, handleOpenActivatePolicyModal } = props;
  
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

  return (
    <Box className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <div className={classes.toolbox}>
          <ButtonNav
            component={RouterLink}
            to="/policies"
          ><ArrowBackIcon /></ButtonNav>
          {
            loaded ? (
              <Typography className={classes.title} variant="h6">{label}</Typography>
            ) : (<Skeleton width={120} height={18} variant="rectangular"/>)
          }
        </div>
        {variant.toLowerCase() === 'created' && (
          <Button
            href="#!"
            color="primary"
            disableElevation
            onClick={handleOpenActivatePolicyModal}>Activate</Button>
        )}
      </Toolbar>
    </Box>
  );
};

export default ToolboxPolicy;
