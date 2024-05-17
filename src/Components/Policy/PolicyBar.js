import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import Pill from '../Pills/Pill';
import clsx from 'clsx';
import Container from '@mui/material/Container';
import String from '../../Util/string';
import Skeleton from '@mui/material/Skeleton';

const PolicyBar = props => {
  const {variant, pillTitle, title} = props;

  const getPillVariant = status => {
    const statusFormatted = status.toLowerCase();

    if (statusFormatted === 'draft') {
      return 'grey';
    } else if (statusFormatted === 'active') {
      return 'green';
    } else if (statusFormatted === 'expired') {
      return 'black';
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: theme.spacing(9.25),
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 157,
      zIndex: theme.zIndex.appBar,
      backgroundColor: theme.palette.indicatorGreyLight,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        top: theme.spacing(16 + 1/8),
        paddingTop: 0,
        paddingBottom: 0,
      },
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(2),
    },
    status: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    row: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(-2),
      '& > *': {
        padding: theme.spacing(2),
      },
    },
    link: {
      textTransform: 'uppercase',
    },
    title: {
      fontWeight: 700,
      fontSize: 18,
      marginRight: theme.spacing(2),
    },
    active: {
      backgroundColor: theme.palette.indicatorGreenLight,
    },
    expired: {
      backgroundColor: theme.palette.indicatorRedLight,
    },
  }));

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, {
      [classes.active]: variant && variant.toLowerCase() === 'active',
      [classes.expired]: variant && variant.toLowerCase() === 'expired',
    })}>
      <Container maxWidth={false}>
        <div className={classes.row}>
          <div className={classes.status}>
            {
              props.loaded ? (
                <>
                  <Typography variant="h6" className={classes.title}>
                    This policy is { title && title.toLowerCase() }
                  </Typography>
                <Pill variant={getPillVariant(variant)}>{String.capitalize(pillTitle)}</Pill>
                </>
              ) : (<Skeleton variant="rectangular" height={18} width={250}/>)
            }
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PolicyBar;
