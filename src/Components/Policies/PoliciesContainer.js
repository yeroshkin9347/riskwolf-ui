import React, { Component } from 'react';
import Ajax, { GetToken } from '../../Util/ajax';
import Policies from './Policies';

class PoliciesContainer extends Component {
  constructor () {
    super();

    this.API = {
      getUri: `${window.appConfig.apiUrl}/internal/policies`,
    };

    this.state = {
      loaded: false,
      policies: [],
      cards: [
        {
          content: 'Number of policies ',
          title: 0,
        },
        {
          content: 'Gross Written Premiums',
          title: 0,
        },
        {
          content: 'Total Losses',
          title: 0,
        },
        {
          content: 'Loss Ratio',
          title: 0,
        },
      ],
      page: 0,
      rowsPerPage: 15,
      totalPages: 0,
      totalElements: 0,
    };

    // Method binding.
    this.getPolicies = this.getPolicies.bind(this);
    this.getPolicySummary = this.getPolicySummary.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  getPolicies () {
    this.setState({
      loaded: false,
    }, () => {
      const API_URL = `${this.API.getUri}?page=${this.state.page}&size=${this.state.rowsPerPage}`;
      GetToken().then(token => {
        Ajax.getData(API_URL, token)

          .then(data => {
            const cards = [...this.state.cards];

            cards[0].title = data?.totalElements ?? 0;

            this.setState({
              policies: data?.content ?? [],
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

  getPolicySummary () {
    this.setState({
      loaded: false,
    }, () => {
      Ajax.getData(`${window.appConfig.apiUrl}/mock/policies/summary`)
        .then((data) => {
          const cards = [...this.state.cards];

          cards[1].title = data?.numberOfClaims ?? '---';
          cards[2].title = data?.totalPremiumIncome ?? '---';
          cards[3].title = data?.totalLosses ?? '---';

          this.setState({
            cards,
            loaded: true,
            refreshLoading: false,
          });
        })
        .catch((error) => {
          this.setState({
            loaded: true,
          });
          console.log('error', error)
        });
    });
  }

  handlePageChange(event, value) {
    this.setState({
      page: value,
    }, () => {
      this.getPolicies()
    })
  }

  componentDidMount() {
    this.getPolicySummary();
    this.getPolicies();
  }

  render() {

    return (
      <Policies
        cards={this.state.cards}
        loaded={this.state.loaded}
        policies={this.state.policies}
        page={this.state.page}
        rowsPerPage={this.state.rowsPerPage}
        totalElements={this.state.totalElements}
        totalPages={this.state.totalPages}
        onChangePage={this.handlePageChange}
      />
    )
  }
}

export default PoliciesContainer;
