import makeStyles from '@mui/styles/makeStyles';
import { Typography, Stack, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CoverageMap from './CoverageMap';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2.5),
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
    fontSize: 18,
    fontWeight: 600,
  },
}));

const CoverageDetailsCard = (props) => {
  const classes = useStyles();

  const data = [
    {
      label: 'Coverage',
      value: props.label ? props.label : '-'
    },
    {
      label: 'Risk Type', 
      value: props.riskType.sub ? props.riskType.sub : '-'
    },
    {
      label: 'Data Set', 
      value: props.riskType.title ? props.riskType.title : '-'
    },
    {
      label: 'Data Provider', 
      value: props.dataProvider ? props.dataProvider : '-'
    },
    {
      label: 'Trigger', 
      value: props.trigger ? props.trigger : '-'
    },
    {
      label: 'Minimum Payout', 
      value: props.minPayout ? props.minPayout : '-'
    },
    {
      label: 'Payout per Unit', 
      value: props.payoutPerUnit ? props.payoutPerUnit : '-'
    },
    {
      label: 'Index Type', 
      value: props.indexType ? props.indexType : '-'
    },
    {
      label: 'Risk Carrier', 
      value: props.riskCarrier ? props.riskCarrier : '-'
    },
    {
      label: 'Created By', 
      value: props.creator ? props.creator : '-'
    },
  ];

  return (
    <Box className={classes.root}>
      <Grid container spacing={4}>
        <Grid xs={12} lg={6}>
          <Typography variant='h5' className={classes.title}>Coverage Details</Typography>
          <Stack sx={{ mt: 4 }} rowGap={2.5}>
            {data.map(({label, value}) => (
              <Grid container key={label}>
                <Grid sm={5}>
                  <Typography variant="body1">{label}</Typography>
                </Grid>
                <Grid sm={7}>
                  <Typography variant="body1" fontWeight={600}>{value}</Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Grid>
        <Grid xs={12} lg={6}>
          <Typography variant="body1" fontWeight={600}>Monitoring Target</Typography>
          <Stack sx={{ mt: 4 }} rowGap={1.5}>
            <Typography variant="body1" fontStyle="italic">
              {props.monitoringTarget ? props.monitoringTarget : '-'} ({props.monitoringTargetId ? props.monitoringTargetId : '-'})
            </Typography>
            <CoverageMap 
              dataSourceId={props.dataSourceId}
              dataSetId={props.dataSetId}
              monitoringTargetId={props.monitoringTargetId} 
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CoverageDetailsCard;