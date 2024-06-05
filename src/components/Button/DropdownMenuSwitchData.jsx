import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class DropdownMenuSwitchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="float-right" style={{ display: 'block' }}>
        <DropdownToggle color="danger" title="Click to switch data" size="sm">
          <i className="fa fa-exchange"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Switch Data</DropdownItem>
          <DropdownItem onClick={(e) => this.props.switch_data(0)}>Profit Sharing Data </DropdownItem>
          <DropdownItem onClick={(e) => this.props.switch_data(1)}>End Of Journal Data</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myAccess: state.user.myAccess,
  }
}

export default withRouter(connect(mapStateToProps)(DropdownMenuSwitchData))