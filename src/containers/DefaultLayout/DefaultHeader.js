import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/logo-site.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const getUserName = () => {
  try {
    const identity = JSON.parse(localStorage.getItem('identity'));
    return (identity && identity.first_name) || '';
  } catch (e) {
    return '';
  }
};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      userName: getUserName()
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { userName } = this.state;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 85, height: 40, alt: 'Hutama Karya' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <div className="sko-header__title d-none d-md-flex">
          <strong>Sistem Kendali <span>Operasi Tol</span></strong>
          <small><span className="sko-header__dot" /> Command Center</small>
        </div>

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle nav className="sko-header__user">
                <img src={'/assets/img/avatars/download.png'} className="img-avatar" alt="Avatar" />
                {userName && <span className="sko-header__user-name d-none d-sm-inline">{userName}</span>}
                <i className="fa fa-angle-down d-none d-sm-inline" />
              </DropdownToggle>
              <DropdownMenu right>
                {userName && <DropdownItem header tag="div">{userName}</DropdownItem>}
                {this.props.editPassword && (
                  <DropdownItem onClick={e => this.props.editPassword(e)}><i className="fa fa-lock"></i> Edit Password</DropdownItem>
                )}
                {this.props.downloadDoc && (
                  <DropdownItem onClick={e => this.props.downloadDoc(e)}><i className="fa fa-file-text-o"></i> User Guide</DropdownItem>
                )}
                <DropdownItem className="sko-header__logout" onClick={e => this.props.onLogout(e)}><i className="fa fa-power-off"></i> Logout</DropdownItem>
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
