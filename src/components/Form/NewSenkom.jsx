import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Container,
} from 'reactstrap';
import { senkomActions } from '../../store/action'
import NewSenkomFirstPage from './NewSenkomFirstPage';
import NewSenkomSecondPage from './NewSenkomSecondPage';
import NewSenkomThirdPage from './NewSenkomThirdPage';
import validate from './Validate';


class NewSenkom extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      page: 1,
      tempInterference: false
    };
    this.closeModal = this.closeModal.bind(this);

  }

  nextPage(values) {
    console.log(values)
    if (values.id_interference === "1" || values.id_interference === 1) {
      this.setState({ page: this.state.page + 1, tempInterference: values.id_interference });
    } else {
      this.setState({ page: this.state.page + 2, tempInterference: values.id_interference });
    }
  }

  previousPage() {
    if (this.state.tempInterference === "1" || this.state.tempInterference === 1) {
      this.setState({ page: this.state.page - 1 });
    } else {
      this.setState({ page: 1 });
    }
  }

  onSubmit(values) {
    const { dispatch, table_option } = this.props
    let identity = JSON.parse(localStorage.getItem('identity'))
    if (this.props.add) {
      dispatch(senkomActions.createDataSenkom(values, identity.branch_code, table_option));
    } else {
      dispatch(senkomActions.updateDataSenkom(values, identity.branch_code, table_option));
    }
    dispatch(reset('senkom'));
    this.props.onclose()
    this.setState({ page: 1 });
  }

  closeModal() {
    const { dispatch } = this.props
    this.props.onclose()
    this.setState({ page: 1 });
    dispatch(reset('senkom'));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (this.props.idsenkom !== nextProps.idsenkom) {
      dispatch(senkomActions.getDataSenkom(nextProps.idsenkom));
    }
  }

  render() {
    const { page } = this.state;
    const { ruas, interference, vehicle, accident_option, vehicle_assistance } = this.props
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.closeModal} className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.closeModal}>{this.state.type} Data Senkom
           </ModalHeader>
          <ModalBody>
            <Container>
              {page === 1 &&
                <NewSenkomFirstPage
                  onSubmit={this.nextPage}
                  ruas={ruas}
                  interference={interference}
                  vehicle={vehicle}
                  disabled={this.props.view}
                />}
              {page === 2 &&
                <NewSenkomSecondPage
                  previousPage={this.previousPage}
                  onSubmit={this.nextPage}
                  accidentOption={accident_option}
                  disabled={this.props.view}
                />}
              {page === 3 &&
                <NewSenkomThirdPage
                  previousPage={this.previousPage}
                  onSubmit={this.onSubmit}
                  vehicleAssistance={vehicle_assistance}
                  disabled={this.props.view}
                />}
            </Container>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

NewSenkom = reduxForm({
  form: 'senkom', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  // forceUnregisterOnUnmount: true,
})(NewSenkom);

NewSenkom = connect(
  state => ({
    initialValues: state.senkom_detail.senkom_detail,
  }),
)(NewSenkom)

export default NewSenkom
