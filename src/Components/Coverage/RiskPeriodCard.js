import makeStyles from '@mui/styles/makeStyles';
import { Box, Typography, Stack } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  date: {
    fontSize: 24,
    fontWeight: 700,
  },
  iconContainer: {
    minWidth: 78,
    minHeight: 78,
    borderRadius: 40,
    border: '1px solid #00000026',
  },
  dateRangeIcon: {
    fontSize: 36,
    color: 'black',
  }
}))

const RiskPeriodCard = ({start, end}) => {
  const classes = useStyles();
  
  const currentYear = new Date().getFullYear();
  const startDate = start ? new Date(start) : new Date();
  const endDate = start ? new Date(end) : new Date();

  const startDateString = useMemo(() => currentYear === startDate?.getFullYear() ? dayjs(startDate).format('DD-MMM') : dayjs(startDate).format("DD-MMM'YY"), [startDate])
  const endDateString = useMemo(() => currentYear === endDate?.getFullYear() ? dayjs(endDate).format('DD-MMM YYYY') : dayjs(endDate).format("DD-MMM'YY"), [endDate])

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>Risk Period</Typography>
      <Stack direction="row" alignItems="flex-end" gap={2} sx={{mt: 1}}>
        <Typography variant="h4" className={classes.date}>
          {startDateString} to {endDateString}
        </Typography>
        <Stack alignItems="center" justifyContent="center" className={classes.iconContainer}>
          <DateRangeIcon className={classes.dateRangeIcon} />
        </Stack>
      </Stack>
    </Box>
  )
} 

export default RiskPeriodCard;