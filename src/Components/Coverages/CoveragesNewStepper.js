import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const CoveragesNewStepper = props => {
  const { activeStep, steps } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      top: theme.spacing(16),
    },
    stepper: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel sx={{ p: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );

};

export default CoveragesNewStepper;
