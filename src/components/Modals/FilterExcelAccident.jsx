import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { senkomExcelActions } from '../../store/action'
import DownloadDataAccident from '../Excel/accidentExcel';

const initialState = {
  data: '',
  start_date: '',
  end_date: '',
  gangguan: '',
  hideButton: false,
  excelButton: false

}

class FilterExcelAccident extends Component {
  constructor(props) {
    super(props);
    this.state = initialState

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { myIdentity, dispatch } = this.props
    var formData = {
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      branch: myIdentity.branch_code
    }

    this.setState({
      hideButton: true,
      excelButton: true
    })

    dispatch(senkomExcelActions.getExcelAccident(formData));
  }

  render() {
    const { interference, senkomExcel } = this.props
    var requiredStyle = { color: 'red' }

    const excel = <DownloadDataAccident className="float-right" color="primary" dataSet1={senkomExcel} />

    let excelStyle
    if (this.state.excelButton) {
      excelStyle = { display: 'block' }
    } else {
      excelStyle = { display: 'none' }
    }

    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={'modal-lg ' + this.props.className}>
        <Form onSubmit={this.handleSubmit} noValidate>
          <ModalHeader toggle={this.props.toggle}>{this.state.type} Export Data Accident to Excel
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Start Date<span style={requiredStyle}>*</span></Label>
              </Col>
              <Col xs="12" md="4">
                <Input type="date" id="start_date" name="start_date" bsSize="sm" value={this.state.start_date} onChange={this.handleChange} />
              </Col>
              <Col md="2">
                <Label htmlFor="text-input">End Date<span style={requiredStyle}>*</span></Label>
              </Col>
              <Col xs="12" md="4">
                <Input type="date" id="end_date" name="end_date" bsSize="sm" value={this.state.end_date} onChange={this.handleChange} />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Search</Button>
            <Button color="secondary" color="danger" onClick={this.props.onclose}>Close</Button>
            <div style={excelStyle}>
              {excel}
            </div>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    senkom_detail: state.senkom_detail.senkom_detail,
    senkom_bantuan: state.senkom_detail.senkom_bantuan,
    senkomExcel: state.senkomExcel.senkomExcel,
  }
}
export default connect(mapStateToProps)(FilterExcelAccident)

