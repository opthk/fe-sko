import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class Reporter extends Component {
  render() {
    return (
      <div>
        <h6>Reporter Information</h6>
        <Row>
          <Col xs="8">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Nama<span style={this.props.requiredstyle}>*</span></Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" id="reporter_name" name="reporter_name" bsSize="sm" value={this.props.reporter_name} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="text-input">Telp</Label>
              </Col>
              <Col xs="12" md="8">
                <Input type="text" id="reporter_phone" name="reporter_phone" bsSize="sm" value={this.props.reporter_phone} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="text-input">Deskripsi</Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="textarea" name="information" id="information" rows="9" value={this.props.information} onChange={this.props.handlechange} disabled={this.props.read_only} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div >
    )
  }

}
const mappropsToProps = (props) => {
  return {
    myIdentity: props.user.myIdentity,
  }
}
export default connect(mappropsToProps)(Reporter)