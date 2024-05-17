import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import LoaderOverlay from '../Loader/LoaderOverlay';
import PolicyBar from './PolicyBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from "@mui/material/Toolbar";
import ToolboxPolicy from '../Toolbox/ToolboxPolicy';

import PolicyStack from './PolicyStack';
import PolicyTimeline from './PolicyTimeline';
import PolicyClaims from './PolicyClaims';
import PolicyConfirmSignedModal from './PolicyModals/PolicyConfirmSignedModal';
import PolicyActivateErrorModal from './PolicyModals/PolicyActivateErrorModal';

// Styles
import { LinkPrimary as linkPrimary } from '../../Styles/Base/Type';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Policy = props => {
  const [value, setValue] = React.useState(0);
  const [openConfirmPolicySignedModal, setOpenConfirmPolicySignedModal] = React.useState(false);
  const [openActivatePolicyErrorModal, setOpenActivatePolicyErrorModal] = React.useState(false);

  const {
    loaded,
    onModalMonitorOpen,
    status,
    statusTitle,
    statusPillTitle,
    history,
    claims,
    // Policy Stack
    basisOfSumInsured,
    coverages,
    currency,
    customerName,
    exclusions,
    title,
    totalSumInsured,
    inceptionDate,
    expiryDate,
    grossPremium,
    // Policy Stack ./end
    onDownload,
    handleActivate,
    policyId,
    policyScheduleDocumentId,
  } = props;
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleOpenActivatePolicyModal = () => {
    setOpenConfirmPolicySignedModal(true);
  };
  
  const handleCloseActivatePolicyModal = () => {
    setOpenConfirmPolicySignedModal(false);
  };
  
  const handleActivatePolicy = () => {
    const isStartDateInFuture = new Date(inceptionDate).getTime() > new Date().getTime();
    handleCloseActivatePolicyModal();
    
    if (isStartDateInFuture) {
      handleActivate();
    } else {
      setOpenActivatePolicyErrorModal(true);
    }
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingBottom: theme.spacing(6),
    },
    main: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    link: linkPrimary(),
    divider: {
      opacity: 0.15,
    },
    cardContainer: {
      marginBottom: theme.spacing(3),
    },
    stripe: {
      backgroundColor: theme.palette.stripe,
      padding: `8px 14px`,
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    stripeTitle: {
      fontSize: 18,
      display: 'inline-block',
      marginRight: theme.spacing(3),
      fontWeight: 700
    },
    card: {
      paddingBottom: theme.spacing(3),
    },
    cardItem: {
      display: 'flex',
      justifyContent: 'space-between',
      '& > *': {
        padding: '8px 18px',
      }
    },
    spaced: {
      marginBottom: theme.spacing(2),
    },
    full: {
      width: '100%',
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Toolbar/>
      <ToolboxPolicy loaded={loaded}
        label="Policy details"
        variant={status}
        onModalMonitorOpen={onModalMonitorOpen}
        handleOpenActivatePolicyModal={handleOpenActivatePolicyModal}
      />
      <PolicyBar
        loaded={loaded}
        title={statusTitle}
        pillTitle={statusPillTitle}
        variant={status}/>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Policy tabs">
          <Tab label="Details" />
          <Tab label="History" disabled />
          <Tab label="Claims"/>
      </Tabs>
      <TabPanel value={value} index={0}>
        <PolicyStack
          // ajaxError={this.state.ajaxError}
          basisOfSumInsured={basisOfSumInsured}
          // commission={commission}
          inceptionDate={inceptionDate}
          expiryDate={expiryDate}
          grossPremium={grossPremium}
          coverages={coverages}
          currency={currency}
          customerName={customerName}
          // dialogAcceptOpen={this.state.dialogAcceptOpen}
          // editMode={true}
          exclusions={exclusions}
          // grossPremium={grossPremium}
          // grossPremiumRate={grossPremiumRate}
          // onCreateNewPolicy={this.handleCreateNewPolicy}
          // onDialogClose={this.handleDialogClose}
          // onDialogOpen={this.handleDialogOpen}
          onDownload={onDownload}
          // pricingReport={this.state.technicalPricingReportId}
          // quoteDocument={this.state.quotationDocumentId}
          policyScheduleDocumentId={policyScheduleDocumentId}
          status={status}
          title={title}
          totalSumInsured={totalSumInsured}
          loaded={loaded}
          policyId={policyId}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PolicyTimeline items={history}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PolicyClaims claims={claims} onDownload={onDownload}/>
      </TabPanel>

      <LoaderOverlay open={props.backdropOpen}/>
      <PolicyConfirmSignedModal
        open={openConfirmPolicySignedModal}
        onClose={handleCloseActivatePolicyModal}
        onConfirm={handleActivatePolicy}
      />
      <PolicyActivateErrorModal
        open={openActivatePolicyErrorModal}
        onClose={() => setOpenActivatePolicyErrorModal(false)}
      />
    </Box>
  );
};

export default Policy;
