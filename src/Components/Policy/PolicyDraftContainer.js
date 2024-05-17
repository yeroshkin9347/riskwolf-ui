import React, { Component } from 'react';
import PolicyDraft from './PolicyDraft';
import ModalAjaxError from '../Modals/ModalAjaxError';
import { withRouter } from "react-router";
import Ajax, { GetToken } from '../../Util/ajax';

class PolicyContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      riskPremium: 0,
      premiumRate: 0,
      riskRatio: 0,
      eventTargeting: '',
      label: '',
      version: 0,
      creator: '',
      status: 'draft',
      statusTitle: 'This is a draft policy',
      statusPillTitle: 'Draft',
      coverYear: 0,
      cardSubTitle: '',
      cardSubSub: 'N/A',
      cardSubContent: '',
      coverageFactSheet: null,
      technicalPricingReport: null,
      ajaxError: false,
      ajaxErrorModalOpen: false,
      backdropOpen: false,
      modalMonitorOpen: false,
    };

    this.id = this.props.match.params.id;

    this.handleActivate = this.handleActivate.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleMonitorModalOpen = this.handleMonitorModalOpen.bind(this);
    this.handleMonitorModalClose = this.handleMonitorModalClose.bind(this);
  }

  componentDidMount() {
    // GetToken().then(token => {
    //   Ajax.getData(`${window.appConfig.apiUrlCoverages}/${this.id}`, token)
    //   .then(data => {
    //     this.setState({
    //       riskPremium: data.premiumRate ? parseFloat(data.premiumRate.riskPremiumPct * 100).toFixed(2) : null,
    //       premiumRate: data.premiumRate ? parseFloat(data.premiumRate.grossPremiumIndicationPct * 100).toFixed(2) : null,
    //       riskRatio: data.targetLossRatio * 100,
    //       eventTargeting: data.condition.monitoringTarget.name,
    //       label: data.label,
    //       version: data.version,
    //       creator: data.creator,
    //       createdAt: data.createdAt,
    //       status: data.status,
    //       coverYear: data.coverYear,
    //       cardSubTitle: data.condition.monitoringTarget.dataSet.name,
    //       cardSubContent: data.condition.monitoringTarget.dataSet.description,
    //       dataProviderName: data.condition.monitoringTarget.dataSet.dataProvider.name,
    //       dataProviderDesc: data.condition.monitoringTarget.dataSet.dataProvider.description,
    //       payoutDesignCurrency: data.currency,
    //       technicalPricingReport: data.technicalPricingReportFileId,
    //       coverageFactSheet: data.factSheetReportFileId,
    //       trigger: data.payoutStructure.trigger,
    //       pricingUnit: data.payoutStructure.pricingUnit.substring(0,3).toLowerCase(),
    //       minPayout: data.payoutStructure.minPayout.amount,
    //       sumInsured: data.limit ? data.limit.amount : null,
    //       loaded: true,
    //     });
    //   }).catch();
    // });
  }

  handleModalClose () {
    this.setState({
      ajaxError: false,
      ajaxErrorModalOpen: false,
    })
  }

  handleDownload (URI) {
    // console.log("Calling " + URI);

    GetToken().then(token => {
      Ajax.downloadFile(URI, token).then(response => {
        // console.log("OK");
      }).catch(error => {
        this.setState({
          ajaxError: true,
          ajaxErrorModalOpen: true,
        })
        console.error('error', error)
      });
    });
  }

  handleMonitorModalOpen () {
    this.setState({
      modalMonitorOpen: true,
    });
  }

  handleMonitorModalClose () {
    this.setState({
      modalMonitorOpen: false,
    });
  }

  handleActivate () {
    const URI = `${window.appConfig.apiUrl}/internal/coverages/${this.id}/activate`;

    this.setState({
      backdropOpen: true,
    }, () => {
      GetToken().then(token => {
        Ajax.postData(URI, {}, token).then(response => {
          // console.log('response', response);
          // Re-direct back to coverage listing page.
          window.location.replace('/coverages');
        }).catch(error => {
          this.setState({
            ajaxError: true,
            ajaxErrorModalOpen: true,
          })
          console.error('error', error)
        });
      });
    });
  }

  render () {
    const {
      riskPremium,
      premiumRate,
      riskRatio,
      eventTargeting,
      creator,
      label,
      version,
      createdAt,
      loaded,
      status,
      statusTitle,
      statusPillTitle,
      coverYear,
      cardSubTitle,
      cardSubContent,
      dataProviderName,
      dataProviderDesc,
      payoutDesignCurrency,
      technicalPricingReport,
      coverageFactSheet,
      trigger,
      pricingUnit,
      minPayout,
      sumInsured,
      modalMonitorOpen,
    } = this.state;

    return (
      <>
        <PolicyDraft
          riskPremium={riskPremium}
          premiumRate={premiumRate}
          riskRatio={riskRatio}
          eventTargeting={eventTargeting}
          label={label}
          creator={creator}
          version={version}
          createdAt={createdAt}
          status={status}
          statusTitle={statusTitle}
          statusPillTitle={statusPillTitle}
          loaded={loaded}
          coverYear={coverYear}
          cardSubTitle={cardSubTitle}
          cardSubContent={cardSubContent}
          dataProviderName={dataProviderName}
          dataProviderDesc={dataProviderDesc}
          payoutDesignCurrency={payoutDesignCurrency}
          technicalPricingReport={technicalPricingReport}
          coverageFactSheet={coverageFactSheet}
          trigger={trigger}
          pricingUnit={pricingUnit}
          minPayout={minPayout}
          sumInsured={sumInsured}
          handleActivate={this.handleActivate}
          handleDownload={this.handleDownload}
          backdropOpen={this.state.backdropOpen}
          modalMonitorOpen={modalMonitorOpen}
          onModalMonitorOpen={this.handleMonitorModalOpen}
          onModalMonitorClose={this.handleMonitorModalClose}
        />
        {
          this.state.ajaxError ? (
            <ModalAjaxError open={this.state.ajaxErrorModalOpen} handleClose={this.handleModalClose} message={this.state.ajaxErrorMessage} />
          ) : null
        }

      </>
    )
  }
}

export default withRouter(PolicyContainer);
