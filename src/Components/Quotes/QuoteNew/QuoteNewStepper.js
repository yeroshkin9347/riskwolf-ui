import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import makeStyles from '@mui/styles/makeStyles';
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ReactComponent as CheckCircleIcon } from '../../../assets/images/check-circle.svg';
import { ReactComponent as ActiveStepIcon } from '../../../assets/images/active-step.svg';
import { ReactComponent as StepIcon } from '../../../assets/images/step.svg';
import clsx from "clsx";

const QuoteNewStepper = () => {
  const { control } = useFormContext();

  const steps = useWatch({ name: "steps", exact: true });
  const quoteNewActiveStep = useWatch({ name: "quoteNewActiveStep", exact: true });
  const selectionType = useWatch({ name: "selectionType", exact: true });
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      top: theme.spacing(16),
      paddingBottom: theme.spacing(30 / 8),
    },
    stepper: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 30,
      paddingBottom: 4,
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    step: {
      height: 60,
      paddingLeft: 11,
      paddingRight: 11,
      position: 'relative',
      '& .MuiStepLabel-root': {
        height: '100%',
        justifyContent: 'center',
      },
      '& .MuiStepLabel-label': {
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
      }
    },
    hide: {
      display: 'none',
    },
    stepIconWrapper: {
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepConnector: {
      width: 6,
      height: 1,
      backgroundColor: '#00000015',
      position: 'absolute',
      transform: 'translateX(-14px)',
      top: '50%'
    },
    activeStepLabel: {
      '& .MuiStepLabel-label': {
        fontWeight: '600 !important',
      }
    },
  }));

  const classes = useStyles();
  
  const QuoteStepIcon = (props) => {
    const { active, completed, classeName } = props;
    
    return (
      <div className={`${classes.stepIconWrapper} ${classeName}`}>
        {completed ? (
          <CheckCircleIcon />
        ) : (
          active ? <ActiveStepIcon /> : <StepIcon />
        )}
      </div>
    );
  }
  
  return (
    <Controller
      name={"quoteNewActiveStep"}
      control={control}
      render={({ field: { value } }) => {
        return (
          <div className={classes.root}>
            <Stepper
              activeStep={value}
              className={classes.stepper}
              connector={<div className={classes.stepConnector} />}
              alternativeLabel
              sx={{ p: 3 }}
            >
              {steps.map((label, index) => (
                <Step className={clsx(classes.step, (index === 1 && selectionType === 'other') && classes.hide)} key={label}>
                  <StepLabel
                    StepIconComponent={QuoteStepIcon}
                    className={index === quoteNewActiveStep ? classes.activeStepLabel : ''}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        );
      }}
    />
  );
};

export default QuoteNewStepper;
