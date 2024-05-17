import React, { Component } from 'react';
import get from 'lodash/get';
import Quotes from './Quotes';
import queryStr from '../../Util/queryString';

import Ajax, { GetToken } from '../../Util/ajax';

class QuotesContainer extends Component {
  constructor () {
    super();

    this.API = {
      getUri: `${window.appConfig.apiUrl}/internal/quotes`,
    };

    this.state = {
      quotes: [],
      loaded: false,
      refreshLoading: false,
      tabs: [
        'All',
        'Created',
        'Completed',
        'Accepted',
        'Rejected',
      ],
      tabIndex: 2,
      filterKey: 'COMPLETED',
      page: 0,
      rowsPerPage: 15,
      totalPages: 0,
      totalElements: 0,
    };

    this.command = queryStr('command');

    // Method binding.
    this.getQuotes = this.getQuotes.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleTabChange(event, value) {
    let filterKey = 'ALL'; // Used to filter coverages by status.

    if (value === 0) {
      filterKey = 'ALL';
    } else if (value === 1) {
      filterKey = 'CREATED';
    } else if (value === 2) {
      filterKey = 'COMPLETED';
    } else if (value === 3) {
      filterKey = 'ACCEPTED';
    } else if (value === 4) {
      filterKey = 'REJECTED';
    }
    
    this.setState({
      tabIndex: value,
      page: 0,
      filterKey,
    }, () => {
      this.getQuotes()
    })
  }
  
  getQuotes () {
    this.setState({
      loaded: false,
    }, () => {
      let API_URL = `${this.API.getUri}?page=${this.state.page}&size=${this.state.rowsPerPage}`;
      if (this.state.filterKey !== 'ALL') {
        API_URL = `${API_URL}&status=${this.state.filterKey}`
      }
      GetToken().then(token => {
        Ajax.getData(API_URL, token)
          .then(data => {
            this.setState({
              quotes: data?.content ?? [],
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
  
  handlePageChange(event, value) {
    this.setState({
      page: value,
    }, () => {
      this.getQuotes()
    })
  }
  
  handleReload () {
    this.setState({
      loaded: false,
      refreshLoading: true,
      filterKey: 'DRAFT',
      tabIndex: 0,
      page: 0,
    }, () => {
      this.getQuotes();
    })
  }

  componentDidMount () {
    this.getQuotes();
  }

  render () {
    const { loaded, refreshLoading, tabs, tabIndex } = this.state;

    return (
      <Quotes
        onReload={this.handleReload}
        onTabChange={this.handleTabChange}
        refreshLoading={refreshLoading}
        quotes={this.state.quotes}
        loaded={loaded}
        tabs={tabs}
        tabIndex={tabIndex}
        page={this.state.page}
        rowsPerPage={this.state.rowsPerPage}
        totalElements={this.state.totalElements}
        totalPages={this.state.totalPages}
        onChangePage={this.handlePageChange}
      />
    );
  }
}

export default QuotesContainer;
