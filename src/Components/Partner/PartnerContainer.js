import React, { Component} from 'react';

import Partner from './Partner';

class PartnerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      loaded: false,
      company: 'AIS',
      type: 'Policy holder',
      name: 'Sam Smith',
      email: 'sams.s@ais.com',
      phone: '+00 111 222 333',
      website: 'www.ais.co.th',
      notes: 'Total Access Communication Public Company Limited, commonly known as AIS, is the third-largest GSM mobile phone provider in Thailand after AIS and True.'
    };

    this.id = (this.props.match && this.props.match.params && this.props.params.id) ? this.props.match.params.id : '';

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.setState({edit: true});
  }

  render () {
    const {
      edit,
      company,
      type,
      name,
      email,
      phone,
      website,
      notes } = this.state;

    const { mode } = this.props;

    return <Partner
      mode={mode}
      edit={edit}
      title="AIS (Policy Holder)"
      company={company}
      type={type}
      name={name}
      email={email}
      phone={phone}
      website={website}
      notes={notes}
      onEdit={this.handleEdit}
      />
  }
}

export default PartnerContainer;