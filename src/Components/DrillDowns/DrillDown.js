import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Strong from '../Copy/Strong';
import Button from '@mui/material/Button';
import PeriodMonths from '../PeriodMonths/PeriodMonths';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// Images
import payoutFunction from '../../assets/images/payout-function.svg';
import payoutFunction2 from '../../assets/images/payout-function-2.svg';
import payoutFunctionBinary1 from '../../assets/images/payout-function-binary-1.svg';
import payoutFunctionBinary2 from '../../assets/images/payout-function-binary-2.svg';

import Time from '../../Util/time';

import ContextTheme from '../../Contexts/Theme';

const DrillDownItemStart = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      paddingBottom: theme.spacing(9),
    },
    icon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      position: 'relative',
      zIndex: '10',

      '&:after': {
        content: "''",
        display: 'block',
        width: '1em',
        height: '0.75em',
        backgroundColor: theme.palette.common.white,
      },
    }
  }));

  const classes = useStyles();
  const label = props.payoutStructureAdded ? 'Define Layer 1' : 'No payout structure defined';

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <FlashOnIcon />
      </div>
      <Typography>{label}</Typography>
    </div>
  );
};

const DrillDownItemAdd = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      backgroundColor: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      marginLeft: theme.typography.pxToRem(-1),
      paddingTop: theme.spacing(5),
      "&nth-child(2)": {
        paddingTop: 0,
      },
      "&[disabled]": {
        cursor: 'not-allowed',
        color: theme.palette.action.disabled,
      }
    },
    icon: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      position: 'relative',
      zIndex: '10',
      '&:before': {
        content: "''",
        display: 'block',
        width: '1em',
        height: '0.75em',
        backgroundColor: theme.palette.common.white,
      },
      '&:after': {
        content: "''",
        display: 'block',
        width: '1em',
        height: '0.75em',
        backgroundColor: theme.palette.common.white,
      },
    },
    label: {
      paddingTop: 10,
      color: 'inherit',
    },
  }));

  const classes = useStyles();

  return (
    <button type="button" className={classes.root} {...props}>
      <div className={classes.icon}>
        <AddCircleIcon />
      </div>
      <Typography component="span" className={classes.label}>{props.label}{props.disabled && ' (only one allowed)'}</Typography>
    </button>
  );
};

const parseComparator = stringFromServer => {
  switch(stringFromServer) {
    case 'LT':
      return '<';
    case 'GT':
      return '>';
    case 'LTE':
      return '<=';
    case 'GTE':
      return '>=';
    default:
      return null;
  }
};

const payoutStructureDisabled = (payoutStructures = []) => {
  return payoutStructures.length > 0;
};

const DrillDown = props => {
  const { locale } = useContext(ContextTheme);
  const [expanded, setExpanded] = React.useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
      // Left vertical line.
      '&:before': {
        display: 'block',
        width: 2,
        backgroundColor: theme.palette.text.primary,
        content: "''",
        position: 'absolute',
        top: 0,
        left: 10,
        height: '100%',
      },
    },
    accordion: {
      marginBottom: theme.spacing(1),
      borderRadius: theme.shape.borderRadiusLg,
      boxShadow: 'none',
      border: `1px solid ${theme.palette.border}`,
      '&::before': {
        display: 'none',
      }
    },
    title: {
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1),
      fontWeight: 600,
    },
    sub: {
      color: theme.palette.grey[500],
      textTransform: 'uppercase',
    },
    fat: {
      fontWeight: 600,
    },
    details: {
      flexDirection: 'column',
    },
    summary: {
      display: 'flex',
      flexDirection: 'column',
    },
    toolbox: {
      display: 'flex',
      gap: theme.spacing(1),
      justifyContent: 'flex-end',
      paddingTop: theme.spacing(2),
    },
    layout: {
      display: 'flex',
      gap: theme.spacing(4),
    },
    layoutBlock: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: theme.typography.pxToRem(30), // compensate for the image label
    },
    editableDates: {
      display: 'flex',
      alignItems: 'center',
      // marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(2),
    },
    dateField: {
      '& .MuiInputBase-input': {
        fontSize: '1.4rem',
        fontWeight: 600,
      }
    }
  }));

  const classes = useStyles();
  const payoutStructuresBinary = props.state.payoutStructures.filter((item) => item.type === 'binary');
  const payoutStructuresLinear = props.state.payoutStructures.filter((item) => item.type === 'linear');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={classes.root}>
        <DrillDownItemStart
          payoutStructureAdded={props.state.payoutStructures.length > 0 || false}
        />
  
        {/* BINARY PAYOUT */}
        { payoutStructuresBinary.map((item, index) => {
          return (
            <div key={index}>
              {/* Accordion */}
              <Accordion className={classes.accordion} expanded={expanded === 'binaryPayoutPanel'} onChange={handleChange('binaryPayoutPanel')}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="risk-period"
                  id="risk-period"
                >
                  <div className={classes.summary}>
                    <Typography className={classes.title} variant="h6">During</Typography>
                    <Strong className={classes.sub} gutterBottom>Risk period</Strong>
                    {expanded !== 'binaryPayoutPanel' && (
                      <Typography variant="h5" className={classes.fat}>{Time.getDate(props.state.riskPeriodFrom, locale)} - {Time.getDate(props.state.riskPeriodTo, locale)}</Typography>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className={classes.editableDates}>
                    <DateField
                      className={classes.dateField}
                      label="From"
                      value={dayjs(props.riskPeriod.state.riskPeriodFrom)}
                      onChange={(date) => date.isValid() && props.riskPeriod.onRiskPeriodChangeFrom(new Date(date.format()))}
                    />
                    <Typography variant="h5" className={classes.fat} style={{marginLeft: 8, marginRight: 8}}>-</Typography>
                    <DateField
                      className={classes.dateField}
                      label="To"
                      value={dayjs(props.riskPeriod.state.riskPeriodTo)}
                      onChange={(date) => date.isValid() && props.riskPeriod.onRiskPeriodChangeTo(new Date(date.format()))}
                    />
                  </div>
                  <PeriodMonths
                    onChangeFrom={props.riskPeriod.onRiskPeriodChangeFrom}
                    onChangeTo={props.riskPeriod.onRiskPeriodChangeTo}
                    from={props.riskPeriod.state.riskPeriodFrom}
                    to={props.riskPeriod.state.riskPeriodTo}
                    loaded={props.riskPeriod.state.periodMonthsLoaded}/>
                  <div className={classes.toolbox}>
                    <Button onClick={() => props.onPayoutStructureBack(item.id)}>Remove</Button>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Accordion ./end */}
  
              {/* Accordion */}
              <Accordion className={classes.accordion} expanded={expanded === 'linearPayoutPanel'} onChange={handleChange('linearPayoutPanel')}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="risk-period"
                  id="risk-period"
                >
                  <div className={classes.summary}>
                    <Typography variant="h6" className={classes.title}>If</Typography>
                    <Strong className={classes.sub}>{ props.state.triggerDescription }</Strong>
                    <Typography variant="h5" gutterBottom className={classes.fat}>{ props.state.trigger ? `${parseComparator(props.state.triggerComparator)} ${props.state.trigger}${props.state.indexUnit}` : '--'}</Typography>
                    <Typography variant="h6" className={classes.title}>Then</Typography>
                    <Strong className={classes.sub} gutterBottom>Binary payout</Strong>
                    {/* To be used for linear payout
                    <Typography variant="h5" className={classes.fat}>Minimum of 20% / 1% per {props.state.indexUnit}</Typography>
                    */}
                    <Typography variant="h5" className={classes.fat}>Payout of {props.state.payoutAmount}% of Sum Insured</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  {/*Trigger Point*/}
                  <Box mb={1} className={classes.layout}>
                    <img src={payoutFunctionBinary1} alt="Payout Function" />
                    <div className={classes.layoutBlock}>
                      <Box mb={5}>
                        <Strong gutterBottom>Trigger point</Strong>
                        <Typography variant="subtitle2">
                          The strike is the trigger value when the first payout will be released. This is also the maximum payout or exhaustion.
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          value={props.state.trigger}
                          id="trigger"
                          name="trigger"
                          onChange={props.handleTextboxChange}
                          type="number"
                          label={[props.state.triggerLabel]}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required/>
                      </FormControl>
                    </div>
                  </Box>
                  {/*Trigger Point ./end*/}
  
                  {/*Payout Amount*/}
                  <Box mb={1} className={classes.layout}>
                    <img src={payoutFunctionBinary2} alt="Payout Function" />
                    <div className={classes.layoutBlock}>
                      <Box mb={5}>
                        <Strong gutterBottom>Payout Amount</Strong>
                        <Typography variant="subtitle2">
                         Once the trigger point is hit the payout structure will release a fraction of the sum insured (optional)
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          value={props.state.payoutAmount}
                          id="payout-amount"
                          name="payoutAmount"
                          onChange={props.handleTextboxChange}
                          type="number"
                          label="% of Sum Insured"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required/>
                      </FormControl>
                    </div>
                  </Box>
                  {/*Payout Amount ./end*/}
  
                  <div className={classes.toolbox}>
                    <Button onClick={() => props.onPayoutStructureBack(item.id)}>Remove</Button>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Accordion ./end */}
            </div>
          );
        })}
  
        <DrillDownItemAdd
          label="Add binary payout"
          disabled={payoutStructureDisabled(props.state.payoutStructures)}
          onClick={() => props.onAddPayoutStructure('binary')}/>
  
        {/* LINEAR PAYOUT */}
        { payoutStructuresLinear.map((item, index) => {
          return (
            <div key={index}>
              {/* Accordion */}
              <Accordion className={classes.accordion} expanded={expanded === 'linearPayoutPanel'} onChange={handleChange('linearPayoutPanel')}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="risk-period"
                  id="risk-period"
                >
                  <div className={classes.summary}>
                    <Typography className={classes.title} variant="h6">During</Typography>
                    <Strong className={classes.sub} gutterBottom>Risk period</Strong>
                    {expanded !== 'linearPayoutPanel' && (
                      <Typography variant="h5" className={classes.fat}>{Time.getDate(props.state.riskPeriodFrom, locale)} - {Time.getDate(props.state.riskPeriodTo, locale)}</Typography>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className={classes.editableDates}>
                    <DateField
                      className={classes.dateField}
                      label="From"
                      value={dayjs(props.riskPeriod.state.riskPeriodFrom)}
                      onChange={(date) => date.isValid() && props.riskPeriod.onRiskPeriodChangeFrom(new Date(date.format()))}
                    />
                    <Typography variant="h5" className={classes.fat} style={{marginLeft: 8, marginRight: 8}}>-</Typography>
                    <DateField
                      className={classes.dateField}
                      label="To"
                      value={dayjs(props.riskPeriod.state.riskPeriodTo)}
                      onChange={(date) => date.isValid() && props.riskPeriod.onRiskPeriodChangeTo(new Date(date.format()))}
                    />
                  </div>
                  <PeriodMonths
                    onChangeFrom={props.riskPeriod.onRiskPeriodChangeFrom}
                    onChangeTo={props.riskPeriod.onRiskPeriodChangeTo}
                    from={props.riskPeriod.state.riskPeriodFrom}
                    to={props.riskPeriod.state.riskPeriodTo}
                    loaded={props.riskPeriod.state.periodMonthsLoaded}/>
                  <div className={classes.toolbox}>
                    <Button onClick={() => props.onPayoutStructureBack(item.id)}>Remove</Button>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Accordion ./end */}
  
              {/* Accordion */}
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="risk-period"
                  id="risk-period"
                >
                  <div className={classes.summary}>
                    <Typography variant="h6" className={classes.title}>If</Typography>
                    <Strong className={classes.sub}>{ props.state.triggerDescription}</Strong>
                    <Typography variant="h5" gutterBottom className={classes.fat}>{ props.state.trigger ? `${parseComparator(props.state.triggerComparator)} ${props.state.trigger}${props.state.indexUnit}` : '--'}</Typography>
                    <Typography variant="h6" className={classes.title}>Then</Typography>
                    <Strong className={classes.sub} gutterBottom>Linear payout</Strong>
                    <Typography variant="h5" className={classes.fat}>Minimum of {props.state.payoutAmount || '--'}% / {props.state.payoutPerUnitAmount || '--'}% per {props.state.indexUnit}</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  {/*Trigger Point*/}
                  <Box mb={1} className={classes.layout}>
                    <img src={payoutFunction} alt="Payout Function" />
                    <div className={classes.layoutBlock}>
                      <Box mb={5}>
                        <Strong gutterBottom>Trigger (or Strike)</Strong>
                        <Typography variant="subtitle2">
                          The cumulative rainfall value at which the payout commences
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          value={props.state.trigger}
                          id="trigger"
                          name="trigger"
                          // Code below will be used once mulitple payout
                          // structures become available.
                          // onChange={e => props.onPayoutStructureChange(e, item.id, item.type)}
                          onChange={props.handleTextboxChange}
                          type="number"
                          label={[props.state.triggerLabel]}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required/>
                      </FormControl>
                    </div>
                  </Box>
                  {/*Trigger Point ./end*/}
  
                  <Box m={3}>
                    <Divider/>
                  </Box>
  
                  {/*Payout Amount*/}
                  <Box mb={1} className={classes.layout}>
                    <img src={payoutFunction2} alt="Payout Function" />
                    <div className={classes.layoutBlock}>
                      <Box mb={5}>
                        <Strong gutterBottom>Payout Amount</Strong>
                        <Typography variant="subtitle2">
                         Once the trigger point is hit the payout structure will release a fraction of the sum insured (optional)
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          value={props.state.payoutAmount}
                          id="payout-amount-linear"
                          name="payoutAmount"
                          // Code below will be used once mulitple payout
                          // structures become available.
                          // onChange={e => props.onPayoutStructureChange(e, item.id, item.type)}
                          onChange={props.handleTextboxChange}
                          type="number"
                          label="% of Sum Insured"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required/>
                      </FormControl>
                    </div>
                  </Box>
                  {/*Payout Amount ./end*/}
  
                  {/*Payout Per Unit*/}
                  <Box mb={1} className={classes.layout}>
                    <img src={payoutFunction2} alt="Payout Function" />
                    <div className={classes.layoutBlock}>
                      <Box mb={5}>
                        <Strong gutterBottom>Payout per {props.state.indexUnit}</Strong>
                        <Typography variant="subtitle2">
                         After the trigger is hit the payout structure will pay for each additional {props.state.indexUnit}
                        </Typography>
                      </Box>
                      <FormControl fullWidth>
                        <TextField
                          value={props.state.payoutPerUnitAmount}
                          id="per-unit"
                          name="payoutPerUnitAmount"
                          // Code below will be used once mulitple payout
                          // structures become available.
                          // onChange={e => props.onPayoutStructureChange(e, item.id, item.type)}
                          onChange={props.handleTextboxChange}
                          type="number"
                          label="% of Sum Insured"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required/>
                      </FormControl>
                    </div>
                  </Box>
                  {/*Payout Per Unit ./end*/}
  
                  <div className={classes.toolbox}>
                    <Button onClick={() => props.onPayoutStructureBack(item.id)}>Remove</Button>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Accordion ./end */}
            </div>
          );
        })}
        <DrillDownItemAdd
          label="Add linear payout"
          disabled={payoutStructureDisabled(props.state.payoutStructures)}
          onClick={() => props.onAddPayoutStructure('linear')}/>
      </div>
    </LocalizationProvider>
  );
};

DrillDown.defaultProps = {
  status: "draft",
}

export default DrillDown;
