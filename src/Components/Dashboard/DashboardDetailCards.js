import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import abbreviate from "number-abbreviate";
import DashboardCard from "./DashboardCard";
import { ButtonNav } from "../Buttons/Buttons";

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(2),
    display: 'flex',
    lineHeight: 1.36,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  cardValue: {
    fontWeight: 700,
    fontSize: 48,
    marginTop: theme.spacing(2),
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: 20,
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 16,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
  },
  linearProgress: {
    height: 8,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#F6F9FD',
    },
    
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: '#FFE034',
      borderRadius: 4,
    }
  }
}))

const DashboardOverviewCards = () => {
  const classes = useStyles();
  
  const overviewData = [
    {
      value: 523000,
      title: 'Pipeline value (weighted)',
      unit: '$',
      label: 'Total',
      stages: [
        {
          label: 'Quoted',
          value: 27000,
          progress: 0.47,
        },
        {
          label: 'Accepted',
          value: 60000,
          progress: 0.1,
        },
        {
          label: 'In Force',
          value: 120000,
          progress: 0.69,
        }
      ]
    },
    {
      value: 148,
      title: 'Quotes',
      label: 'Active customers',
      stages: [
        {
          label: 'New',
          value: 52,
          progress: 0.47,
        },
        {
          label: 'Accepted',
          value: 4,
          progress: 0.1,
        },
        {
          label: 'Pending policy',
          value: 64,
          progress: 0.69,
        }
      ]
    },
    {
      title: 'Recent activities',
      items: [
        {
          label: 'Coverages XYZ created',
          link: '#',
        },
        {
          label: '$500 claim to customer ABC',
          link: '#',
        },
        {
          label: 'Farm quote 123 accepted',
          link: '#',
        },
        {
          label: 'Farm quote 4231 accepted',
          link: '#',
        },
        {
          label: 'New policy in force',
          link: '#',
        },
      ]
    },
  ]
  
  return (
    <Box className={classes.root}>
      {overviewData.map((item, index) => (
        <DashboardCard key={`dashboard-detail-card-${index}`}>
          <Typography className={classes.cardTitle}>{item.title}</Typography>
          <Typography className={classes.cardValue}>
            {item.unit ?? item.unit}
            {!!item.value && abbreviate(item.value, 0)}{' '}
            <Typography component="span" className={classes.label}>
              {item.label}
            </Typography>
          </Typography>
          {!!item.stages?.length && (
            <Box sx={{ mt: 2, pb: 2.5 }}>
              <Typography className={classes.subtitle}>
                Stages
              </Typography>
              {item.stages.map((stage, idx) => (
                <Box className={`dashboard-detail-card-${index}-stage-item-${idx}`} sx={{ mt: 3.25 }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography className={classes.label}>{stage.label}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.label}>
                        {item.unit ?? item.unit}
                        {abbreviate(stage.value, 0)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <LinearProgress
                    className={classes.linearProgress}
                    variant="determinate"
                    value={stage.progress * 100}
                  />
                </Box>
              ))}
            </Box>
          )}
          {!!item.items?.length && (
            <Box sx={{ mt: 'auto', pb: 2.5 }}>
              {item.items.map((listItem, idx) => (
                <Grid
                  className={`dashboard-detail-card-${index}-list-item-${idx}`}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    borderColor: '#EEEEEE',
                    borderStyle: 'solid',
                    borderTopWidth: idx !== 0 ? 1 : 0,
                    py: 1.5,
                  }}
                  container
                >
                  <Grid item>
                    <Typography className={classes.label}>{listItem.label}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography className={classes.label}>see</Typography>
                      </Grid>
                      <Grid sx={{ ml: 0.5, display: 'flex' }} item>
                        <ButtonNav to={listItem.link} component={RouterLink} sx={{ p: 0 }}>
                          <ArrowRightAltIcon className={classes.arrowIcon}/>
                        </ButtonNav>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}
        </DashboardCard>
      ))}
    </Box>
  );
}

export default DashboardOverviewCards;
