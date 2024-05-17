import React, { useContext } from 'react';
import makeStyles from '@mui/styles/makeStyles';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardIcon from '../Cards/CardIcon';

// Icons
import FolderIcon from '@mui/icons-material/Folder';
import Time from '../../Util/time';
import ContextTheme from '../../Contexts/Theme';
import String from '../../Util/string';

const PolicyStack = props => {
  const {
    customerName,
    inceptionDate,
    expiryDate,
    grossPremium,
    loaded,
    onDownload,
    policyId,
    status,
    policyScheduleDocumentId,
  } = props;
  const { locale } = useContext(ContextTheme);
  const root = window.appConfig.apiUrl;

  const useStyles = makeStyles(theme => ({
    root: {
      padding: 0,
    },
    card: {
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
  }));

  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xl">
      <Stack spacing={2}>
        <Box className={classes.card}>
          <Grid container spacing={4}>
            <Grid xs={12} lg={6}>
              <Typography variant='h5' className={classes.title}>Basic Information</Typography>
              <Stack sx={{ mt: 4 }} rowGap={2.5}>
                <Grid container>
                  <Grid sm={5}><Typography variant="body1">Policy ID</Typography></Grid>
                  <Grid sm={7}><Typography variant="body1" fontWeight={600}>{policyId || '---'}</Typography></Grid>
                </Grid>
                <Grid container>
                  <Grid sm={5}><Typography variant="body1">Policy Holder Name</Typography></Grid>
                  <Grid sm={7}><Typography variant="body1" fontWeight={600}>{customerName || '---'}</Typography></Grid>
                </Grid>
                <Grid container>
                  <Grid sm={5}><Typography variant="body1">Effective Date</Typography></Grid>
                  <Grid sm={7}><Typography variant="body1" fontWeight={600}>{inceptionDate ? Time.getDate(inceptionDate, locale) : '---'}</Typography></Grid>
                </Grid>
                <Grid container>
                  <Grid sm={5}><Typography variant="body1">Expiry Date</Typography></Grid>
                  <Grid sm={7}><Typography variant="body1" fontWeight={600}>{expiryDate ? Time.getDate(expiryDate, locale) : '---'}</Typography></Grid>
                </Grid>
                <Grid container>
                  <Grid sm={5}><Typography variant="body1">Status</Typography></Grid>
                  <Grid sm={7}><Typography variant="body1" fontWeight={600}>{String.capitalize(status) || '---'}</Typography></Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid xs={12} lg={6}>
              <Typography variant='h5' className={classes.title}>Premiums</Typography>
              <Stack sx={{ mt: 4 }} rowGap={2.5}>
                <Grid container>
                  <Grid sm={5}><Typography variant="body1">Premium Amount</Typography></Grid>
                  <Grid sm={7}><Typography variant="body1" fontWeight={600}>{grossPremium || '---'}</Typography></Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <CardIcon
          loaded={loaded}
          title="Policy schedule"
          reportId={policyScheduleDocumentId}
          handleDownload={onDownload}
          linkUrl={`${root}/internal/files/${policyScheduleDocumentId}`}
          icon={<FolderIcon />}>
          Coverage contains a loss and risk breakdown of a coverage before creating a quotation.
        </CardIcon>
      </Stack>
    </Container>
  );
};

export default PolicyStack;
