import { Typography, Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 4,
    backgroundColor: '#F6F9FD',
    padding: theme.spacing(2.5),
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: theme.spacing(2.5),
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    marginTop: theme.spacing(2.5),
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 400,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: theme.spacing(1.25),
  },
}))

export const DataSetCard = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {props.isLoading ? <Skeleton /> : <Typography className={classes.title} variant="h6">{props?.card?.category ?? '---'}</Typography>}
      {props.isLoading ? <Skeleton /> : <Typography className={classes.name} variant="h5">{props?.card?.name ?? '---'}</Typography>}
      {props.isLoading ? <Skeleton /> : <Typography className={classes.description} variant="body1">{props?.card?.description ?? '---'}</Typography>}
      {props.isLoading ? <Skeleton /> : (
        <Grid container columnSpacing={{ xs: 4, sm: 7.5 }} rowSpacing={{ sm: 1.5, md: 0 }} sx={{ mt: 2.5 }}>
          <Grid item sm={12} md={4} sx={{width: { md: 'max-content' }}}>
            <Typography className={classes.fieldLabel} variant="caption">License</Typography>
            <Typography className={classes.fieldValue} variant="body1">{props?.card?.license ?? '---'}</Typography>
          </Grid>
          <Grid item sm={12} md={4} sx={{width: { md: 'max-content' }}}>
            <Typography className={classes.fieldLabel} variant="caption">Placetype</Typography>
            <Typography className={classes.fieldValue} variant="body1">{props?.card?.placetype ?? '---'}</Typography>
          </Grid>
          <Grid item sm={12} md={4} sx={{width: { md: 'max-content' }}}>
            <Typography className={classes.fieldLabel} variant="caption">Temporal aggregate</Typography>
            <Typography className={classes.fieldValue} variant="body1">{props?.card?.temporalAggregate ?? '---'}</Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}