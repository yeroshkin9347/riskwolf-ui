import React from 'react';

import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ButtonRound, ButtonSuccess } from '../../Buttons/Buttons';

const QuoteNewFooter = (props) => {
  const { setValue } = useFormContext();
  const activeStep = useWatch({
    name: 'quoteNewActiveStep',
    exact: true,
  });
  const program = useWatch({
    name: 'program',
    exact: true,
  });
  const coveragesSelected = useWatch({
    name: 'coveragesSelected',
    exact: true,
  });
  const targetId = useWatch({
    name: 'targetId',
    exact: true,
  });

  const customerId = useWatch({
    name: 'customerId',
    exact: true,
  });
  const newQuote = useWatch({
    name: 'newQuote',
    exact: true,
  });
  const selectionType = useWatch({ name: "selectionType", exact: true });

  const steps = useWatch({ name: 'steps', exact: true });
  const useStyles = makeStyles((theme) => ({
    footer: {
      paddingTop: theme.spacing(6),
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      '& .MuiButtonBase-root': {
        width: '100%',
      },
    },
    hide: {
      visibility: 'hidden',
      position: 'fixed',
      zIndex: 0,
      bottom: '100vh',
    },
    button: {
      borderRadius: 8,
      minWidth: theme.spacing(22),
      paddingTop: "0.75em",
      paddingBottom: "0.75em",
      fontSize: 14,
      fontWeight: 600,
    },
  }));

  const classes = useStyles();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setValue('quoteNewActiveStep', activeStep + (activeStep === 0 && selectionType === 'other' ? 2 : 1));
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setValue('quoteNewActiveStep', activeStep - (activeStep === 2 && selectionType === 'other' ? 2 : 1));
    }
  };

  let nextLocked = true;

  if (activeStep === 0 && program) {
    nextLocked = false;
  }
  if (activeStep === 1 && !!targetId) {
    nextLocked = false;
  }
  if (activeStep === 2 && coveragesSelected.length) {
    nextLocked = false;
  }
  if (activeStep === 3) {
    nextLocked = false;
  }
  if (activeStep === 4 && customerId && newQuote?.name) {
    nextLocked = false;
  }
  let prevLocked = true;
  if (activeStep !== 0) {
    prevLocked = false;
  }
  
  return (
    <Container maxWidth="sm">
      {/* Step content */}
      <Grid container className={classes.footer} spacing={2}>
        <Grid item>
          <div className={clsx(activeStep === 0 && classes.hide)}>
            <ButtonRound className={classes.button} onClick={handleBack} disabled={prevLocked} startIcon={<ArrowBackIcon />}>
              Back
            </ButtonRound>
          </div>
        </Grid>
        <Grid item>
          <div className={clsx(activeStep === steps.length - 1 && classes.hide)}>
            <ButtonRound className={classes.button} onClick={handleNext} disabled={nextLocked} endIcon={<ArrowForwardIcon />}>
              Next
            </ButtonRound>
          </div>
          <div className={clsx(activeStep < steps.length - 1 && classes.hide)}>
            <ButtonSuccess size="large" onClick={props.handleStartQuote} endIcon={<ArrowForwardIcon />}>
              COMPLETE QUOTATION
            </ButtonSuccess>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export { QuoteNewFooter };
