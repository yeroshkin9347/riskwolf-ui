import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import ToolboxCoverage from '../Toolbox/ToolboxCoverage';
import CoverageBar from './CoverageBar';
import CoverageActivate from './CoverageActivate';
import CoverageEdit from './CoverageEdit';
import CardStack from '../Cards/CardStack';
import CardIcon from '../Cards/CardIcon';
import CoverageType from './CoverageType';
import RiskPeriodCard from './RiskPeriodCard';
import { BurnCostGraph } from './BurnCostGraph';
import CoverageDetailsCard from './CoverageDetailsCard';

import Format from '../../Util/format';
import formatMissingValue from '../../Util/formatMissingValue';
import { ReactComponent as CashIcon } from '../../assets/images/cash.svg';
import { ReactComponent as BoardIcon } from '../../assets/images/board.svg';
import { ReactComponent as PdfIcon } from '../../assets/images/pdf-icon.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    backgroundColor: '#f7f8fc',
    flex: 1,
  },
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardContainer: {
    marginBottom: theme.spacing(1.5),
  },
  spaced: {
    marginBottom: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: '#fff',
  },
  cardStackDescription: {
    fontSize: 18,
    fontWeight: 700,
  }
}));

const Coverage = props => {
  const {
    id,
    premiumRate,
    eventTargeting,
    version,
    creator,
    createdAt,
    status,
    label,
    loaded,
    cards,
    technicalPricingReport,
    coverageFactSheet,
    trigger,
    triggerUnit,
    minPayout,
    handleDownload,
    riskCarrier,
    payoutPerUnit,
    dataSourceId,
    dataSetId,
    monitoringTargetId,
    riskTypeId,
    riskPremium,
    dataProvider,
  } = props;

  // Dialog box state.
  const [openActivate, setOpenActivate] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleActivateOpen = () => {
    setOpenActivate(true);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleActivateClose = (object, reason) => {
    if (reason !== 'backdropClick') {
      setOpenActivate(false);
    }
  };

  const handleEditClose = (object, reason) => {
    if (reason !== 'backdropClick') {
      setOpenEdit(false);
    }
  };

  const classes = useStyles();

  const root = window.appConfig.apiUrl;

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxCoverage loaded={loaded}
        label={`${cards.riskType.title.toUpperCase()} COVERAGE FOR ${eventTargeting}`}
        variant={status}
        handleOpen={handleActivateOpen}
        handleEditOpen={handleEditOpen}/>
      <CoverageBar
        loaded={loaded}
        creator={creator}
        createdAt={createdAt}
        version={version}
        variant={status}/>
      <CoverageActivate open={openActivate} handleActivate={props.handleActivate} handleClose={handleActivateClose} openEdit={handleEditOpen}/>
      <CoverageEdit open={openEdit} handleClose={handleEditClose}/>
      <div data="main" className={classes.main}>
        <Container className={classes.container} maxWidth="xl">
          <Stack spacing={2}>
            <Grid container columnSpacing={2} rowSpacing={2} sx={{ m: '-8px !important' }}>
              <Grid item xs={12} md={6} lg={3}>
                <CoverageType riskTypeId={riskTypeId} label={label} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <RiskPeriodCard start={cards.start} end={cards.end} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardStack 
                  title={`${triggerUnit ? `${triggerUnit} ` : ''}pays ${formatMissingValue(parseInt(minPayout?.amount * 100) / 100)}%`}
                  content={formatMissingValue(parseInt(trigger * 100) / 100)} 
                  description={
                    <Stack direction="row" alignItems="center">
                      <CashIcon />
                      <Typography className={classes.cardStackDescription} color="#31D158">
                        {(payoutPerUnit?.amount ? (' then ' + parseInt(payoutPerUnit?.amount * 100) / 100 + '% per ' + triggerUnit) : '')}
                      </Typography>
                    </Stack>
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardStack 
                  title="Risk Premium"
                  content={formatMissingValue((riskPremium?.amount !== undefined ? parseInt(riskPremium?.amount * 100) / 100 : '') + (riskPremium?.amount !== undefined ? ' %' : ' - '))}
                  description={
                    <Stack direction="row" alignItems="center">
                      <BoardIcon />
                      <Typography className={classes.cardStackDescription} color="#0000008A">
                        {premiumRate ? Format.percentageWrapFormat(premiumRate) : '-'} GWP Est.
                      </Typography>
                    </Stack>
                  }
                />
              </Grid>
            </Grid>
            <BurnCostGraph 
              coverageId={id}
              {...{trigger, triggerUnit, minPayout, payoutPerUnit, riskTypeId}}
            />
            <CoverageDetailsCard 
              riskType={cards.riskType}
              trigger={formatMissingValue(parseInt(trigger * 100) / 100) + (triggerUnit ?? '')}
              minPayout={formatMissingValue(parseInt(minPayout?.amount * 100) / 100) + '%'}
              payoutPerUnit={formatMissingValue(parseInt(payoutPerUnit?.amount * 100) / 100) + '% per ' + (triggerUnit ?? '')}
              indexType={cards.insuredTarget.sub}
              monitoringTarget={cards.insuredTarget.title}
              {...{label, dataProvider, riskCarrier, creator, monitoringTargetId, dataSetId, dataSourceId}}
            />
            <Grid container columnSpacing={2} rowGap={2} sx={{ mx: '-8px !important' }}>
              <Grid item xs={12} md={6} display="flex">
                <CardIcon
                  loaded={loaded}
                  title="Technical pricing report"
                  handleDownload={handleDownload}
                  reportId={technicalPricingReport}
                  linkUrl={`${root}/internal/files/${technicalPricingReport}`}
                  icon={<PdfIcon/>}>
                  Coverage contains a loss and risk breakdown of a coverage before creating a quotation.
                </CardIcon>
              </Grid>
              <Grid item xs={12} md={6} display="flex">
                <CardIcon
                  loaded={loaded}
                  title="Coverage factsheet"
                  handleDownload={handleDownload}
                  linkUrl={`${root}/internal/files/${coverageFactSheet}`}
                  reportId={coverageFactSheet}
                  icon={<PdfIcon/>}>
                  Coverage factsheet can be used to review the possible performance of a coverage.
                </CardIcon>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </div>
      <Backdrop className={classes.backdrop} open={props.backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Coverage;
