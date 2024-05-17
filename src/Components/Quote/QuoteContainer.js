import React, { Component } from 'react';
import Quote from './Quote';
import { withRouter } from "react-router";
import Ajax, { GetToken } from '../../Util/ajax';
import Format from '../../Util/format';
import { redirect } from '../../Util/web';
import get from 'lodash/get';
import { parseCoverages } from  '../Coverages/util';

class QuoteContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      ajaxError: false,
      // Internal
      loaded: false,
      ajaxErrorModalOpen: false,
      backdropOpen: false,
      dialogAcceptOpen: false,
      dialogRejectOpen: false,
      // Internal ./end

      // Summary
      grossPremium: '',
      grossPremiumRate: '',
      totalSumInsured: '',
      commission: '',
      status: '',
      // Summary ./end

      // Stack
      customerName: '',
      customerAddress: '',
      basisOfSumInsured: '',
      inceptionDate: '',
      expiryDate: '',
      coverages: [
      ],
      exclusions: [],
      currency: '',
      // Stack ./end
    };

    this.id = this.props.match.params.id;

    this.handleCreateNewPolicy = this.handleCreateNewPolicy.bind(this);
    this.handleRejectPolicy = this.handleRejectPolicy.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentDidMount() {
    GetToken().then(token => {
      Ajax.getData(`${window.appConfig.apiUrl}/internal/quotes/${this.id}`, token)
      .then(data => {
        const premiumAmount = get(data, 'grossPremium.amount');
        const premiumCurrency = get(data, 'grossPremium.currency');
        const grossPremiumRate = get(data, 'grossPremiumRatePct');
        const totalSumAmount = get(data, 'totalSumInsured.amount')
        const totalSumCurrency = get(data, 'totalSumInsured.currency');
        const customerName = get(data, 'customer.name');
        const customerAddress = get(data, 'customer.address');
        const currency = get(data, 'totalSumInsured.currency');
        
        const { name, inceptionDate, expiryDate } = data;

        this.setState({
          grossPremium: premiumAmount ? `${premiumCurrency} ${parseFloat(premiumAmount.toLocaleString()).toFixed(2)}` : '---',
          grossPremiumRate: Format.percentageWrapFormat(grossPremiumRate),
          totalSumInsured: totalSumAmount ? `${totalSumCurrency} ${totalSumAmount.toLocaleString()}` : '---',
          commission: data.commissionRate ? Format.percentageWrapFormat(data.commissionRate) : null,
          technicalPricingReportId: get(data, 'aggregatedPricingReportId'),
          quotationDocumentId: get(data, 'quoteDocumentId'),
          customerName: customerName,
          customerAddress,
          title: name,
          currency: currency,
          coverages: parseCoverages(data.quoteItems),
          exclusions: data.exclusions ? data.exclusions.split(/\r?\\n/) : '',
          loaded: true,
          status: data.status,
          id: data.id,
          inceptionDate,
          expiryDate,
          basisOfSumInsured: get(data, 'sumInsuredBasis'),
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

  handleCreateNewPolicy () {
    const URI = `${window.appConfig.apiUrl}/internal/policies`;

    const payload = {
      '@type': "NewPolicyFromQuote",
      quoteId: this.state.id,
    }

    this.setState({
      backdropOpen: true,
      dialogAcceptOpen: false,
    }, () => {
      GetToken().then(token => {
        Ajax.postData(URI, payload, token).then(response => {
          redirect(`/policies/policy/${response.id}`);
        }).catch(error => {
          this.setState({
            ajaxError: true,
            backdropOpen: false,
          })
          console.error('error', error)
        });
      });
    });
  }

  handleRejectPolicy () {
    const URI = `${window.appConfig.apiUrl}/internal/quotes/${this.state.id}`;

    console.log('hey');

    this.setState({
      backdropOpen: true,
      dialogRejectOpen: false,
    }, () => {
      GetToken().then(token => {
        Ajax.deleteData(URI, token)
          .then(response => {
            // success
          })
          .catch(error => {
            this.setState({
              ajaxError: true,
            })
            console.error('error', error)
          })
          // Always executed.
          .finally(() => {
            this.setState({
              backdropOpen: false,
            });
          });
      });
    });
  };

  handleDialogOpen (dialogId) {
    this.setState({
      [dialogId]: true,
    });
  }

  handleDialogClose (dialogId) {
    this.setState({
      [dialogId]: false,
    });
  }

  render () {
    const {
      grossPremium,
      grossPremiumRate,
      commission,
      totalSumInsured,
      technicalPricingReportId,
      quotationDocumentId,
      customerName,
      customerAddress,
      title,
      loaded,
      inceptionDate,
      expiryDate,
      coverages,
    } = this.state;

    const handleDownload = this.handleDownload;

    return (
      <>
        <Quote
          ajaxError={this.state.ajaxError}
          commission={commission}
          customerName={customerName}
          customerAddress={customerAddress}
          coverages={coverages}
          dialogAcceptOpen={this.state.dialogAcceptOpen}
          dialogRejectOpen={this.state.dialogRejectOpen}
          grossPremium={grossPremium}
          grossPremiumRate={grossPremiumRate}
          onCreateNewPolicy={this.handleCreateNewPolicy}
          onRejectPolicy={this.handleRejectPolicy}
          onDialogClose={this.handleDialogClose}
          onDialogOpen={this.handleDialogOpen}
          onDownload={handleDownload}
          pricingReport={technicalPricingReportId}
          quoteDocument={quotationDocumentId}
          status={this.state.status}
          title={title}
          totalSumInsured={totalSumInsured}
          loaded={loaded}
          inceptionDate={inceptionDate}
          expiryDate={expiryDate}
          backdropOpen={this.state.backdropOpen}
        />
      </>
    )
  }
}

export default withRouter(QuoteContainer);
