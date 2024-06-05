import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginActions } from '../../store/action'

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class DropdownMenuCommandPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      buttonMenu: false,
      menuList: []
    };
    this.toggle = this.toggle.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  navigate(url) {
    this.props.history.push(url)
  }

  signOut(e) {
    const { dispatch } = this.props;
    dispatch(loginActions.logout());
    this.props.history.push('/login')
  }

  componentWillMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    const { myAccess } = this.props
    if (identity.ID_GROUP === 5) {
      this.setState({
        buttonMenu: true,
        menuList: myAccess.items[0].children
      });
    }
  }

  render() {
    var buttonMenuStyle = { display: 'none' }

    if (this.state.buttonMenu) {
      buttonMenuStyle = { display: 'block', marginLeft: '15px' }
    }

    var menuList = this.state.menuList
    var menu = menuList.map((value, index) => {
      return (
        <DropdownItem onClick={(e) => this.navigate(value.url)} key={index}>{value.name}</DropdownItem>
      )
    })

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="float-right" style={buttonMenuStyle}>
        <DropdownToggle color="success" title="Click to open menu" size="sm">
          <i className="fa fa-bars"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Menu</DropdownItem>
          {menu}
          <DropdownItem onClick={(e) => this.signOut()}>Logout</DropdownItem>
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

export default withRouter(connect(mapStateToProps)(DropdownMenuCommandPanel))