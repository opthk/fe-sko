import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class Event extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input"><h6>Gangguan<span style={this.props.requiredstyle}>*</span></h6></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="select" id="id_interference" name="id_interference" bsSize="sm" onChange={this.props.handlechange} value={this.props.id_interference} disabled={this.props.read_only}>
                  <option value="">-- Pilih Gangguan --</option>
                  {this.props.interference_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <hr className="mt-0" />
        <h6>Waktu dan Lokasi</h6>
        <Row>
          <Col xs="8">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Cabang<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select" id="branch" name="branch" bsSize="sm" onChange={this.props.handlechange} value={this.props.branch} disabled={this.props.read_only} >
                  <option value="">-- Pilih Cabang --</option>
                  {this.props.all_ruas_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Waktu Kejadian<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="datetime-local" id="event_time" name="event_time" bsSize="sm" onChange={this.props.handlechange} value={this.props.event_time} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Shift<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="3">
                <Input type="select" id="shift" name="shift" bsSize="sm" onChange={this.props.handlechange} value={this.props.shift} disabled={this.props.read_only} >
                  <option value="">-</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">TKP Clear<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="datetime-local" id="event_clear" name="event_clear" bsSize="sm" onChange={this.props.handlechange} value={this.props.event_clear} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">STA<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="text" id="sta" name="sta" bsSize="sm" onChange={this.props.handlechange} value={this.props.sta} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Lane<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="3">
                <Input type="select" id="lane" name="lane" bsSize="sm" onChange={this.props.handlechange} value={this.props.lane} disabled={this.props.read_only}>
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <hr className="mt-0" />
        <h6>Kendaraan</h6>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Tipe<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="select" id="id_vehicle" name="id_vehicle" bsSize="sm" onChange={this.props.handlechange} value={this.props.id_vehicle} disabled={this.props.read_only} >
                  <option value="">-- Pilih Tipe Kendaraan --</option>
                  {this.props.vehicle_list}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Plat Nomor<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="text" id="vehicle_identification" name="vehicle_identification" onChange={this.props.handlechange} bsSize="sm" value={this.props.vehicle_identification} disabled={this.props.read_only} style={{ textTransform: "uppercase" }} />
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
export default connect(mappropsToProps)(Event)