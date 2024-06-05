import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import ModalFiltering from '../Modals/ModalFiltering';

class Filtering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      dropdownOpen: false,
      modal: false,
      typeForm: '',
    };

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleModal(val) {
    var type
    if (isNaN(val)) {
      type = ''
    }
    else {
      type = val
    }

    this.setState(prevState => ({
      modal: !prevState.modal,
      typeForm: type,
    }));
  }


  render() {
    return (
      <div>
        <Card style={{ marginBottom: 0.5 + 'rem' }}>
          <CardBody>
            <ButtonDropdown size="lg" direction="left" className="mr-1 float-right" isOpen={this.state.dropdownOpen} toggle={() => { this.toggle() }}>
              <DropdownToggle caret size="sm" color="success">
                Filter
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Filter data chart by</DropdownItem>
                <DropdownItem onClick={() => this.toggleModal(0)}>Date</DropdownItem>
                <DropdownItem onClick={() => this.toggleModal(1)}>Daily</DropdownItem>
                <DropdownItem onClick={() => this.toggleModal(2)}>Monthly</DropdownItem>
                <DropdownItem onClick={() => this.toggleModal(3)}>Yearly</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </CardBody>
        </Card>
        <ModalFiltering modal={this.state.modal} toggle={this.toggleModal} filtertype={this.state.typeForm} />
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    bank: state.monthlySettlement.settlementByBankMonthly,
  }
}
export default connect(mapStateToProps)(Filtering)