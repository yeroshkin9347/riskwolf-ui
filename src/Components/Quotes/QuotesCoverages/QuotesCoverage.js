import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useWatch } from 'react-hook-form';

import { Link as link } from '../../../Styles/Base/Type';

import Format from '../../../Util/format';

import ContextTheme from '../../../Contexts/Theme';

const QuotesCoverage = props => {
  const {
    id,
    title,
    limit,
    trigger,
    triggerUnit,
    triggerLabel,
    payout,
    onCoverageCheckboxChange,
    selected,
    disabled,
    start,
    end,
    createdBy,
    createdAt,
    description,
    dataSet } = props;
  
  const currency = useWatch({
    name: 'currency',
    exact: true,
  });
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      borderColor: '#DFE0EB',
    },
    sub:{
      fontSize: theme.typography.pxToRem(14),
      '&> span': {
        fontWeight: 'bold',
        color: theme.palette.alt.main,
      }
    },
    em: {
      fontStyle: 'italic',
    },
    selected: {
      backgroundColor: '#F6F9FD',
    },
    link: {
      ...link(),
      display: 'inline-block',
      fontSize: theme.typography.pxToRem(12),
      textTransform: 'uppercase',
      letterSpacing: '0.013em',
    },
    linkMore: {
      ...link(),
      display: 'inline-block',
      fontSize: theme.typography.pxToRem(18),
    },
    linkFile: {
      ...link(),
      display: 'inline-block',
      fontSize: theme.typography.pxToRem(14),
    },
    linkIcon: {
      marginTop: '-0.25em',
      marginBottom: '-0.25em',
      marginRight: '-0.25em',
    },
    linkIconFile: {
      marginTop: '-0.25em',
      marginBottom: '-0.25em',
      marginLeft: '-0.25em',
    },
    toolbox: {
      textAlign: 'center',
      flexShrink: 0,
    },
    toolboxRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    spacingSm: {
      marginBottom: theme.spacing(1),
    },
    hidden: {
      display: 'none',
    },
    small: {
      fontSize: theme.typography.pxToRem(10),
      color: '#718096',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    cta: {
      borderRadius: theme.spacing(1),
      padding: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      minWidth: theme.spacing(10),
      fontSize: 12,
      fontWeight: 600,
    },
    ctaSelected: {
      color: '#999',
      backgroundColor: '#e0e0e0',
    },
  }));

  const { locale } = useContext(ContextTheme);

  const classes = useStyles();

  return (
    <Card variant="outlined" className={
      clsx(classes.root, {
        [classes.selected]: selected,
      })
    }>
      <div className={classes.body}>
        <div className={classes.main}>
          <Box mb={1}>
            <Box mb={1}>
              <Typography>
                <Box
                  component="span"
                  fontWeight="fontWeightBold"
                >{triggerLabel} ({trigger}{triggerUnit} - {`${payout[0]} ${currency}`})</Box>
              </Typography>
              <Typography className={classes.em}>Risk period: { Format.date(start, locale) || 'xxx'} - { Format.date(end, locale) || 'xxx'}</Typography>
            </Box>
          </Box>
        </div>
        <div className={classes.footer}>
          <Typography className={classes.sub}>Created by: {createdBy} ({ Format.date(createdAt, locale)})</Typography>
          <Button
            className={clsx(classes.cta, selected && classes.ctaSelected)}
            {
              ...
              (selected ? {} : { color: 'primary' })
            }
            variant="contained"
            disableElevation
            disabled={disabled}
            onClick={e=> {
              onCoverageCheckboxChange(e, {id, limit, title, description, dataSet, trigger, payout, selected, start, end, createdBy, createdAt});
            }}
            >{ selected ? 'Remove' : ( disabled ? 'Selected' : 'Select') }</Button>
        </div>
      </div>
    </Card>
  );
};

export default QuotesCoverage;
