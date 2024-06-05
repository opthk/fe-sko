import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/logo-site.png'
// import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 85, height: 40, alt: 'Site Logo Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle nav>
                <img src={'../../assets/img/avatars/download.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={e => this.props.editPassword(e)}><i className="fa fa-lock"></i> Edit Password</DropdownItem>
                <DropdownItem onClick={e => this.props.downloadDoc(e)}><i className="fa fa-file"></i> User Guide</DropdownItem>
                <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-power-off"></i> Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
