import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class VehicleAssistance extends Component {
  render() {

    const { handleSuperChange, assistance_list, deleterow, vehicle_assistance, read_only } = this.props

    var buttonAssistance = {}
    if (read_only) {
      buttonAssistance = { display: 'none' }
    } else {
      buttonAssistance = { display: 'block' }
    }

    var assistance = Object.keys(this.props.units).map(function (key, index) {
      return (
        <div key={index}>
          <Row>
            <Col md="6">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">Jenis Bantuan Kendaraan</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input type="select" id={'unit_type'} onChange={handleSuperChange} name={'unit_type'} bsSize="sm" value={vehicle_assistance[index]['unit_type']} disabled={read_only}>
                    <option value="">-</option>
                    {assistance_list}
                  </Input>
                </Col>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">Jumlah</Label>
                </Col>
                <Col xs="12" md="3">
                  <Input type="number" id={'unit_number'} onChange={handleSuperChange} name={'unit_number'} bsSize="sm" value={vehicle_assistance[index]['unit_number']} disabled={read_only} />
                </Col>
                <Col xs="12" md="" style={buttonAssistance}>
                  <Button color="danger" size="sm" className="float-right" title="Hapus bantuan" onClick={deleterow}>
                    <i className="fa fa-close"></i>
                  </Button>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="text-input">Waktu Kedatangan</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input type="datetime-local" id={'unit_time-arrival'} onChange={handleSuperChange} name={'unit_time-arrival'} bsSize="sm" value={vehicle_assistance[index]['unit_time-arrival']} disabled={read_only} />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <hr className="mt-0" />
        </div>
      )
    })

    return (
      <div>
        <Row>
          <Col lg="8">
            <h6>Bantuan Kendaraan</h6>
          </Col>
          <Col style={buttonAssistance}>
            <Button color="success" size="sm" className="float-right" onClick={this.props.addrow} style={{ marginTop: '-10px' }} >
              Tambah Bantuan
            </Button>
          </Col>
        </Row>
        <hr className="mt-0" />
        {assistance}
      </div >
    )
  }

}
const mappropsToProps = (props) => {
  return {
    myIdentity: props.user.myIdentity,
  }
}
export default connect(mappropsToProps)(VehicleAssistance)