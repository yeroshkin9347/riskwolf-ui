import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Coverage from './Coverage';
import ModalAjaxError from '../Modals/ModalAjaxError';
import Ajax, { GetToken } from '../../Util/ajax';

class CoverageContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      riskRate: 0,
      premiumRate: 0,
      expectedLossRatio: 0,
      eventTargeting: '',
      label: '',
      version: 0,
      creator: '',
      status: '',
      coverYear: 0,
      cards: {
        riskType: {
          title: '',
          sub: '',
        },
        insuredTarget: {
          title: '',
          sub: '',
        }
      },
      riskTypeId: '',
      dataProvider: '',
      coverageFactSheet: null,
      technicalPricingReport: null,
      ajaxError: false,
      ajaxErrorModalOpen: false,
      backdropOpen: false,
      riskCarrier: '',
      dataSourceId: null,
      dataSetId: null,
      monitoringTargetId: null,
    };

    this.id = this.props.match.params.id;

    this.handleActivate = this.handleActivate.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  componentDidMount() {
    GetToken().then(token => {
      Ajax.getData(`${window.appConfig.apiUrl}/internal/coverages/${this.id}`, token)
      .then(data => {
        this.setState({
          riskRate: data.riskPremiumPct,
          premiumRate: data.grossPremiumIndicationPct,
          expectedLossRatio: data.expectedLossRatio,
          eventTargeting: data.monitoringTarget,
          label: data.label,
          version: data.version,
          creator: data.createdBy,
          createdAt: data.createdAt,
          status: data.uiState,
          riskCarrier: data.riskCarrier,
          payoutPerUnit: data.payoutPerUnit,
          dataSourceId: data.dataSourceId,
          dataSetId: data.dataSetId,
          monitoringTargetId: data.monitoringTargetId,
          riskTypeId: data.riskTypeId,
          dataProvider: data.dataSourceDescription,
          cards: {
            riskType: {
              title: data.dataSet,
              sub: data.riskType,
            },
            insuredTarget: {
              title: data.monitoringTarget,
              sub: data.indexDefinition,
            },
            start: new Date(Date.parse(data.start)).toLocaleDateString('en-us', { year:"numeric", month:"short", day: "numeric"}),
            end: new Date(Date.parse(data.end)).toLocaleDateString('en-us', { year:"numeric", month:"short", day: "numeric"}),
          },
          technicalPricingReport: data.technicalPricingReportFileId,
          coverageFactSheet: data.factSheetReportFileId,
          trigger: data.trigger,
          triggerUnit: data.triggerUnit,
          minPayout: data.minPayout,
          sumInsured: data.limit,
          loaded: true,
          riskPremium: data.riskPremium,
        });
      }).catch();
    });
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
      riskRate,
      premiumRate,
      expectedLossRatio,
      eventTargeting,
      creator,
      label,
      version,
      createdAt,
      loaded,
      status,
      coverYear,
      cards,
      dataProvider,
      dataProviderName,
      payoutDesignCurrency,
      technicalPricingReport,
      coverageFactSheet,
      trigger,
      triggerUnit,
      minPayout,
      sumInsured,
      riskCarrier,
      payoutPerUnit,
      backdropOpen,
      dataSourceId,
      dataSetId,
      monitoringTargetId,
      riskTypeId,
      riskPremium,
    } = this.state;

    return (
      <>
        <Coverage
          id={this.id}
          riskRate={riskRate}
          premiumRate={premiumRate}
          expectedLossRatio={expectedLossRatio}
          eventTargeting={eventTargeting}
          label={label}
          creator={creator}
          version={version}
          createdAt={createdAt}
          status={status}
          loaded={loaded}
          coverYear={coverYear}
          cards={cards}
          dataProvider={dataProvider}
          dataProviderName={dataProviderName}
          payoutDesignCurrency={payoutDesignCurrency}
          technicalPricingReport={technicalPricingReport}
          coverageFactSheet={coverageFactSheet}
          trigger={trigger}
          triggerUnit={triggerUnit}
          minPayout={minPayout}
          sumInsured={sumInsured}
          riskCarrier={riskCarrier}
          payoutPerUnit={payoutPerUnit}
          handleActivate={this.handleActivate}
          handleDownload={this.handleDownload}
          backdropOpen={backdropOpen}
          dataSourceId={dataSourceId}
          dataSetId={dataSetId}
          monitoringTargetId={monitoringTargetId}
          riskTypeId={riskTypeId}
          riskPremium={riskPremium}
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

export default withRouter(CoverageContainer);
