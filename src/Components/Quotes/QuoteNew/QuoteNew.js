import React from 'react';

import clsx from 'clsx';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';

import Container from '@mui/material/Container';
import QuoteNewStepper from './QuoteNewStepper';
import Box from '@mui/material/Box';

// Styles
import { List as list } from '../../../Styles/Base/Page';
import { Slider as slider } from '../../../Styles/Components/Sliders';

import { QuoteNewFooter } from './QuoteNewFooter';
import QuoteNewProgram from './QuoteNewProgram/QuoteNewProgram';
import QuoteNewLocation from './QuoteNewLocation/QuoteNewLocation';
import QuoteNewCoverages from './QuoteNewCoverages/QuoteNewCoverages';
import QuoteNewCustomization from './QuoteNewCustomization/QuoteNewCustomization';
import QuoteNewTerms from './QuoteNewTerms/QuoteNewTerms';
import QuoteNewLoader from './QuoteNewLoader';
import QuoteNewReview from './QuoteNewReview/QuoteNewReview';
import QuoteNewHeader from './QuoteNewHeader';
import QuoteNewSnackbar from './QuoteNewSnackbar';
import QuoteNewAjaxError from './QuoteNewAjaxError';
import Divider from "@mui/material/Divider";
import QuotesNewCompleteQuoteModal from "../QuotesModals/QuotesNewCompleteQuoteModal";

export const STEPS = ['Program', 'Location', 'Coverages', 'Customization', 'Terms', 'Review'];
const QuoteNew = () => {
  const [openQuote, setOpenQuote] = React.useState(false);
  
  const form = useForm({
    defaultValues: {
      quoteNewActiveStep: 0,
      steps: STEPS,
      program: undefined,
      selectionType: undefined,
      insuredUnit: undefined,
      sumInsuredBasis: undefined,
      defaultSIperUnit: undefined,
      coveragesUnSelected: [],
      coveragesUnSelectedStage: [],
      coveragesUnSelectedStagePage: 1,
      coveragesSelected: [],
      newQuote: { name: '' },
      termsInsuredSearch: '',
      customerName: '',
      customerId: '',
      backdropOpen: true,
      targetId: undefined,
      country: undefined,
      postcode: undefined,
      city: undefined,
      currency: undefined,
      newCustomer: {
        inputFields: [
          {
            id: 'organization-name',
            label: 'Oraganization name',
            error: false,
            type: 'text',
            value: '',
          },
          {
            id: 'contact-name',
            label: 'Contact name',
            error: false,
            type: 'text',
            value: '',
          },
          {
            id: 'email',
            label: 'Email (contact person)',
            type: 'email',
            error: false,
            value: '',
          },
          {
            id: 'address',
            label: 'Address',
            type: 'address',
            error: false,
            value: '',
          },
          {
            id: 'phone-number',
            label: 'Phone',
            type: 'text',
            error: false,
            value: '',
          },
          {
            id: 'tax-status',
            label: 'Tax status',
            type: 'select-one',
            error: false,
            value: '',
            options: [
              {
                id: 0,
                name: 'No',
              },
              {
                id: 100,
                name: 'Yes',
              }
            ]
          }
        ],
        noValidationErrors: false,
        isLoading: false,
      },
      newIntermediary: {
        inputFields: [
          {
            id: 'organization-name',
            label: 'Oraganization name',
            error: false,
            type: 'text',
            value: '',
          },
          {
            id: 'contact-name',
            label: 'Contact name',
            error: false,
            type: 'text',
            value: '',
          },
          {
            id: 'email',
            label: 'Email (contact person)',
            type: 'email',
            error: false,
            value: '',
          },
          {
            id: 'address',
            label: 'Address',
            type: 'address',
            error: false,
            value: '',
          },
          {
            id: 'phone-number',
            label: 'Phone',
            type: 'text',
            error: false,
            value: '',
          },
        ],
        noValidationErrors: false,
        isLoading: false,
      },
      termsIntermediarySearch: '',
      intermediaryName: '',
      intermediaryId: '',
      remarks: '',
      commission: 0.125,
      formHasChanged: true,
      snackbarOpen: false,
      snackbarMessage: '',
      ajaxError:  false,
      serviceFee: 100,
    },
  });

  const activeStep = useWatch({
    name: 'quoteNewActiveStep',
    exact: true,
    control: form.control,
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6),
    },
    title: {
      marginBottom: theme.spacing(3),
    },

    list: list(),
    stepper: {
      position: 'sticky',
      top: theme.spacing(169 / 8),
      backgroundColor: theme.palette.background.paper,
      zIndex: theme.zIndex.mobileStepper,
      [theme.breakpoints.up('sm')]: {
        top: theme.spacing(16),
      },
    },
    hide: {
      visibility: 'hidden',
      position: 'fixed',
      zIndex: 0,
      bottom: '100vh',
    },
    slider: slider(),
    divider: {
      marginBottom: theme.spacing(3.75),
      backgroundColor: '#EEEEEE'
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
    },
    stripeTitle: {
      fontSize: 18,
      display: 'inline-block',
      marginRight: theme.spacing(3),
      fontWeight: 700,
    },
    link: {
      textDecoration: 'underline',
    },
    card: {
      paddingBottom: theme.spacing(3),
    },
    cardItem: {
      display: 'flex',
      justifyContent: 'space-between',
      '& > *': {
        padding: '8px 18px',
      },
    },
    autoComplete: {
      marginTop: 0,
    },
    stack: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
    },
    row: {
      margin: theme.spacing(-1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 60,
    },
    spread: {
      padding: theme.spacing(1),
    },
    spreadAside: {
      padding: theme.spacing(1),
      maxWidth: 206,
    },
    loader: {
      position: 'absolute',
      bottom: 8,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'none',
    },
    loaderIsVisible: {
      display: 'block',
    },
    toolbox: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  
  const handleStartQuote = () => {
    setOpenQuote(true);
  };
  
  const handleAlertClose = (object, reason) => {
    if (reason !== "backdropClick") {
      setOpenQuote(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Box className={classes.root}>
        <form noValidate autoComplete="off">
          <QuoteNewHeader handleStartQuote={handleStartQuote} />
          <div className={classes.stepper}>
            <Container maxWidth="sm">
              <QuoteNewStepper />
              <Divider className={clsx(activeStep === 1 && classes.hide, classes.divider)} />
            </Container>
          </div>
          {/* Content */}
          <Container maxWidth="sm">
            <div className={clsx(activeStep !== 0 && classes.hide)}>
              <QuoteNewProgram />
            </div>
            <div className={clsx(activeStep !== 1 && classes.hide)}>
              <QuoteNewLocation />
            </div>
            <div className={clsx(activeStep !== 2 && classes.hide)}>
              <QuoteNewCoverages />
            </div>
            <div className={clsx(activeStep !== 3 && classes.hide)}>
              <QuoteNewCustomization />
            </div>
            <div className={clsx(activeStep !== 4 && classes.hide)}>
              <QuoteNewTerms />
            </div>
            <div className={clsx(activeStep !== 5 && classes.hide)}>
              <QuoteNewReview />
            </div>
          </Container>
          <QuoteNewFooter handleStartQuote={handleStartQuote} />
          <QuotesNewCompleteQuoteModal
            open={openQuote}
            handleClose={handleAlertClose}
          />
        </form>
        <QuoteNewLoader />
        <QuoteNewSnackbar />
        <QuoteNewAjaxError />
      </Box>
    </FormProvider>
  );
};
export default QuoteNew;
