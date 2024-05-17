import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';

import CardIcon from '../Cards/CardIcon';
import QuoteDialogAccept from './QuoteDialog/QuoteDialogAccept';
import QuoteDialogReject from './QuoteDialog/QuoteDialogReject';
import ToolboxQuote from '../Toolbox/ToolboxQuote';
import { List as list } from '../../Styles/Base/Page';
import LoaderOverlay from '../Loader/LoaderOverlay';
import ModalAjaxError from '../Modals/ModalAjaxError';
import CardStack from '../Cards/CardStack';
import Format from '../../Util/format';

const Quote = props => {
  const {
    grossPremium,
    grossPremiumRate,
    onCreateNewPolicy,
    onRejectPolicy,
    onDialogClose,
    commission,
    totalSumInsured,
    onDownload,
    pricingReport,
    quoteDocument,
    customerName,
    customerAddress,
    title,
    loaded,
    dialogAcceptOpen,
    dialogRejectOpen,
    inceptionDate,
    expiryDate,
    status,
    coverages,
  } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6),
    },
    divider: {
      opacity: 0.15,
    },
    list: list(),
    stripe: {
      backgroundColor: theme.palette.stripe,
      padding: `8px 14px`,
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    stripeTitle: {
      fontSize: 18,
      display: 'inline-block',
      marginRight: theme.spacing(3),
      fontWeight: 700
    },
    link: {
      textDecoration: 'underline',
    },
    card: {
      padding: theme.spacing(2.5),
      backgroundColor: theme.palette.common.white,
      minHeight: 100,
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 12,
      boxShadow: '0px 3px 12px 0px #0000001F',
      flex: 1,
    },
    cardItem: {
      display: 'flex',
      justifyContent: 'space-between',
      '& > *': {
        padding: '8px 18px',
      }
    },
    main: {
      paddingTop: theme.spacing(36/8),
      paddingBottom: theme.spacing(36/8),
    },
    blockContainer: {
      margin: theme.spacing(-0.5),
      marginBottom: theme.spacing(8),
      boxSizing: 'border-box',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    },
    blockCol: {
      padding: theme.spacing(0.5),
      boxSizing: 'border-box',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        width: '50%',
      }
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
    },
  }));

  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const startDate = new Date(inceptionDate);
  const endDate = new Date(expiryDate);
  const startDateString = inceptionDate ? dayjs(startDate).format(currentYear === startDate?.getFullYear() ? 'MMM-DD' : 'MMM-DD, YY') : '---';
  const endDateString = expiryDate ? dayjs(endDate).format('MMM-DD, YY') : '---';

  const joinedAddress = customerAddress ? `${customerAddress.houseNumber ? customerAddress.houseNumber : ''} ${customerAddress.street ? customerAddress.street : ''}${customerAddress.city ? `${(!!customerAddress.houseNumber && !!customerAddress.street) ? ', ' : ''}${customerAddress.city}` : ''}${customerAddress.county ? `${customerAddress.city ? ', ' : ''}${customerAddress.county}` : ''}${customerAddress.state ? `${customerAddress.county ? ', ' : ''}${customerAddress.state}` : ''}` : '-';

  return (
    <>
      <Box className={classes.root}>
        <Toolbar/>
        <ToolboxQuote
          loaded={loaded}
          label={`Quote - ${title}`}
          variant="created"
          onDialogOpen={props.onDialogOpen}
          status={status}
          // handleOpen={handleActivateOpen}
          // handleEditOpen={handleEditOpen}
        />
        <Container className={classes.main} maxWidth="xl">
          <Stack spacing={2}>
            <Box sx={{mb: '16px !important'}}>
              <Typography variant="h5">
                  <Box component="span" fontWeight="fontWeightBold"
                  >Quotation Summary</Box>
              </Typography>
            </Box>
            <Grid container columnSpacing={2} rowGap={2} sx={{ mx: '-8px !important' }}>
              <Grid item xs={12} md={6} display="flex">
                <CardIcon
                  reportId={quoteDocument}
                  loaded={true}
                  title="Quote document"
                  handleDownload={onDownload}
                  linkUrl={`${window.appConfig.apiUrl}/internal/files/${quoteDocument}`}
                  icon={<TrendingUpIcon/>}>
                  Coverage factsheet can be used to review the possible performance of a coverage.
                </CardIcon>
              </Grid>
              <Grid item xs={12} md={6} display="flex">
                <CardIcon
                  reportId={pricingReport}
                  loaded={true}
                  title="Aggregated pricing report"
                  handleDownload={onDownload}
                  linkUrl={`${window.appConfig.apiUrl}/internal/files/${pricingReport}`}
                  icon={<BarChartIcon/>}>
                  Coverage contains a loss and risk breakdown of a coverage before creating a quotation.
                </CardIcon>
              </Grid>
            </Grid>

            {/* Blocks */}
            <Grid container columnSpacing={2} rowSpacing={2} sx={{ mx: '-8px !important' }}>
              <Grid item xs={12} md={6} lg={3}>
                <CardStack 
                  title="Gross Premium"
                  content={grossPremium}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardStack 
                  title="Gross Premium Rate"
                  content={grossPremiumRate}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardStack 
                  title="Total Sum Insured"
                  content={totalSumInsured}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardStack 
                  title="Commission"
                  content={commission ?? '---'}
                />
              </Grid>
            </Grid>
            {/* Blocks ./end */}

            {/* Card: Basic information */}
            <Box className={classes.card}>
              <Grid container spacing={4}>
                <Grid xs={12} lg={6}>
                  <Typography variant='h5' className={classes.title}>Quote Summary</Typography>
                  <Stack sx={{ mt: 4 }} rowGap={2.5}>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Label</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{title || '---'}</Typography></Grid>
                    </Grid>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Insured Name</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{customerName || '---'}</Typography></Grid>
                    </Grid>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Address</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{joinedAddress}</Typography></Grid>
                    </Grid>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Period of Cover</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{startDateString} - {endDateString}</Typography></Grid>
                    </Grid>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Total Sum Insured (TSI)</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{totalSumInsured || '---'}</Typography></Grid>
                    </Grid>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Premium</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{grossPremium || '---'} / {grossPremiumRate || '---'}</Typography></Grid>
                    </Grid>
                    <Grid container>
                      <Grid sm={5}><Typography variant="body1">Status</Typography></Grid>
                      <Grid sm={7}><Typography variant="body1" fontWeight={600}>{status || '---'}</Typography></Grid>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid xs={12}>
                  <Typography variant='h5' className={classes.title}>Quote Details</Typography>
                  <Stack sx={{ mt: 2.5 }}>
                    {
                      coverages.length ? (
                        coverages.map((coverage, index) => {
                          const {
                            id,
                            indexDefinition,
                            cohortName,
                            sumInsuredIndividual,
                            trigger,
                            minPayout,
                            sumInsured,
                            quantity,
                          } = coverage;

                          const coveragesLen = coverages.length;

                          return (
                            <div key={id}>
                              <div className={classes.cardItem}>
                                <Typography>
                                  <Box component="span" fontWeight="fontWeightBold">{indexDefinition}</Box>
                                </Typography>
                              </div>
                              <div className={classes.cardItem}>
                                <Typography>Cohort name</Typography>
                                <Typography align="right">{cohortName || '---'}</Typography>
                              </div>
                              <div className={classes.cardItem}>
                                <Typography>Trigger</Typography>
                                <Typography align="right">{trigger || '---'}</Typography>
                              </div>
                              <div className={classes.cardItem}>
                                <Typography>Sum insured individual</Typography>
                                <Typography align="right">{sumInsuredIndividual.amount ? `${sumInsuredIndividual.currency} ${parseFloat(sumInsuredIndividual.amount.toLocaleString()).toFixed(2)}` : '---'}</Typography>
                              </div>
                              <div className={classes.cardItem}>
                                <Typography>Quantity</Typography>
                                <Typography align="right">{Format.number(quantity) || '---'}</Typography>
                              </div>
                              <div className={classes.cardItem}>
                                <Typography>Sum Insured</Typography>
                                <Typography align="right">{sumInsured.amount ? `${sumInsured.currency} ${parseFloat(sumInsured.amount.toLocaleString()).toFixed(2)}` : '---'}</Typography>
                              </div>
                              <div className={classes.cardItem}>
                                <Typography>Payout</Typography>
                                <Typography align="right">({minPayout.amount}%) {minPayout.amount * 0.01 * sumInsuredIndividual.amount * quantity ? `${minPayout.currency} ${parseFloat((minPayout.amount * 0.01 * sumInsuredIndividual.amount * quantity).toLocaleString()).toFixed(2)}` : '---'}</Typography>
                              </div>

                              {/* Render horizontal rule only if not last item*/}
                              { coveragesLen - 1 !== index ? <hr className={classes.divider}/> : null}
                            </div>
                          );
                        })
                      ) : (
                        <div className={classes.cardItem}>
                          <Typography>No coverages</Typography>
                        </div>
                      )
                    }
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/*Dialogs*/}
      <QuoteDialogAccept
        open={dialogAcceptOpen}
        onCreateNewPolicy={onCreateNewPolicy}
        onDialogClose={onDialogClose}
      />
      <QuoteDialogReject
        open={dialogRejectOpen}
        onRejectPolicy={onRejectPolicy}
        onDialogClose={onDialogClose}
      />
      {/*Dialogs ./end*/}

      <LoaderOverlay open={props.backdropOpen}/>
      {
        props.ajaxError && <ModalAjaxError
          open={props.ajaxError}
          handleClose={() => props.onDialogClose('ajaxError')}/>
      }
    </>
  );
};

export default Quote;
