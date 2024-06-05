import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class AccidentDetail extends Component {
  render() {
    return (
      <div>
        <h6>Informasi Kecelakaan</h6>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Posisi<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="select" id="accident_position" name="accident_position" value={this.props.accident_position} bsSize="sm" onChange={this.props.handlechange} disabled={this.props.read_only}>
                  <option value="">-- Pilih Posisi Kecelakaan --</option>
                  {this.props.accident_position_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Cuaca<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="select" id="accident_weather" name="accident_weather" bsSize="sm" value={this.props.accident_weather} onChange={this.props.handlechange} disabled={this.props.read_only}>
                  <option value="">-- Pilih Cuaca --</option>
                  {this.props.accident_weather_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Jenis Kecelakaan<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="select" id="accident_type" name="accident_type" bsSize="sm" value={this.props.accident_type} onChange={this.props.handlechange} disabled={this.props.read_only} >
                  <option value="">-- Pilih Jenis Kecelakaan --</option>
                  {this.props.accident_type_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="8">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Penyebab Kecelakaan<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select" id="accident_cause" name="accident_cause" bsSize="sm" value={this.props.accident_cause} onChange={this.props.handlechange} disabled={this.props.read_only}>
                  <option value="">-- Pilih Penyebab Kecelakaan --</option>
                  {this.props.accident_cause_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <hr className="mt-0" />
        <h6>Informasi Pengemudi</h6>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Nama<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="text" id="driver_name" name="driver_name" bsSize="sm" value={this.props.driver_name} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Jenis Kelamin<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="select" id="driver_gender" name="driver_gender" bsSize="sm" value={this.props.driver_gender} onChange={this.props.handlechange} disabled={this.props.read_only}>
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="m">Pria</option>
                  <option value="f">Wanita</option>
                  <option value="unknown">Unkown</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Umur<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="number" id="driver_age" name="driver_age" bsSize="sm" value={this.props.driver_age} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Alamat<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="text" id="driver_adress" name="driver_adress" bsSize="sm" value={this.props.driver_adress} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <hr className="mt-0" />
        <h6>Informasi Korban</h6>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Luka Ringan<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="number" id="light_injury" name="light_injury" bsSize="sm" value={this.props.light_injury} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Luka Berat<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="number" id="heavy_injury" name="heavy_injury" bsSize="sm" value={this.props.heavy_injury} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Korban Meninggal<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="number" id="fatality" name="fatality" bsSize="sm" value={this.props.fatality} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <hr className="mt-0" />
        <Row>
          <Col xs="12">
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input"><h6>Kronology Kejadian<span style={this.props.requiredstyle}>*</span></h6></Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="textarea" name="chronology" id="chronology" rows="9" value={this.props.chronology} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }

}
const mappropsToProps = (props) => {
  return {
    myIdentity: props.user.myIdentity,
  }
}
export default connect(mappropsToProps)(AccidentDetail)