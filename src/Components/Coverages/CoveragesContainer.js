import React, { Component } from 'react';
import queryStr from '../../Util/queryString';
import Coverages from './Coverages';
import Ajax, { GetToken } from '../../Util/ajax';

class CoveragesContainer extends Component {
  constructor () {
    super();
    
    this.API = {
      getUri: `${window.appConfig.apiUrl}/internal/coverages`,
    };
    
    this.state = {
      coverages: [],
      loaded: false,
      refreshLoading: false,
      tabs: [
        'All',
        // 'In Progress',
        'Simulated',
        'Activated'
      ],
      tabIndex: 0,
      filterKey: 'all',
      page: 0,
      rowsPerPage: 15,
      totalPages: 0,
      totalElements: 0,
      search: '',
      selected: [],
    };
    
    this.command = queryStr('command');
    
    // Method binding.
    this.getCoverages = this.getCoverages.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
  }
  
  getCoverages () {
    this.setState({
      loaded: false,
    }, () => {
      let API_URL = `${this.API.getUri}?page=${this.state.page}&size=${this.state.rowsPerPage}&state=${this.state.filterKey}`;
      if (this.state.search) {
        API_URL += `&targetName=${this.state.search}`;
      }
      GetToken().then(token => {
        Ajax.getData(API_URL, token)
          
          .then(data => {
            this.setState({
              coverages: data?.content ?? [],
              loaded: true,
              refreshLoading: false,
              totalPages: data?.totalPages ?? 0,
              totalElements: data?.totalElements ?? 0,
            });
          })
          .catch((error) => {
            console.log('error', error)
          });
      });
    });
  }
  
  handleTabChange(event, value) {
    let filterKey = 'all'; // Used to filter coverages by status.
    
    if (value === 0) {
      filterKey = 'all';
    } else if (value === 1) {
      filterKey = 'simulated';
    } else if (value === 2) {
      filterKey = 'active';
    }
    
    this.setState({
      tabIndex: value,
      page: 0,
      filterKey,
      selected: [],
    }, () => {
      this.getCoverages()
    })
  }
  
  handleSearchChange(newValue) {
    this.setState({
      search: newValue
    }, () => {
      this.getCoverages()
    })
  }
  
  handlePageChange(event, value) {
    this.setState({
      page: value,
    }, () => {
      this.getCoverages()
    })
  }
  
  handleReload () {
    this.setState({
      loaded: false,
      refreshLoading: true,
      filterKey: 'all',
      tabIndex: 0,
      page: 0,
    }, () => {
      this.getCoverages();
    })
  }

  handleActivate () {
    this.setState({
      backdropOpen: true,
    }, () => {
      Promise.all(this.state.selected.map(({id}) => {
        const URI = `${window.appConfig.apiUrl}/internal/coverages/${id}/activate`;
        
        GetToken().then(token => {
          Ajax.postData(URI, {}, token).catch(error => {
            this.setState({
              ajaxError: true,
              ajaxErrorModalOpen: true,
            })
            console.error('error', error)
          })
        });
      })).then(() => {
        this.setState({
          selected: [],
        })
        this.getCoverages()
      }).finally(() => {
        this.setState({
          backdropOpen: false
        })
      })
    })
  }
  
  componentDidMount () {
    this.getCoverages();
  }
  
  render () {
    const { coverages, loaded, refreshLoading, tabs, tabIndex } = this.state;
    
    return (
      <Coverages
        onReload={this.handleReload}
        onTabChange={this.handleTabChange}
        refreshLoading={refreshLoading}
        coverages={coverages}
        loaded={loaded}
        tabs={tabs}
        tabIndex={tabIndex}
        page={this.state.page}
        rowsPerPage={this.state.rowsPerPage}
        totalElements={this.state.totalElements}
        totalPages={this.state.totalPages}
        onChangePage={this.handlePageChange}
        onSearchChange={this.handleSearchChange}
        selected={this.state.selected}
        onSelect={newVal => this.setState({selected: newVal})}
        handleActivate={this.handleActivate}
      />
    );
  }
}

export default CoveragesContainer;
