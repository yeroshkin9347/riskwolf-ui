import React, { Component } from 'react';
import Header from './Header';

class HeaderContainer extends Component {
  constructor (props) {
    super();
    this.state = {
      anchorEl: null,
      auth: null,
      open: false,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu (event) {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget)
    });
  }

  handleClose () {
    this.setState({
      anchorEl: null,
      open: false
    });
  }

  render () {
    return (
      <Header
        anchorEl={this.state.anchorEl}
        open={this.state.open}
        handleMenu={this.handleMenu}
        handleClose={this.handleClose}
        drawerToggle={this.props.drawerToggle}
      />
    );
  }
}

export default HeaderContainer;
