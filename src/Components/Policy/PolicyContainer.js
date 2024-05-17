import React, { Component } from 'react';
import Policy from './Policy';
import ModalAjaxError from '../Modals/ModalAjaxError';
import { withRouter } from "react-router";
import Ajax, { GetToken } from '../../Util/ajax';
import Format from '../../Util/format';
import get from 'lodash/get';
import { parseCoverages } from  '../Coverages/util';

class PolicyContainer extends Component{
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      loaded: false,
      // Check which ones need to be removed.
      riskPremium: 0,
      premiumRate: 0,
      riskRatio: 0,
      eventTargeting: '',
      label: '',
      version: 0,
      creator: '',
      statusTitle: '',
      statusPillTitle: '',
      coverYear: 0,
      cardSubTitle: '',
      cardSubSub: 'N/A',
      cardSubContent: '',
      coverageFactSheet: null,
      technicalPricingReport: null,
      inceptionDate: undefined,
      expiryDate: undefined,
      ajaxError: false,
      ajaxErrorModalOpen: false,
      backdropOpen: false,
      modalMonitorOpen: false,
      // Check which ones need to be removed. ./end

      // Details
      basisOfSumInsured: '',
      grossPremium: '',
      grossPremiumRate: '',
      totalSumInsured: '',
      commission: '',
      technicalPricingReportId: '',
      policyScheduleDocumentId: '',
      quotationDocumentId: '',
      customerName: '',
      title: '',
      currency: '',
      coverages: [],
      exclusions: [],
      status: '',
      id: '',
      // Details ./end

      // Claims
      claims: [],
      // Claims ./end
    };

    this.id = this.props.match.params.id;

    this.handleActivate = this.handleActivate.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleMonitorModalOpen = this.handleMonitorModalOpen.bind(this);
    this.handleMonitorModalClose = this.handleMonitorModalClose.bind(this);
  }

  componentDidMount() {

    GetToken().then(token => {
      Ajax.getDataAll(
        [
          `${window.appConfig.apiUrl}/internal/policies/${this.id}`,
          `${window.appConfig.apiUrl}/internal/claims?policyId=${this.id}&page=0&size=10000`,
          // Only used for development! Example request for the policy.
          // `${window.appConfig.apiUrl}/internal/claims?policyId=fa5fc4a9-3480-4952-8b27-1ca1b0f80cc6`,
        ], token)
      .then(data => {
        const [dataPolicies, dataClaims] = data;

        // Policy details-related
        const premiumAmount = get(dataPolicies, 'grossPremium.amount');
        const premiumCurrency = get(dataPolicies, 'grossPremium.currency');
        const grossPremiumRate = get(dataPolicies, 'grossPremiumRatePct');
        const inceptionDate = get(dataPolicies, 'inceptionDate');
        const expiryDate = get(dataPolicies, 'expiryDate');
        const totalSumAmount = get(dataPolicies, 'totalSumInsured.amount')
        const totalSumCurrency = get(dataPolicies, 'totalSumInsured.currency');
        const customerName = get(dataPolicies, 'customer');
        const policyScheduleDocumentId = get(dataPolicies, 'policyScheduleDocumentId');
        const currency = get(dataPolicies, 'totalSumInsured.currency');
        const { name } = dataPolicies;
        // Policy details-related ./end

        this.setState({
          grossPremium: premiumAmount ? `${premiumCurrency} ${parseFloat(premiumAmount.toLocaleString()).toFixed(2)}` : '---',
          grossPremiumRate: Format.percentageWrapFormat(grossPremiumRate),
          totalSumInsured: Format.currency(totalSumAmount, totalSumCurrency),
          commission: dataPolicies.commission ? Format.percentageWrapFormat(dataPolicies.commission) : null,
          technicalPricingReportId: get(dataPolicies, 'aggregatedPricingReportId'),
          quotationDocumentId: get(dataPolicies, 'quoteDocumentId'),
          customerName: customerName,
          title: name,
          currency: currency,
          inceptionDate,
          expiryDate,
          policyScheduleDocumentId,
          // Parser was developed originally for coverages.
          coverages: parseCoverages(dataPolicies.policyItems),
          exclusions: dataPolicies.exclusions ? dataPolicies.exclusions.split(/\r?\\n/) : '',
          loaded: true,
          status: dataPolicies.state,
          statusTitle: dataPolicies.state,
          statusPillTitle: dataPolicies.state,
          id: dataPolicies.id,
          basisOfSumInsured: get(dataPolicies, 'sumInsuredBasis'),
          claims: dataClaims.content,
        });
      })
      .catch();
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
    const URI = `${window.appConfig.apiUrl}/internal/policies/${this.id}/accept`;

    this.setState({
      backdropOpen: true,
    }, () => {
      GetToken().then(token => {
        Ajax.postData(URI, {}, token).catch(error => {
          this.setState({
            ajaxError: true,
            ajaxErrorModalOpen: true,
          })
          console.error('error', error)
        }).finally(() => {
          this.setState({
            backdropOpen: false,
          })
        });
      });
    });
  }

  render () {
    const {
      basisOfSumInsured,
      cardSubContent,
      cardSubTitle,
      claims,
      coverageFactSheet,
      coverages,
      coverYear,
      createdAt,
      creator,
      inceptionDate,
      expiryDate,
      customerName,
      dataProviderDesc,
      dataProviderName,
      eventTargeting,
      exclusions,
      history,
      label,
      loaded,
      minPayout,
      modalMonitorOpen,
      payoutDesignCurrency,
      premiumRate,
      pricingUnit,
      riskPremium,
      riskRatio,
      status,
      statusPillTitle,
      statusTitle,
      sumInsured,
      technicalPricingReport,
      trigger,
      title,
      version,
      totalSumInsured,
      currency,
      grossPremium,
      policyScheduleDocumentId,
    } = this.state;

    return (
      <>
        <Policy
          backdropOpen={this.state.backdropOpen}
          basisOfSumInsured={basisOfSumInsured}
          cardSubContent={cardSubContent}
          cardSubTitle={cardSubTitle}
          claims={claims}
          currency={currency}
          coverages={coverages}
          coverageFactSheet={coverageFactSheet}
          coverYear={coverYear}
          createdAt={createdAt}
          creator={creator}
          dataProviderDesc={dataProviderDesc}
          dataProviderName={dataProviderName}
          eventTargeting={eventTargeting}
          exclusions={exclusions}
          handleActivate={this.handleActivate}
          onDownload={this.handleDownload}
          history={history}
          label={label}
          loaded={loaded}
          minPayout={minPayout}
          modalMonitorOpen={modalMonitorOpen}
          onModalMonitorClose={this.handleMonitorModalClose}
          onModalMonitorOpen={this.handleMonitorModalOpen}
          payoutDesignCurrency={payoutDesignCurrency}
          premiumRate={premiumRate}
          pricingUnit={pricingUnit}
          riskPremium={riskPremium}
          riskRatio={riskRatio}
          status={status}
          statusPillTitle={statusPillTitle}
          statusTitle={statusTitle}
          sumInsured={sumInsured}
          totalSumInsured={totalSumInsured}
          technicalPricingReport={technicalPricingReport}
          policyScheduleDocumentId={policyScheduleDocumentId}
          trigger={trigger}
          title={title}
          customerName={customerName}
          version={version}
          inceptionDate={inceptionDate}
          expiryDate={expiryDate}
          grossPremium={grossPremium}
          policyId={this.id}
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
