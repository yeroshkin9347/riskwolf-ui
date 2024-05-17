import React, {useContext} from 'react';
import makeStyles from '@mui/styles/makeStyles';

import { Box, Container, Typography, FormLabel, Link } from '@mui/material';
import { ButtonRound } from '../Buttons/Buttons';
import clsx from 'clsx';

import Grid from '@mui/material/Unstable_Grid2';
import CoveragesNewStepper from './CoveragesNewStepper';
// import CoveragesNewMap from './CoveragesNewMap';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import ToolboxCoveragesNew from '../Toolbox/ToolboxCoveragesNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import CardSelectList from '../Form/Checkboxes/CardSelect/CardSelectList';
import Pagination from '@mui/material/Pagination';

import DrillDown from '../DrillDowns/DrillDown';

import { Slider as slider } from '../../Styles/Components/Sliders';
import ComboBox from '../Form/ComboBox/ComboBox';

import Paginate from '../../Util/paginate';
import Time from "../../Util/time";
import ContextTheme from "../../Contexts/Theme";

const CoveragesNew = props => {
  const steps = [
    'Data sources',
    'Indexes',
    'Payouts',
    'Review'
  ];
  const { locale } = useContext(ContextTheme);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6)
    },
    title: {
      marginBottom: theme.spacing(3)
    },
    subTitle: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(8),
    },
    formControl: {
      marginBottom: theme.spacing(3),
      position: 'relative',
    },
    footer: {
      paddingTop: theme.spacing(6),
      flexDirection: 'column',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      '& .MuiButtonBase-root': {
        width: '100%',
      }
    },
    stepper: {
      position: 'sticky',
      top: theme.spacing(169/8),
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
      fontWeight: 700
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
      }
    },
    loader: {
      position: 'absolute',
      bottom: 8,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'none'
    },
    loaderIsVisible: {
      display: 'block',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
  }));

  const classes = useStyles();

  const { eventDefinitionNodes } = props.state;
  const indexesPerPage = process.env.REACT_APP_NEW_COVERAGE_INDEXES_PER_PAGE;

  const indexesPages = Paginate.getTotalPages(eventDefinitionNodes, indexesPerPage);

  return (
    <Box className={classes.root}>
      <form noValidate autoComplete="off">
        <Toolbar/>
        <ToolboxCoveragesNew activeStep={props.state.activeStep} start={props.handleSimulationStart}/>
        <Container maxWidth="sm" className={classes.stepper}>
          <CoveragesNewStepper steps={steps} activeStep={props.state.activeStep} />
        </Container>
        <Container maxWidth="sm">
          {/* Step #1 */}
          <div className={clsx( props.state.activeStep !== 0 && classes.hide)}>
            <Typography variant="h5" className={classes.title}>Data Sources</Typography>

            {/*Risk Main Type*/}
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <FormLabel htmlFor="risk-main-type">Risk Main Type</FormLabel>
              <Select
                native
                // defaultValue="---"
                value={props.state.riskMainType}
                onChange={props.handleSelectChange}
                inputProps={{
                  name: 'riskMainType',
                  id: 'risk-main-type',
                  'data-unlock': 'riskSubType',
                }}
                variant="outlined"
              >
                <option aria-label="None" value="---" disabled>---</option>
                {
                  props.state.riskMainTypeOptions.map(riskMainTypeOption => {
                    const { value, label } = riskMainTypeOption;

                    return <option key={value} value={value}>{label}</option>
                  })
                }
              </Select>
            </FormControl>
            {/*Risk Main Type./end*/}

            {/*Data Provider*/}
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <FormLabel htmlFor="data-provider">Data Provider</FormLabel>
              <Select
                native
                // defaultValue="---"
                value={props.state.dataProvider}
                disabled={props.state.dataProviderDisabled}
                open={props.state.dataProviderOpen}
                onChange={props.handleSelectChange}
                inputProps={{
                  name: 'dataProvider',
                  id: 'data-provider',
                }}
                variant="outlined"
                >
                <option aria-label="None" value="---" disabled>---</option>
                {
                  props.state.dataProviderNodes.map((option, index) => {
                    return <option value={option.id} key={index}>{option.name}</option>;
                  })
                }
              </Select>
            </FormControl>
            {/*Data Provider./end*/}

            <div className={classes.formControl}>
              <FormControl variant="standard" component="fieldset">
                <FormLabel component="legend">Data Set</FormLabel>
                <RadioGroup aria-label="Data Set" name="dataSet" onChange={props.onRadioChange}>
                  {
                    props.state.dataSetNodes.map((radio, index) => {
                      return <FormControlLabel value={radio.id} key={index} control={<Radio />} label={radio.name} />;
                    })
                  }
                </RadioGroup>
              </FormControl>
            </div>

            <FormControl variant="standard" component="fieldset" fullWidth>
              <FormLabel component="legend">Location</FormLabel>
                <FormControl fullWidth className={classes.formControl}>
                  <ComboBox
                    id='city'
                    name='city'
                    disabled={props.state.cityDisabled}
                    label="Monitoring Target"
                    onChange={props.handleComboBoxChange}
                    options={
                      props.state.cityNodes.map(city => {
                        return {
                          value: city.id,
                          name: city.name,
                        };
                      })
                    }
                  />
                </FormControl>
                {/* Design change by client */}
                {/* <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                      <InputLabel htmlFor="country">Country</InputLabel>
                      <Select
                        native
                        // value={state.age}
                        // onChange={handleChange}
                        label="Country"
                        inputProps={{
                          name: 'country',
                          id: 'country',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Thailand</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                  </Grid>
                </Grid> */}
                {/* Design change by client ./end */}
            </FormControl>

            {/* Disabled for further use */}
            {/* <FormControl fullWidth >
              <FormLabel>Coverage Map</FormLabel>
              <CoveragesNewMap/>
            </FormControl> */}
          </div>
          {/* Step #1 ./end*/}

          {/* Step #2 */}
          <div className={clsx( props.state.activeStep !== 1 && classes.hide)}>
            <Typography variant="h5" className={classes.title}>Indexes</Typography>
            {/* Index Definition */}
            <CardSelectList
              cards={Paginate.renderPage(eventDefinitionNodes, indexesPerPage, props.state.indexesPageActive).map((eventDefinition, index) => {

                const selected = props.state.eventDefinition === eventDefinition.id;

                return {
                  id: eventDefinition.id,
                  name: eventDefinition.triggerLabel,
                  description: eventDefinition.description,
                  selected: selected,
                }
              })}
              loaded={true}
              onCheckboxChange={props.onIndexDefinitionChange}
            />

            {/* Show pagination only if there are enought items to paginage*/}
            {
              eventDefinitionNodes.length > indexesPerPage ? (
                <Pagination
                  count={indexesPages}
                  onChange={props.onIndexPaginationChange}
                />
              ) : null
            }

            {/* Index Definition ./end */}
          </div>
          {/* Step #2 ./end*/}

          {/* Step #3 */}
          <div className={clsx( props.state.activeStep !== 2 && classes.hide)}>
            <Typography variant="h5" className={classes.title}>Define Payout Structure</Typography>
            <Typography varian="p" className={classes.subTitle}>Definition of the pay-out function used to calculate the loss for anyone given policy schedule.</Typography>
            <DrillDown
              riskPeriod={props}
              state={props.state}
              handleTextboxChange={props.handleTextboxChange}
              onAddPayoutStructure={props.onAddPayoutStructure}
              onPayoutStructureBack={props.onPayoutStructureBack}
              onPayoutStructureChange ={props.onPayoutStructureChange}
            />
          </div>
          {/* Step #3 ./end*/}

          {/* Step #4*/}
          <div className={clsx( props.state.activeStep !== 3 && classes.hide)}>
            <Typography variant="h5" className={classes.title}>Parametric Coverage Review</Typography>
            {/* Card: Data Sources */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Data Sources</Typography>
                {
                  props.state.editMode ? null : (
                    <Link
                      href="#!"
                      variant="body2"
                      onClick={() => {
                        props.setActiveStep(0)
                      }}>Edit
                    </Link>
                  )
                }
              </Box>
              <div className={classes.cardItem}>
                <Typography>Risk main type</Typography>
                <Typography align="right">{props.state.riskMainTypeUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Data provider</Typography>
                <Typography align="right">{props.state.dataProviderUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Data set</Typography>
                <Typography align="right">{props.state.dataSetUI}</Typography>
              </div>
              {/* <div className={classes.cardItem}>
                <Typography>Country</Typography>
                <Typography>Thailand</Typography>
              </div> */}
              <div className={classes.cardItem}>
                <Typography>Location</Typography>
                <Typography align="right">{props.state.cityUI}</Typography>
              </div>
            </div>
            {/* Card: Data Sources ./end*/}

            {/* Card: Indexes */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Indexes</Typography>
                {
                  props.state.editMode ? null : (
                    <Link href="#!"
                      variant="body2"
                      onClick={() => {
                        props.setActiveStep(1)
                      }}>Edit
                    </Link>
                  )
                }
              </Box>
              <div className={classes.cardItem}>
                <Typography>Event Definition</Typography>
                <Typography align="right">{props.state.eventDefinitionUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Coverage type</Typography>
                <Typography align="right">{props.state.coverageTypeUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography><Box component="span" fontWeight="fontWeightBold">Daily Coverage Range</Box></Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Coverage begins</Typography>
                <Typography align="right">{props.state.coverageBeginsUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Local coverage time</Typography>
                <Typography align="right">{props.state.localTimeCoverageUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Risk period starts</Typography>
                <Typography align="right">{props.state.riskPeriodFrom ? (`${props.state.riskPeriodFrom.substring(5, 7)}/${props.state.riskPeriodFrom.substring(0, 4)}`) : null}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Risk period ends</Typography>
                <Typography align="right">{props.state.riskPeriodTo ? (`${props.state.riskPeriodTo.substring(5, 7)}/${props.state.riskPeriodTo.substring(0, 4)}`) : null}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography><Box component="span" fontWeight="fontWeightBold">Payout Design</Box></Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Type</Typography>
                <Typography align="right">{props.state.payoutTypeUI}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Index unit</Typography>
                <Typography align="right">{props.state.indexUnit}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Index label</Typography>
                <Typography align="right">{props.state.triggerLabel}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Index description</Typography>
                <Typography align="right">{props.state.triggerDescription}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Index comparator</Typography>
                <Typography align="right">{props.state.triggerComparator}</Typography>
              </div>
            </div>
            {/* Card: Indexes ./end*/}

            {/* Card: Payouts */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Payouts</Typography>
                <Link href="#!"
                  variant="body2"
                  onClick={() => {
                    props.setActiveStep(2)
                  }}>Edit
                </Link>
              </Box>
              <div className={classes.cardItem}>
                <Typography>Payout amount</Typography>
                <Typography align="right">{props.state.payoutAmount ? `${props.state.payoutAmount}%` : '---'}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Payout per {props.state.indexUnit}</Typography>
                <Typography align="right">{props.state.payoutPerUnitAmount ? `${props.state.payoutPerUnitAmount}%` : '---'}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Trigger point</Typography>
                <Typography align="right">{props.state.trigger} {props.state.indexUnit}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Risk period</Typography>
                <Typography align="right">{Time.getDate(props.state.riskPeriodFrom, locale)} - {Time.getDate(props.state.riskPeriodTo, locale)}</Typography>
              </div>

            </div>
            {/* Card: Payouts ./end*/}
          </div>
          {/* Step #4 ./end*/}

          <Grid container className={classes.footer} spacing={2}>
            <Grid item>
              <div className={clsx( props.state.activeStep === 0 && classes.hide)}>
                <ButtonRound onClick={props.handleBack} disabled={props.state.prevLocked} startIcon={<ArrowBackIcon/>}>Back</ButtonRound>
              </div>
            </Grid>
            <Grid item>
              <div className={clsx( props.state.activeStep === steps.length - 1 && classes.hide)}>
                <ButtonRound onClick={props.handleNext} disabled={props.state.nextLocked} endIcon={<ArrowForwardIcon/>}>Next</ButtonRound>
              </div>
            </Grid>
          </Grid>
        </Container>
      </form>
      <Backdrop className={classes.backdrop} open={props.state.backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default CoveragesNew;
