import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import validate from './Validate';
import renderField from './RenderField.js';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

let NewSenkomFirstPage = props => {
  const { handleSubmit, ruas, interference, vehicle, disabled } = props;

  const renderShift = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="input-sm form-control" disabled={disabled}>
        <option value="">-</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderLane = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const hiddenField = ({ input, type }) => (
    <input {...input} type={type} className="form-control" />
  )

  const renderFieldGangguan = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Gangguan --</option>
        {interference.map((val, index) => {
          return (
            <option value={val.ID_INTERFERENCE} key={index}>
              {val.INTERFERENCE_TYPE}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldCabang = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Cabang --</option>
        {ruas.map((val, index) => {
          return (
            <option value={val.ID_RUAS} key={index}>
              {val.RUAS_NAME + ' (' + val.RUAS_CODE + ')'}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldVehicle = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Kendaraan --</option>
        {vehicle.map((val, index) => {
          return (
            <option value={val.ID_VEHICLE} key={index}>
              {val.VEHICLE_TYPE}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md="2">
          <label><b>Gangguan</b></label>
        </Col>
        <Col md="4">
          <Field
            name="created_by"
            type="hidden"
            component={hiddenField}
          />
          <Field
            name="id_senkom_handling"
            type="hidden"
            component={hiddenField}
          />
          <Field
            name="id_interference"
            component={renderFieldGangguan}
          />
        </Col>
      </Row>
      <br />
      <hr className="mt-0" />
      <h6><b>Waktu dan Lokasi</b></h6>
      <Row>
        <Col md="2">
          <label>Pilih Cabang</label>
        </Col>
        <Col md="6">
          <Field
            name="branch"
            component={renderFieldCabang}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col md="6">
          <Field
            name="event_time"
            type="datetime-local"
            component={renderField}
            label="Waktu Kejadian"
            labelSize="4"
            inputSize="8"
            disabled={disabled}
          />
        </Col>
        <Col md="1">
          <label>Shift</label>
        </Col>
        <Col md="2">
          <Field
            name="shift"
            component={renderShift}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Field
            name="event_clear"
            type="datetime-local"
            component={renderField}
            label="TKP Clear"
            labelSize="4"
            inputSize="8"
            disabled={disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Field
            name="sta"
            type="text"
            component={renderField}
            label="STA"
            labelSize="4"
            inputSize="8"
            disabled={disabled}
          />
        </Col>
        <Col md="1">
          <label>Lane</label>
        </Col>
        <Col md="2">
          <Field
            name="lane"
            component={renderLane}
          />
        </Col>
      </Row>
      <hr className="mt-0" />
      <h6><b>Kendaraan</b></h6>
      <Row>
        <Col md="2">
          <label>Tipe Kendaraan</label>
        </Col>
        <Col md="4">
          <Field
            name="id_vehicle"
            component={renderFieldVehicle}
          />
        </Col>
        <Col md="6">
          <Field
            name="vehicle_identification"
            type="text"
            component={renderField}
            label="Plat Nomor"
            labelSize="4"
            inputSize="8"
            disabled={disabled}
          />
        </Col>
      </Row>
      <hr style={{ boder: '1px solid #333' }} />
      <Row>
        <Col>
          <Button type="submit" color="primary" className="float-right" >
            Next <i className="fa fa-angle-right"></i>
          </Button>
        </Col>
      </Row>
    </form>
  );
};

NewSenkomFirstPage = reduxForm({
  form: 'senkom', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  validate,
  enableReinitialize: true,
})(NewSenkomFirstPage);

export default NewSenkomFirstPage
