import { useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import Skeleton from '@mui/material/Skeleton';

// Datepicker
import DatePicker from 'react-datepicker';

import ContextTheme from '../../Contexts/Theme';
import Time from '../../Util/time';

const PeriodMonths = props => {
  const startDate = new Date(props.from);
  const endDate = new Date(props.to);
  const { locale } = useContext(ContextTheme);
  const disabledDates = [];
  const disabledDatesStartYear = 2000;
  const disabledDatesEndYear = 2050;

  // Iterate over the disabled period and disabled February 29th if it's a leap
  // year.
  for (let i=0; i <= disabledDatesEndYear - disabledDatesStartYear; i++) {
    if (Time.isLeapYear(disabledDatesStartYear + i)) {
      disabledDates.push(new Date(disabledDatesStartYear + i, 1, 29));
    }
  }

  return (
    <div>
      { props.loaded ? (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <DatePicker
              selected={startDate}
              onChange={props.onChangeFrom}
              startDate={startDate}
              endDate={endDate}
              selectsStart={!props.disabled}
              locale={locale}
              excludeDates={disabledDates}
              inline
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              selected={endDate}
              onChange={props.onChangeTo}
              selectsEnd={!props.disabled}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale={locale}
              excludeDates={disabledDates}
              inline
            />
          </Grid>
        </Grid>
      ) : (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" width={'100%'} height={128}/>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" width={'100%'} height={128}/>
            </Grid>
          </Grid>
      ) }
    </div>
  );
};

export default PeriodMonths;
