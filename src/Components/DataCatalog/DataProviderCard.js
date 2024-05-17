import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Skeleton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    border: '1px solid #00000026',
    overflow: 'hidden',
    height: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1.5),
    height: 222,
    // TOOD: remove after change image
    fontSize: '3rem',
    fontWeight: 'bold',
    opacity: 0.5,
    textAlign: 'center'
  },
  content: {
    padding: theme.spacing(2.5),
    background: '#F6F9FD',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1E1E1E',
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    color: '#000000DE',
  },
  btnWrapper: {
    minHeight: 50,
    flex: 1,
    alignItems: 'flex-end',
  },
  btn: {
    padding: 0,
    fontSize: 12,
    fontWeight: 700,
    color: '#1A1A21',
  },
}));

const getLogoById = (providerId) => {
  // TOOD: replace with suitable image
  switch (providerId) {
    case 'kdh':
      return 'KDH';
    case 'cloudflare':
      return 'CLOUDFARE';
    case 'azure':
      return 'AZURE';
    case 'noaa':
      return 'NOAA';
    case 'meteomatics':
      return 'MeteoMatics';
    case 'aws':
      return 'AWS';
    case 'gcp':
      return 'GCP';
    case 'nasa':
      return 'NASA';
    case 'ecmwf__era5':
      return 'ECMWF';
    case 'ecmwf__era5-land':
      return 'ECMWF LAND';
    case 'gsod':
      return 'GSOD';
    case 'bom__silo':
      return 'BOM SILO';
    case 'imd':
      return 'IMD';
    default: 
      return 'No logo';
  }
}

export const DataProviderCard = (props) => {
  const classes = useStyles();

  const {
    card,
    onSelectProvider,
    isLoading,
  } = props;
  
  return (
    <Grid sm={8} md={6} lg={4}>
      <Box className={classes.root}>
        <Stack className={classes.iconContainer}>
          {isLoading ? <Skeleton /> : getLogoById(card.id)}
        </Stack>
        <Stack className={classes.content}>
          {isLoading ? <Skeleton /> : <Typography className={classes.title}>{card.name ?? '---'}</Typography>}
          {isLoading ? <Skeleton /> : <Typography className={classes.description} sx={{mt: 1.25}}>{card.description ?? '---'}</Typography>}
          {!isLoading && (
            <Stack direction="row" gap={5} className={classes.btnWrapper}>
              <Button className={classes.btn} onClick={() => onSelectProvider(card.id)}>
                View datasets
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Grid>
  );
};
