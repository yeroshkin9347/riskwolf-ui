
import React, { useEffect } from 'react';
import get from 'lodash/get';
import makeStyles from '@mui/styles/makeStyles';

import Format from '../../Util/format';

import { Box, Container, Typography, FormLabel, Link } from '@mui/material';
import { ButtonRound } from '../Buttons/Buttons';
import clsx from 'clsx';

import Autocomplete from '@mui/material/Autocomplete';
import Backdrop from '@mui/material/Backdrop';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Unstable_Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import PeriodMonths from '../PeriodMonths/PeriodMonths';
import QuotesNewAddCustomerModal from './QuotesModals/QuotesNewAddCustomerModal';
import QuotesNewStepper from './QuotesNewStepper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextboxPopup from '../Form/Inputs/TexboxPopup/TextboxPopup';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ToolboxQuotesNew from '../Toolbox/ToolboxQuotesNew';
import QuotesCoveragesList from './QuotesCoverages/QuotesCoveragesList';
import QuotesNewStack from './QuotesNewStack';
import TextboxSearchLoading from '../Form/Inputs/TextboxSearchLoading/TextboxSearchLoading';

import CardSelectList from '../../Components/Form/Checkboxes/CardSelect/CardSelectList';

// Geoapify
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

// Styles
import { FormControl as formControl } from '../../Styles/Components/Forms';
import { List as list} from '../../Styles/Base/Page';
import { Slider as slider } from '../../Styles/Components/Sliders';

const QuotesNew = props => {
  const steps = [
    'Basics',
    'Coverages',
    'Customization',
    'Terms',
    'Review',
  ];

  const apiKey = window.appConfig.geoapify.api.key;

  const {
    activeStep,
    setActiveStep,
    totalSteps,
    // New Customer
    newCustomerInputFields,
    newCustomerIsLoading,
    onNewCustomerInputBlur,
    onNewCustomerInputChange,
    onNewCustomerSubmit,
    // Basic information
    onQuoteNameChange,
    quoteName,
    customerSearchTerm,
    customerSearchLoading,
    customerSearchTermSelected,
    customerFound,
    customerSearchResults,
    customerSearchDropdownOpen,
    // Insurance
    onInsuranceCheckboxChange,
    insureOptions,
    insureOptionsLoaded,
    // Quote
    onQuoteSave,
    // Coverages
    coveragesRiskTypes,
    coveragesSearchDisabled,
    onCoveragesRiskTypeChange,
    onLocationSearchChange,
    onSearchByCoverageChange,
    coveragesLocationSearchTerm,
    coveragesLocationSearchLoading,
    coveragesSearchResults,
    coveragesStagePage,
    coveragesStage,
    coverages,
    coveragesSelected,
    onCoverageCheckboxChange,
    coveragesSearchByAddress,
    coveragesSearchByCoverage,
    // Customization,
    onPremiumInsuredNumberChange,
    onCohortNameChange,
    onSumInsuredIndividualChange,
    totalSumInsured,
    // Exclusions
    onExclusionCheckboxChange,
    onExlusionOtherChange,
    exclusionStageCheckboxes,
    exclusionStageText,
    // Review,
    commission,
    onHandleCommisionChange,
    // UI
    modalUserCreateOpen,
    snackbarOpen,
    snackbarMessage,
    onSnackbarClose,
    formHasChanged,
    // -- rest --
    onCustomerSearchChange,
    onCustomerSearchClear,
    onCheckboxChange,
    onModalUserNewToggle,
    onModalUserNewClose,
    onCustomerSelect,
    onCustomerSearchDropdownClose,
    onCoveragesListPageChange,
    onCompleteQuotation } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6)
    },
    title: {
      marginBottom: theme.spacing(3)
    },
    formControl: formControl,
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
    list: list(),
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
    divider: {
      opacity: 0.15,
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
      display: 'none'
    },
    loaderIsVisible: {
      display: 'block',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1000,
      color: '#fff',
    },
    toolbox: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  // Min and max values for the slider.
  const marks = [
    {
      value: 5,
      label: '5%',
    },
    {
      value: 30,
      label: '30%',
    },
  ];

  return (
    <Box className={classes.root}>
      <form noValidate autoComplete="off">
        <Toolbar/>
        <ToolboxQuotesNew activeStep={activeStep} totalSteps={totalSteps} onQuoteSave={onQuoteSave} saveEnabled={formHasChanged} onCompleteQuotation={onCompleteQuotation}/>
        <Container maxWidth="sm" className={classes.stepper}>
          <QuotesNewStepper steps={steps} activeStep={activeStep} />
        </Container>
        <Container maxWidth="sm">
          {/* Step #1 [Basics] */}
          <div className={clsx( activeStep !== 0 && classes.hide)}>
            <Typography variant="h5" className={classes.title}>Basic Information</Typography>

            {/* Quote Name */}
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <FormLabel htmlFor="risk-main-type" required>Quote Name</FormLabel>
              <TextField
                value={quoteName}
                defaultValue={quoteName}
                onChange={onQuoteNameChange}
                id="quote-name"
                name="quoteName" />
            </FormControl>
            {/* Quote Name ./end*/}

            {/*Customer Name*/}
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <FormLabel htmlFor="risk-main-type" required>Customer name</FormLabel>
              <TextboxPopup
                searchLoading={customerSearchLoading}
                onModalUserNewToggle={onModalUserNewToggle}
                searchTerm={customerSearchTerm}
                searchTermSelected={customerSearchTermSelected}
                found={customerFound}
                searchResults={customerSearchResults}
                dropdownOpen={customerSearchDropdownOpen}
                onItemSelect={onCustomerSelect}
                onInputClear={onCustomerSearchClear}
                onDropdownClose={onCustomerSearchDropdownClose}
                onCustomerSearchChange={onCustomerSearchChange}/>
            </FormControl>
            {/*Customer Name./end*/}

            <Typography variant="h5" className={classes.title}>What do you want to insure? <sup>*</sup></Typography>

            <CardSelectList cards={insureOptions} loaded={insureOptionsLoaded} onCheckboxChange={onInsuranceCheckboxChange}/>

          </div>
          {/* Step #1 [Basics] ./end*/}

          {/* Step #2 [Coverages] */}
          <div className={clsx( activeStep !== 1 && classes.hide)}>
            <Typography variant="h5" className={classes.title}>Coverages</Typography>
            <Box color="text.secondary" mb={5}>
              <Typography color="inherit">Selct the coverage(s) you would like to be included in the quotation.</Typography>
            </Box>

            {/* Trigger & Payout*/}
            {/* @TODO: Remove when cleaning up */}
            {/* Temporarily hidden */}
            {/*
            <FormControl component="fieldset" fullWidth>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="trigger">Trigger</InputLabel>
                    <Select
                      native
                      // value={state.age}
                      // onChange={handleChange}
                      label="Trigger"
                      inputProps={{
                        name: 'trigger',
                        id: 'trigger',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="12:00">&gt; 2hrs</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="payout">Payout</InputLabel>
                    <Select
                      native
                      // value={state.age}
                      // onChange={handleChange}
                      label="payout"
                      inputProps={{
                        name: 'payout',
                        id: 'payout',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="12:00">$150k - $200k</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </FormControl>
            */}
            {/* Temporarily hidden ./end*/}
            {/* Trigger & Payout ./end*/}

            {/* Location Search */}
            <FormControl
              fullWidth
              className={classes.formControl}
            >
              <FormLabel htmlFor="search-location">
                <Typography variant="h6">Location search</Typography>
              </FormLabel>

              <FormControl variant="standard" component="fieldset" className={classes.toolbox}>
                <RadioGroup aria-label="Data Set" name="coveragesSearchByCoverage" onChange={props.handleRadioChange} >
                  <FormControlLabel
                    value="1"
                    key="1"
                    control={
                      <Radio color="secondary" checked={coveragesSearchByCoverage}/>
                    }
                    label="Search by Coverage" />
                </RadioGroup>
                <RadioGroup aria-label="Data Set" name="coveragesSearchByAddress" onChange={props.handleRadioChange} >
                  <FormControlLabel
                    value="1"
                    key="1"
                    control={
                      <Radio color="secondary" checked={coveragesSearchByAddress} />
                    }
                    label="Search by Address" />
                </RadioGroup>
              </FormControl>


              { coveragesSearchByCoverage && (
                <>
                  {/* Filtering */}
                  <Box mb={2}>
                    <Typography color="inherit" variant="h6" mb={2}>Filtering</Typography>
                  </Box>
                  <FormControl className={classes.formControl} fullWidth>
                     <InputLabel htmlFor="risk-type">Risk Type</InputLabel>
                     <Select
                       native
                       label="Risk Type"
                       onChange={onCoveragesRiskTypeChange}
                       defaultValue=""
                       inputProps={{
                         name: 'riskType',
                         id: 'risk-type',
                       }}
                     >
                      <option aria-label="None" value="" disabled/>
                      {
                        coveragesRiskTypes.map(option => {
                          return <option key={option.id} value={option.id}>{option.name}</option>
                        })
                      }
                    </Select>
                  </FormControl>
                  {/* Filtering ./end */}
                  <TextboxSearchLoading
                    onChange={onLocationSearchChange}
                    placeholder="Search by coverage"
                    value={coveragesLocationSearchTerm}
                    loading={coveragesLocationSearchLoading}
                    disabled={coveragesSearchDisabled}
                  />
                </>
              ) }

              { coveragesSearchByAddress && (
                <GeoapifyContext apiKey={apiKey}>
                  <Typography component='div'>
                    <GeoapifyGeocoderAutocomplete
                      placeSelect={onSearchByCoverageChange}
                      placeholder="Search by location, district or sub-district"
                      // suggestionsChange={onSuggectionChange}
                      disabled={true}
                    />
                  </Typography>
                </GeoapifyContext>
              )}

            </FormControl>
            {/* Location Search ./end */}

            {/*CoveragesList*/}
            <QuotesCoveragesList
              onCoverageCheckboxChange={onCoverageCheckboxChange}
              loading={coveragesLocationSearchLoading}
              coverages={coveragesStage}
              coveragesSelected={coveragesSelected}
              totalCoverages={coverages}
              onCoveragesListPageChange={onCoveragesListPageChange}
              page={coveragesStagePage}/>
            {/*CoveragesList ./end */}
          </div>
          {/* Step #2 [Coverages] ./end*/}

          {/* Step #3 [Customization] */}
          <div className={clsx( activeStep !== 2 && classes.hide)}>
            <Typography variant="h5">Customizations</Typography>

            <Box mb={2}>
              {/* Stack */}
              {
                coveragesSelected.map((coverage, index) => {
                  const {
                    id,
                    title,
                    trigger,
                    minPayout,
                    name,
                    quantity,
                    sumInsuredIndividual,
                    sumInsured,
                    limit} = coverage;

                  return (
                    <QuotesNewStack id={id}
                      key={id}
                      title={title}
                      payoutValue={minPayout.value}
                      payoutCurrency={minPayout.currency}
                      limitValue={limit.value}
                      limitCurrency={limit.currency}
                      onPremiumInsuredNumberChange={onPremiumInsuredNumberChange}
                      onCohortNameChange={onCohortNameChange}
                      onSumInsuredIndividualChange={onSumInsuredIndividualChange}
                      cohortName={name}
                      numberOfInsured={quantity}
                      sumInsuredIndividual={sumInsuredIndividual}
                      sumInsured={sumInsured}
                      trigger={trigger}/>
                  );
                })
              }
              {/* Stack ./end */}
            </Box>

            <footer>
              <Box className={classes.row}>
                <Box className={classes.spread}>
                  <Typography>Total Sum Insured (TSI)</Typography>
                </Box>
                <Box className={classes.spread}>
                  <Typography>{Format.currency(totalSumInsured, coveragesSelected.length ? coveragesSelected[0].minPayout.currency : 'EUR')}</Typography>
                </Box>
              </Box>
            </footer>
          </div>
          {/* Step #3 [Customization] ./end*/}

          {/* Step #4 [Terms] */}
          <div className={clsx( activeStep !== 3 && classes.hide)}>
          {/*
            ==========================================================
            Temporarily removed as it's missing in v1.1 of the design:
            ==========================================================

              <Box className={classes.stack} mb={3}>
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom>Limits</Typography>
                </Box>
                <Box className={classes.row} pb={3}>
                  <Box className={classes.spread}>
                    <Typography>Aggregated limit</Typography>
                  </Box>
                  <Box className={classes.spreadAside}>
                    <TextField
                      // onChange={event => {
                      //   handleInputChange(event);
                      // }}
                      // placeholder="i.e. Landline Bangkok"
                      id="cohort-name"
                      name="cohortName"
                      variant="outlined"
                      autoFocus={true}
                      // value={searchValue}
                      // key={props.state.insuredAmount}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">USD$</InputAdornment>
                      }}
                      // inputProps={{
                      //   defaultValue: props.state.insuredAmount ? props.state.insuredAmount : null,
                      //   placeholder: props.state.insuredAmount ? null : '---'
                      // }}
                      />
                  </Box>
                </Box>
              </Box>
          */}
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>Exclusions</Typography>
            </Box>

            <Box mb={4}>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      onChange={(event) => onExclusionCheckboxChange(event)}
                      name="nuclear"
                      value="Nuclear radiation or radioactive contamination, all whether controlled or uncontrolled."
                      color="primary"
                    />
                  }
                  label="Nuclear radiation or radioactive contamination, all whether controlled or uncontrolled."
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => onExclusionCheckboxChange(event)}
                      name="hostilities"
                      value="Foreign enemies, hostilities (whether war be declared or not)"
                      color="primary"
                    />
                  }
                  label="Foreign enemies, hostilities (whether war be declared or not)"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => onExclusionCheckboxChange(event)}
                      name="war§"
                      color="primary"
                      value="Civil war, rebellion, revolution, insurrection, military, or usurped power"
                    />
                  }
                  label="Civil war, rebellion, revolution, insurrection, military, or usurped power"
                />
              </Box>
            </Box>


            <InputLabel htmlFor="exclusions">
              Further remarks
            </InputLabel>

            <TextField
              onChange={event => onExlusionOtherChange(event)}
              id="exclusions"
              name="exclusions"
              multiline
              fullWidth
              minRows={4}
              // value={searchValue}
              // key={props.state.insuredAmount}
              // inputProps={{
              //   defaultValue: props.state.insuredAmount ? props.state.insuredAmount : null,
              //   placeholder: props.state.insuredAmount ? null : '---'
              // }}
              />


          </div>
          {/* Step #4 [Terms] ./end*/}

          {/* Step #5 [Review] */}
          <div className={clsx( activeStep !== 4 && classes.hide)}>
            <Box mb={4}>
              <Typography variant="h5" className={classes.title}>Quotation commission
              </Typography>
              <Typography gutterBottom>Adjust the commission that can be gained from the sale of this quotation.</Typography>
            </Box>

            {/* Slider */}
            <Box mb={6}>
              <div className={classes.slider}>
                <FormControl
                  // className={classes.formControl}
                >
                  <TextField
                    id="commission"
                    name="commission"
                    value={`${(commission * 100).toFixed(1)}`}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>
                    }}

                  />
                </FormControl>

                <Slider
                  value={commission}
                  aria-labelledby="commission"
                  min={0.005}
                  max={0.3}
                  step={0.005}
                  size="small"
                  marks={marks}
                  valueLabelDisplay="on"
                  valueLabelFormat={`${(commission * 100).toFixed(1)}%`}
                  onChange={onHandleCommisionChange}
                  // onChange={props.handleSliderChange}
                />
              </div>
            </Box>
            {/* Slider ./end */}

            <Box mb={6}>
              <Typography variant="h5" className={classes.title}>Review quotation summary</Typography>
            </Box>

            {/* Card: Basic information */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Basic Information</Typography>
                {
                  props.editMode ? null : (
                    <Link
                      href="#!"
                      variant="body2"
                      onClick={() => {
                        setActiveStep(0)
                      }}>Edit
                    </Link>
                  )
                }
              </Box>
              {/*
                =====================================
                Not sure if this one is needed or not
                =====================================
                <div className={classes.cardItem}>
                  <Typography>Insurance company</Typography>
                  <Typography align="right">Advanced Info Service (AIS)</Typography>
                </div>
              */}
              <div className={classes.cardItem}>
                <Typography>Quote name</Typography>
                <Typography align="right">{quoteName}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Customer name</Typography>
                <Typography align="right">{customerSearchTermSelected}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Basis of sum insured</Typography>
                <Typography align="right">{
                  // Find the selected option in a list of insure options and
                  // then render it. There should be only one selected.
                  insureOptions
                    .filter(option => option.selected === true)
                    .map(option => option.name)
                 }</Typography>
              </div>
            </div>
            {/* Card: Basic information ./end*/}

            {/* Card: Premiums */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Premiums</Typography>
                {
                  props.editMode ? null : (
                    <Link href="#!"
                      variant="body2"
                      onClick={() => {
                        props.setActiveStep(2)
                      }}>Edit
                    </Link>
                  )
                }
              </Box>
              <div className={classes.cardItem}>
                <Typography>Currency</Typography>
                <Typography align="right">{get(coveragesSelected, '[0].minPayout.currency')}</Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>Total Sum Insured</Typography>
                <Typography align="right">{Format.currency(totalSumInsured, coveragesSelected.length ? coveragesSelected[0].minPayout.currency : 'EUR')}</Typography>
              </div>
              {/*
                ===============================================================
                Not sure what needs to go here. It's been disabled until client
                provides more information.
                ===============================================================
                <div className={classes.cardItem}>
                  <Typography>Gross Premium Amount</Typography>
                  <Typography align="right">$12,000.00</Typography>
                </div>
                <div className={classes.cardItem}>
                  <Typography>U/W Loading / Discount</Typography>
                  <Typography align="right">$5,000.00</Typography>
                </div>
              */}

            </div>
            {/* Card: Premiums ./end*/}

            {/* Card: Coverages */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Coverages</Typography>
                <Link href="#!"
                  variant="body2"
                  onClick={() => {
                    props.setActiveStep(1)
                  }}>Edit
                </Link>
              </Box>

              {
                coveragesSelected.map((coverage, index) => {
                  const {
                    id,
                    title,
                    trigger,
                    minPayout,
                    quantity,
                    name,
                    sumInsured,
                    sumInsuredIndividual } = coverage;

                  const coveragesSelectedLen = coveragesSelected.length;

                  return (
                    <div key={id}>
                      <div className={classes.cardItem}>
                        <Typography>
                          <Box component="span" fontWeight="fontWeightBold">{title}</Box>
                        </Typography>
                      </div>
                      <div className={classes.cardItem}>
                        <Typography>Cohort name</Typography>
                        <Typography align="right">{name}</Typography>
                      </div>
                      <div className={classes.cardItem}>
                        <Typography>Trigger</Typography>
                        <Typography align="right">{trigger}</Typography>
                      </div>
                      <div className={classes.cardItem}>
                        <Typography>Sum insured individual</Typography>
                        <Typography align="right">{Format.currency(sumInsuredIndividual, minPayout.currency || 'EUR')}</Typography>
                      </div>
                      <div className={classes.cardItem}>
                        <Typography>Quantity</Typography>
                        <Typography align="right">{Format.number(quantity)}</Typography>
                      </div>
                      <div className={classes.cardItem}>
                        <Typography>Sum insured</Typography>
                        <Typography align="right">{Format.currency(sumInsured, minPayout.currency || 'EUR')}</Typography>
                      </div>
                      <div className={classes.cardItem}>
                        <Typography>Payout</Typography>
                        <Typography align="right">({minPayout.value}%) {Format.currency(minPayout.value * 0.01 * sumInsuredIndividual * quantity, minPayout.currency ? minPayout.currency : 'EUR')}</Typography>
                      </div>

                      {/* Render horizontal rule only if not last item */}
                      { coveragesSelectedLen - 1 !== index ? <hr className={classes.divider}/> : null}
                    </div>
                  );
                })
              }
            </div>
            {/* Card: Coverages ./end*/}

            {/* Card: Terms */}
            <div className={classes.card}>
              <Box className={classes.stripe}>
                <Typography variant="h6" className={classes.stripeTitle}>Quotation Terms</Typography>
                <Link href="#!"
                  variant="body2"
                  onClick={() => {
                    props.setActiveStep(3)
                  }}>Edit
                </Link>
              </Box>
              {/*
              ================================================
              Disabled as per client's request - missing data.
              ================================================
              <Box mb={2}>
                <div className={classes.cardItem}>
                  <Typography>
                    <Box component="span" fontWeight="fontWeightBold">Limits</Box>
                  </Typography>
                </div>
                <div className={classes.cardItem}>
                  <Typography>Aggregrated limit</Typography>
                  <Typography align="right">2.56%</Typography>
                </div>
                <div className={classes.cardItem}>
                  <Typography>Waiting time</Typography>
                  <Typography align="right">4 hours</Typography>
                </div>
                <div className={classes.cardItem}>
                  <Typography>Payout</Typography>
                  <Typography align="right">$50</Typography>
                </div>
                <div className={classes.cardItem}>
                  <Typography>Quantity</Typography>
                  <Typography align="right">10,000</Typography>
                </div>
              </Box>
              */}
              <div className={classes.cardItem}>
                <Typography>
                  <Box component="span" fontWeight="fontWeightBold">Excluded from quotation</Box>
                </Typography>
              </div>
              <div className={classes.cardItem}>
                <Typography>
                  <ul className={classes.list}>
                    {
                      exclusionStageCheckboxes.map((exclusionStageCheckbox, index) => {
                        return <li key={index}>{exclusionStageCheckbox}</li>;
                      })
                    }
                    { exclusionStageText ? <li dangerouslySetInnerHTML={{__html: exclusionStageText.replace(/(?:\r\n|\r|\n)/g, '<br>')}}></li> : null }
                  </ul>
                </Typography>
              </div>
            </div>
            {/* Card: Terms ./end*/}
          </div>
          {/* Step #5 [Review] ./end*/}

          <Grid container className={classes.footer} spacing={2}>
            <Grid item>
              <div className={clsx( activeStep === 0 && classes.hide)}>
                <ButtonRound onClick={props.handleBack} disabled={props.prevLocked} startIcon={<ArrowBackIcon/>}>Back</ButtonRound>
              </div>
            </Grid>
            <Grid item>
              <div className={clsx( activeStep === steps.length - 1 && classes.hide)}>
                <ButtonRound onClick={props.handleNext} disabled={props.nextLocked} endIcon={<ArrowForwardIcon/>}>Next</ButtonRound>
              </div>
            </Grid>
          </Grid>
        </Container>
      </form>
      <Backdrop className={classes.backdrop} open={props.backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <QuotesNewAddCustomerModal
        isLoading={newCustomerIsLoading}
        inputFields={newCustomerInputFields}
        open={modalUserCreateOpen}

        onInputChange={onNewCustomerInputChange}
        onInputBlur={onNewCustomerInputBlur}
        onSubmit={onNewCustomerSubmit}
        onCustomerSelect={onCustomerSelect}

        onModalUserNewToggle={onModalUserNewToggle}
        onModalUserNewClose={onModalUserNewClose}
      />
      {/* Modals ./end*/}

      {/* Snackbars */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={onSnackbarClose}>
        <MuiAlert onClose={onSnackbarClose} severity="success" elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      {/* Snackbars ./end */}
    </Box>
  );
}

export default QuotesNew;
