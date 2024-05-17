import makeStyles from '@mui/styles/makeStyles';
import { Typography, Stack, Box } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import { Icon } from '@iconify/react';

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
  label: {
    fontSize: 24,
    fontWeight: 600,
    flex: 1,
  },
  iconContainer: {
    minWidth: 78,
    minHeight: 78,
    borderRadius: 40,
    border: '1px solid #00000026',
    position: 'relative',
  },
  infoIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 20,
  }
}))

const CoverageType = ({label, riskTypeId}) => {
  const classes = useStyles();

  const getIcon = () => {
    switch (riskTypeId) {
      case 'ICT_SHOCK':
        return 'mdi:router-network';
      case 'CLOUD':
        return 'mdi:cloud-off';
      case 'CDN':
        return 'mdi:server-network';
      case 'PAYMENT':
        return 'mdi:credit-card-off';
      case 'TC (Tropical Cyclones)':
        return 'mdi:weather-hurricane';
      case 'RAINFALL':
        return 'mdi:weather-rainy';
      case 'TEMPERATURE':
        return 'mdi:thermometer';
      case 'SOLAR (Solar Shortfall)':
        return 'mdi:weather-sunset';
      default:
        return <QuestionMarkIcon />
    }
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>Coverage</Typography>
      <Stack direction="row" alignItems="flex-end" gap={2} sx={{mt: 1}}>
        <Typography variant="h4" className={classes.label}>{label ? label : '-'}</Typography>
        <Stack alignItems="center" justifyContent="center" className={classes.iconContainer}>
          <Icon icon={getIcon()} fontSize={36} />
        </Stack>
      </Stack>
    </Box>
  )
}

export default CoverageType;