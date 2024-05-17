import React, { Component } from 'react';
import Partners from "./Partners";
import queryStr from '../../Util/queryString';

import Ajax, { GetToken } from '../../Util/ajax';

class PartnersContainer extends Component {
  constructor () {
    super();

    this.API = {
      getUri: `${window.appConfig.apiUrl}/internal/business-partners`,
    };

    this.state = {
      partners: [],
      loaded: false,
      refreshLoading: false,
      tabs: [
        'Policy holder',
        'Insurer',
        'Risk carrier',
        'Intermediary',
        'Issuer',
        'Insured',
        'Distributor'
      ],
      tabIndex: 0,
      filterKey: 'POLICY_HOLDER',
      page: 0,
      rowsPerPage: 15,
      totalPages: 0,
      totalElements: 0,
    };

    this.command = queryStr('command');

    // Method binding.
    this.getPartners = this.getPartners.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleTabChange(event, value) {
    let filterKey = 'POLICY_HOLDER'; // Used to filter coverages by status.

    if (value === 0) {
      filterKey = 'POLICY_HOLDER';
    } else if (value === 1) {
      filterKey = 'INSURER';
    } else if (value === 2) {
      filterKey = 'RISK_CARRIER';
    } else if (value === 3) {
      filterKey = 'INTERMEDIARY';
    } else if (value === 4) {
      filterKey = 'ISSUER';
    } else if (value === 5) {
      filterKey = 'INSURED';
    } else if (value === 6) {
      filterKey = 'DISTRIBUTOR';
    }

    this.setState({
      tabIndex: value,
      page: 0,
      filterKey,
    }, () => {
      this.getPartners()
    })
  }
  
  getPartners () {
    this.setState({
      loaded: false,
    }, () => {
      const API_URL = `${this.API.getUri}?page=${this.state.page}&size=${this.state.rowsPerPage}&role=${this.state.filterKey}`;
      GetToken().then(token => {
        Ajax.getData(API_URL, token)

          .then(data => {
            this.setState({
              partners: data?.content ?? [],
              loaded: true,
              refreshLoading: false,
              totalPages: data?.totalPages ?? 0,
              totalElements: data?.totalElements ?? 0,
            });
          })
          .catch((error) => {
            this.setState({
              loaded: true,
            });
            console.log('error', error)
          });
      });
    });
  }

  handleReload () {
    this.setState({
      loaded: false,
      refreshLoading: true,
      filterKey: 'POLICY_HOLDER',
      tabIndex: 0,
      page: 0,
    }, () => {
      this.getPartners();
    })
  }
  
  handlePageChange(event, value) {
    this.setState({
      page: value,
    }, () => {
      this.getPartners()
    })
  }

  componentDidMount () {
    this.getPartners();
  }

  render () {
    const {
      partners,
      loaded,
      refreshLoading,
      tabs,
      tabIndex,
      page,
      rowsPerPage,
      totalElements,
      totalPages
    } = this.state;

    return (
      <Partners
        onReload={this.handleReload}
        onTabChange={this.handleTabChange}
        refreshLoading={refreshLoading}
        partners={partners}
        loaded={loaded}
        tabs={tabs}
        tabIndex={tabIndex}
        page={page}
        rowsPerPage={rowsPerPage}
        totalElements={totalElements}
        totalPages={totalPages}
        onChangePage={this.handlePageChange}
      />
    );
  }
}

export default PartnersContainer;
