import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { useFormContext, useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Format from '../../../../Util/format';
import { ReactComponent as EditIcon } from '../../../../assets/images/edit-icon.svg';

const QuoteNewReview = () => {
  const {  setValue } = useFormContext();

  const program = useWatch({ name: 'program', exact: true });
  const coveragesSelected = useWatch({
    name: 'coveragesSelected',
    exact: true,
  });
  const newQuote = useWatch({
    name: 'newQuote',
    exact: true,
  });
  const customerName = useWatch({
    name: 'customerName',
    exact: true,
  });
  const remarks = useWatch({
    name: 'remarks',
    exact: true,
  });
  const currency = useWatch({
    name: 'currency',
    exact: true,
  });
  const insuredUnit = useWatch({
    name: 'insuredUnit',
    exact: true,
  });

  const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: theme.spacing(2),
    },
    description: {
      color: '#0000008A',
    },
    label: {
      display: 'inline-block',
    },
    stripe: {
      backgroundColor: theme.palette.stripe,
      padding: `8px 14px`,
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      '& a': {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        textTransform: 'uppercase',
      }
    },
    stripeTitle: {
      fontSize: 18,
      display: 'inline-block',
      marginRight: theme.spacing(3),
      fontWeight: 700,
      flex: 1,
    },
    link: {
      textDecoration: 'underline',
    },
    card: {
      paddingBottom: theme.spacing(8),
    },
    cardItem: {
      display: 'flex',
      justifyContent: 'space-between',
      '& > *': {
        padding: '8px 18px',
      },
    },
  }));

  const classes = useStyles();
  
  const onChangeActiveStep = (step) => () => {
    setValue('quoteNewActiveStep', step);
  };

  const totalSumInsured = coveragesSelected.reduce(
    (previousValue, currentValue) => previousValue + currentValue.sumInsured,
    0,
  );
  return (
    <div>
      <Box mb={6}>
        <Typography variant="h5" className={classes.title}>
          Review quotation summary
        </Typography>
      </Box>
      <div className={classes.card}>
        <Box className={classes.stripe}>
          <Typography variant="h6" className={classes.stripeTitle}>
            Basic information
          </Typography>
          <Link href="#!" variant="body2" onClick={onChangeActiveStep(0)}>
            Edit
            <EditIcon />
          </Link>
        </Box>
        <div className={classes.cardItem}>
          <Typography>Insured Value</Typography>
          <Typography align="right">{program}</Typography>
        </div>
      </div>
      {/* Card: Premiums */}
      <div className={classes.card}>
        <Box className={classes.stripe}>
          <Typography variant="h6" className={classes.stripeTitle}>
            Premiums
          </Typography>
          <Link href="#!" variant="body2" onClick={onChangeActiveStep(3)}>
            Edit
            <EditIcon />
          </Link>
        </Box>
        <div className={classes.cardItem}>
          <Typography>Currency</Typography>
          <Typography align="right">{currency}</Typography>
        </div>
        <div className={classes.cardItem}>
          <Typography>Total Sum Insured</Typography>
          <Typography align="right">
            {Format.currency(
              totalSumInsured,
              currency,
            )}
          </Typography>
        </div>
      </div>
      {/* Card: Coverages */}
      <div className={classes.card}>
        <Box className={classes.stripe}>
          <Typography variant="h6" className={classes.stripeTitle}>
            Coverages
          </Typography>
          <Link href="#!" variant="body2" onClick={onChangeActiveStep(2)}>
            Edit
            <EditIcon />
          </Link>
        </Box>

        {coveragesSelected.map((coverage, index) => {
          const {
            id,
            title,
            trigger,
            minPayout,
            quantity,
            name,
            sumInsured,
            sumInsuredIndividual,
          } = coverage;

          const coveragesSelectedLen = coveragesSelected.length;

          return (
            <div key={id}>
              <div className={classes.cardItem}>
                <Typography>
                  <Box component="span" fontWeight="fontWeightBold">
                    {title}
                  </Box>
                </Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Name</Typography>
                <Typography align="right">{name}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Trigger</Typography>
                <Typography align="right">{trigger}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Sum Insured per {insuredUnit}</Typography>
                <Typography align="right">
                  {Format.currency(sumInsuredIndividual, currency)}
                </Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Insured Extent</Typography>
                <Typography align="right">{Format.number(quantity)} {insuredUnit}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Sum insured per coverage</Typography>
                <Typography align="right">
                  {Format.currency(sumInsured, currency)}
                </Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Payout</Typography>
                <Typography align="right">
                  ({minPayout.value}%){' '}
                  {Format.currency(
                    minPayout.value * 0.01 * sumInsuredIndividual * quantity,
                    currency,
                  )}
                </Typography>
              </div>
              {/* Render horizontal rule only if not last item */}
              {coveragesSelectedLen - 1 !== index ? <hr className={classes.divider} /> : null}
            </div>
          );
        })}
      </div>
      {/* Card: Coverages ./end*/}
      {/* Card: Terms */}
      <div className={classes.card}>
        <Box className={classes.stripe}>
          <Typography variant="h6" className={classes.stripeTitle}>
            Quotation terms
          </Typography>
          <Link href="#!" variant="body2" onClick={onChangeActiveStep(4)}>
            Edit
            <EditIcon />
          </Link>
        </Box>

        <div>
          <div className={classes.cardItem}>
            <Typography>Quote name</Typography>
            <Typography align="right">{newQuote.name}</Typography>
          </div>
          <div className={classes.cardItem}>
            <Typography>Customer name</Typography>
            <Typography align="right">{customerName}</Typography>
          </div>
          <div className={classes.cardItem}>
            <Typography>
              <Box component="span" fontWeight="fontWeightBold">
                Exclusions
              </Box>
            </Typography>
          </div>
          <div className={classes.cardItem}>
            <Typography>
              <ul className={classes.list}>
                {remarks ? (
                  <li
                    dangerouslySetInnerHTML={{
                      __html: remarks.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                    }}
                  ></li>
                ) : null}
              </ul>
            </Typography>
          </div>
        </div>
      </div>
      {/* Card: Terms ./end*/}
    </div>
  );
};

export default QuoteNewReview;
