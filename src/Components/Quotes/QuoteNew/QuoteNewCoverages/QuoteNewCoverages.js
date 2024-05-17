import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { get, useFormContext, useWatch } from 'react-hook-form';
import Pagination from '@mui/material/Pagination';
import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete';
import { useQuery } from '@tanstack/react-query';

import QuotesCoverage from '../../QuotesCoverages/QuotesCoverage';
import Paginate from '../../../../Util/paginate';
import Ajax, { GetToken } from '../../../../Util/ajax';

const QuoteNewCoveragesQuery = 'QuoteNewLocation-coverages';

const QuoteNewCoverages = () => {
  const { getValues, setValue } = useFormContext();
  const [location, setLocation] = useState({ lat: undefined, long: undefined });
  const coveragesSelected = useWatch({
    name: 'coveragesSelected',
    exact: true,
  });
  const coveragesUnSelected = useWatch({
    name: 'coveragesUnSelected',
    exact: true,
  });
  const coveragesUnSelectedStage = useWatch({
    name: 'coveragesUnSelectedStage',
    exact: true,
  });
  const coveragesUnSelectedStagePage = useWatch({
    name: 'coveragesUnSelectedStagePage',
    exact: true,
  });
  const selectionType = useWatch({
    name: 'selectionType',
    exact: true,
  });
  const defaultSIperUnit = useWatch({
    name: 'defaultSIperUnit',
    exact: true,
  });
  const country = useWatch({ name: 'country', exact: true });
  const targetId = getValues('targetId');
  const useStyles = makeStyles((theme) => ({
    title: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: theme.spacing(10 / 8),
    },
    description: {
      fontSize: 14,
      fontWeight: 400,
      marginBottom: theme.spacing(8),
    },
    subtitle: {
      fontWeight: 700,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 44,
      marginBottom: theme.spacing(1),
    },
    pagination: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      '& > ul': {
        justifyContent: 'flex-end',
      }
    },
    item: {
      marginBottom: theme.spacing(1),
    },
    addressInputContainer: {
      marginBottom: theme.spacing(6),
    },
    addressInput: {
      marginTop: theme.spacing(1),
    },
    link: {
      color: '#3182CE',
    }
  }));
  const classes = useStyles();
  const apiKey = window.appConfig.geoapify.api.key;
  const showAddressInput = selectionType === 'other';
  
  
  useQuery({
    queryKey: [QuoteNewCoveragesQuery, targetId, showAddressInput, location],
    queryFn: async () => {
      setValue('backdropOpen', true);
      const token = await GetToken();
      const API_URL = !showAddressInput
        ? `${window.appConfig.apiUrl}/internal/coverages?targetId=${targetId}&page=0&size=10000`
        : `${window.appConfig.apiUrl}/internal/coverages/find-by-location?lat=${location.lat.toFixed(2)}&lon=${location.long.toFixed(2)}`;
      const data = await Ajax.getData(
        API_URL,
        token,
      );
      
      const coverages = !showAddressInput ? (data?.content ?? []) : data;
      if (coverages?.length) {
        const coveragesConvert = coverages.map((coverage, index) => {
          const { limit, minPayout, riskType } = coverage;
          
          const payoutValue = minPayout.amount;
          const payoutCurrency = minPayout.currency;
          const limitValue = limit.amount;
          const limitCurrency = limit.currency;
          const splitedRiskType = riskType.split('>');
          const coverageName = splitedRiskType[splitedRiskType.length - 1] + ' Stress Cover';
          return {
            ...coverage,
            quantity: 1, // default value
            sumInsuredIndividual: defaultSIperUnit, // default value
            sumInsured: 1 * defaultSIperUnit,
            name: coverageName,
            minPayout: {
              value: payoutValue,
              currency: payoutCurrency,
            },
            limit: {
              value: limitValue,
              currency: limitCurrency,
            },
          };
        });
        setValue('formHasChanged', true);
        setValue('coveragesSelected', coveragesConvert);
      }
      setValue('backdropOpen', false);
      return coverages;
    },
    refetchOnWindowFocus: false,
    enabled: !!targetId || (showAddressInput && location.lat !== undefined && location.long !== undefined),
  });
  
  const onAddressChange = (value) => {
    if (value === null) {
      setLocation({ lat: undefined, long: undefined });
      setValue('coveragesSelected', []);
    } else {
      const latValue = get(value, 'properties.lat');
      const lonValue = get(value, 'properties.lon');
      const postcode = get(value, 'properties.postcode');
      const city = get(value, 'properties.city');
      setValue('postcode', postcode);
      setValue('city', city);
      setLocation({ lat: latValue, long: lonValue });
    }
  };
  
  const getNumbersOfCoverages = () => {
    const coveragesLength = coveragesUnSelected.length + coveragesSelected.length;
    if (!coveragesLength) {
      return 'No coverages found';
    }
    return `${coveragesLength} coverage${
      coveragesLength > 1 ? 's' : ''
    } found`;
  };
  
  const getNumbersOfSelectedCoverages = () => {
    if (!coveragesSelected.length) {
      return 'No coverages selected';
    }
    return `${coveragesSelected.length} coverage${
      coveragesSelected.length > 1 ? 's' : ''
    } selected`;
  };
  
  const handleCoveragesUnselectedListPageChange = (event, value) => {
    setValue('coveragesUnSelectedStage', Paginate.renderPage(coveragesUnSelected, 10, value));
    setValue('coveragesUnSelectedStagePage', value);
  }

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Coverages
      </Typography>
      <Typography className={classes.description}>
        Select the coverage(s) you would like to be included in the quotation.
      </Typography>
      {showAddressInput && (
        <div className={classes.addressInputContainer}>
          <Typography className={classes.subtitle}>
            Search by Coverages
          </Typography>
          <GeoapifyContext apiKey={apiKey}>
            <Typography className={classes.addressInput} component="div">
              <GeoapifyGeocoderAutocomplete
                filterByCountryCode={[country?.slice(0, 2)?.toLowerCase()]}
                position={{ lat: location.lat, lon: location.long }}
                placeSelect={onAddressChange}
                placeholder="Search by location, district or sub-district"
                disabled={true}
              />
            </Typography>
          </GeoapifyContext>
        </div>
      )}
      <div className={classes.header}>
        <Typography className={classes.subtitle}>
          {getNumbersOfCoverages()}
        </Typography>
        <Typography><a href='#' className={classes.link}>Can’t find a coverage?</a></Typography>
      </div>
      <ul className={classes.list}>
        {coveragesUnSelected.map((coverageUnSelected, index) => {
          const {
            trigger,
            triggerUnit,
            triggerLabel,
            indexDefinition,
            minPayout,
            limit,
            description,
            dataSet,
            start,
            end,
            createdBy,
            createdAt,
            id,
          } = coverageUnSelected;
          
          const onCoverageCheckboxChange = () => {
            const currentUnselectedCoverages = getValues('coveragesUnSelected');
            const currentSelectedCoverages = getValues('coveragesSelected');
            
            currentUnselectedCoverages.splice(index, 1);
            setValue('coveragesUnSelected', currentUnselectedCoverages);
            setValue('coveragesUnSelectedStage', Paginate.renderPage(currentUnselectedCoverages, 10, 1));
            setValue('coveragesUnSelectedStagePage', 1);
            setValue('coveragesSelected', [...currentSelectedCoverages, coverageUnSelected]);
            setValue('formHasChanged', true);
          };
          
          return (
            <li key={id} className={classes.item}>
              <QuotesCoverage
                key={id}
                id={id}
                title={indexDefinition}
                description={description}
                dataSet={dataSet}
                limit={[limit.value, limit.currency]}
                trigger={trigger}
                triggerUnit={triggerUnit}
                triggerLabel={triggerLabel}
                payout={[minPayout.value, minPayout.currency]}
                onCoverageCheckboxChange={onCoverageCheckboxChange}
                start={start}
                end={end}
                createdBy={createdBy}
                createdAt={createdAt}
                selected={false}
              />
            </li>
          );
        })}
      </ul>
      <Pagination
        className={classes.pagination}
        count={Paginate.getTotalPages(coveragesUnSelectedStage, 10)}
        page={coveragesUnSelectedStagePage}
        color="primary"
        onChange={handleCoveragesUnselectedListPageChange} />
      <header className={classes.header}>
        <Typography className={classes.subtitle}>
          {getNumbersOfSelectedCoverages()}
        </Typography>
      </header>
      <ul className={classes.list}>
        {coveragesSelected.map((coverageSelected, index) => {
          const {
            trigger,
            triggerUnit,
            triggerLabel,
            minPayout,
            limit,
            indexDefinition,
            description,
            dataSet,
            start,
            end,
            createdBy,
            createdAt,
            id,
          } = coverageSelected;

          const onCoverageCheckboxChange = () => {
            const currentUnselectedCoverages = getValues('coveragesUnSelected');
            const currentSelectedCoverages = getValues('coveragesSelected');
            const coveragesUnSelected = [...currentUnselectedCoverages, coverageSelected];
            
            currentSelectedCoverages.splice(index, 1);
            setValue('coveragesSelected', currentSelectedCoverages);
            setValue('coveragesUnSelected', coveragesUnSelected);
            setValue('coveragesUnSelectedStage', Paginate.renderPage(coveragesUnSelected, 10, 1));
            setValue('coveragesUnSelectedStagePage', 1);
            setValue('formHasChanged', true);
          };

          return (
            <li key={id} className={classes.item}>
              <QuotesCoverage
                key={id}
                id={id}
                title={indexDefinition}
                description={description}
                dataSet={dataSet}
                limit={[limit.value, limit.currency]}
                trigger={trigger}
                triggerUnit={triggerUnit}
                triggerLabel={triggerLabel}
                payout={[minPayout.value, minPayout.currency]}
                onCoverageCheckboxChange={onCoverageCheckboxChange}
                start={start}
                end={end}
                createdBy={createdBy}
                createdAt={createdAt}
                selected={true}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuoteNewCoverages;
