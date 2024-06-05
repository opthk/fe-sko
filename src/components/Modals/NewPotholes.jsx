import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { potholesActions } from '../../store/action'

const initialState = {
  id_ruas: '',
  lokasi_sta: '',
  lane: '',
  lajur: '',
  jenis_kerusakan: '',
  tanggal_temuan: '',
  tanggal_perbaikan: '',
  priority: '',
  progress: '',
  deskripsi: '',
}

class NewPotholes extends Component {
  constructor(props) {
    super(props);
    this.state = initialState

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))

    e.preventDefault();
    var formPotholes = {
      id_potholes: this.props.id_potholes,
      updated_by: identity.id_user,
      id_ruas: this.state.id_ruas,
      lokasi_sta: this.state.lokasi_sta,
      lane: this.state.lane,
      lajur: this.state.lajur,
      jenis_kerusakan: this.state.jenis_kerusakan,
      priority: this.state.priority,
      tanggal_temuan: this.state.tanggal_temuan,
      tanggal_perbaikan: this.state.tanggal_perbaikan,
      progress: this.state.progress,
      deskripsi: this.state.deskripsi
    }
    if (this.props.add) {
      dispatch(potholesActions.createDataPotholes(formPotholes, identity.branch_code));
    } else {
      dispatch(potholesActions.updateDataPotholes(formPotholes, identity.branch_code));
    }
  }
  
  resetField = (e) => {
    this.setState(initialState);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, toastr } = this.props
    if (nextProps.add) {
      this.resetField()
    } else {
      if (this.props.id_potholes !== nextProps.id_potholes) {
        dispatch(potholesActions.getDataPotholes(nextProps.id_potholes));
      }
      if (this.props.potholes_detail !== nextProps.potholes_detail) {
        // console.log(nextProps.potholes_detail[0])
        this.setState({
          id_ruas: nextProps.potholes_detail[0].ID_RUAS,
          id_potholes: nextProps.potholes_detail[0].ID_POTHOLES,
          lokasi_sta: nextProps.potholes_detail[0].LOKASI_STA,
          lane: nextProps.potholes_detail[0].LANE,
          lajur: nextProps.potholes_detail[0].LAJUR,
          jenis_kerusakan: nextProps.potholes_detail[0].JENIS_KERUSAKAN,
          priority: nextProps.potholes_detail[0].PRIORITY,
          tanggal_temuan: nextProps.potholes_detail[0].TANGGAL_TEMUAN,
          tanggal_perbaikan: nextProps.potholes_detail[0].TANGGAL_PERBAIKAN,
          progress: nextProps.potholes_detail[0].PROGRESS,
          deskripsi: nextProps.potholes_detail[0].DESKRIPSI,
        });
      }
    }
    if (toastr.toastrs.length > 0 && toastr.toastrs[0].type !== "error") {
      this.props.onclose()
    }

  }

  render() {
    const { ruas } = this.props
    var submitButtonStyle
    var hiddenField
    var selesaiField
    const allRuasList = ruas.map((val, index) => {
      return (
        <option value={val.ID_RUAS} key={index}>
          {val.RUAS_NAME + ' (' + val.RUAS_CODE + ')'}
        </option>
      )
    })

    if (this.props.add) {
      hiddenField = { display: 'none' }
    }
    if (parseInt(this.state.progress) !== 100) {
      selesaiField = { display: 'none' }
    } else if (parseInt(this.state.progress) === 100) {
      selesaiField = { display: 'block' }
    }

    if (this.props.view) {
      submitButtonStyle = { display: 'none' }
    }

    return (
      <Modal isOpen={this.props.modal} className={'modal-lg ' + this.props.className}>
        <Form onSubmit={this.handleSubmit} noValidate>
          <ModalHeader>Data Potholes
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Ruas<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="select" id="id_ruas" name="id_ruas" bsSize="sm" onChange={this.handleChange} value={this.state.id_ruas} disabled={this.props.read_only}>
                      <option value="">-- Pilih Ruas --</option>
                      {allRuasList}
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>STA<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="text" id="lokasi_sta" name="lokasi_sta" bsSize="sm" onChange={this.handleChange} value={this.state.lokasi_sta} disabled={this.props.read_only} />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Lane<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="select" id="lane" name="lane" bsSize="sm" onChange={this.handleChange} value={this.state.lane} disabled={this.props.read_only}>
                      <option value="">-- Pilih Lane --</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Lajur<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="text" id="lajur" name="lajur" bsSize="sm" onChange={this.handleChange} value={this.state.lajur} disabled={this.props.read_only} />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Jenis Kerusakan<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="text" id="jenis_kerusakan" name="jenis_kerusakan" bsSize="sm" onChange={this.handleChange} value={this.state.jenis_kerusakan} disabled={this.props.read_only} />
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Priority<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="select" id="priority" name="priority" bsSize="sm" onChange={this.handleChange} value={this.state.priority} disabled={this.props.read_only}>
                      <option value="">-- Pilih Priority --</option>
                      <option value="1">*</option>
                      <option value="2">**</option>
                      <option value="3">***</option>
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Waktu Temuan<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="datetime-local" id="tanggal_temuan" name="tanggal_temuan" bsSize="sm" onChange={this.handleChange} value={this.state.tanggal_temuan} disabled={this.props.read_only} />
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12" md="6" style={selesaiField}>
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Selesai Pengerjaan<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="datetime-local" id="tanggal_perbaikan" name="tanggal_perbaikan" bsSize="sm" onChange={this.handleChange} value={this.state.tanggal_perbaikan} disabled={this.props.read_only} />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row style={hiddenField}>
              <Col xs="12" md="6">
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label htmlFor="text-input"><h6>Progress<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input type="select" id="progress" name="progress" bsSize="sm" onChange={this.handleChange} value={this.state.progress} disabled={this.props.read_only}>
                      <option value="">-- Pilih Progress --</option>
                      <option value="0">0</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <FormGroup row>
                  <Col md="2" xs="12">
                    <Label htmlFor="text-input"><h6>Deskripsi<span style={this.props.requiredstyle}>*</span></h6></Label>
                  </Col>
                  <Col xs="12" md="10">
                    <Input type="textarea" name="deskripsi" id="deskripsi" rows="9" value={this.state.deskripsi} onChange={this.handleChange} disabled={this.props.read_only} />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" style={submitButtonStyle} >Submit</Button>
            <Button color="secondary" color="danger" onClick={this.props.onclose}>Close</Button>
          </ModalFooter>
        </Form>
      </Modal >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    potholes_detail: state.potholes_detail.potholes_detail,
    toastr: state.toastr
  }
}
export default connect(mapStateToProps)(NewPotholes)

