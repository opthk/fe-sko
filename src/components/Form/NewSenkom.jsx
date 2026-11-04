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
import axios from 'axios';
import { senkomActions } from '../../store/action'
import { config } from '../../config'
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
      tempInterference: false,
      minDate: ''
    };
    this.closeModal = this.closeModal.bind(this);
  }

  calcMinDate = (date) => {
    let year, month, day;
    if (date.getDate() < 3) {
      const prev = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      year = prev.getFullYear();
      month = prev.getMonth() + 1;
      day = 1;
    } else {
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = 3;
    }
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00`;
  }

  fetchServerTime = () => {
    const token = localStorage.getItem('x-access-token');
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/senkom/data', {
      headers: { 'x-access-token': token },
      params: { option: { rowsPerPage: 1, page: 0 } }
    }).then(response => {
      const serverDate = response.headers['date'] ? new Date(response.headers['date']) : new Date();
      this.setState({ minDate: this.calcMinDate(serverDate) });
    }).catch(() => {
      this.setState({ minDate: this.calcMinDate(new Date()) });
    });
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
    if (!this.props.modal && nextProps.modal && nextProps.add) {
      this.fetchServerTime();
    }
  }

  render() {
    const { page } = this.state;
    const { ruas, interference, vehicle, accident_option, vehicle_assistance } = this.props
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.closeModal} className={`modal-lg sko-modal-dark ${this.props.className || ''}`}>
          <ModalHeader toggle={this.closeModal}>
            {this.props.add ? 'Tambah' : this.props.edit ? 'Edit' : 'Detail'} Data Senkom
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
                  minDate={this.props.add ? this.state.minDate : undefined}
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
