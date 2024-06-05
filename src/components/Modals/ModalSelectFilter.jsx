import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class ModalSelectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  render() {
    return (
      <Modal isOpen={this.props.modalfilter} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader > Pilih Filter Data Transaksi</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label htmlFor="filter">Jenis Filter</Label>
                <Input type="select" name="filter_type" id="filter_type" bsSize="sm" onChange={this.props.changefilter} >
                  <option value="">-- Pilih Filter --</option>
                  <option value="0">Hari ini</option>
                  <option value="1">Harian</option>
                  <option value="2">Bulanan</option>
                  <option value="3">Tahunan</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={this.props.switchmodal}>Select</Button>
        </ModalFooter>
      </Modal>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
  }
}
export default connect(mapStateToProps)(ModalSelectFilter)

