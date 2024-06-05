import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import validate from './Validate';
import renderField from './RenderField.js';
import {
  Row,
  Col,
  Button,
  Label,
  Input
} from 'reactstrap';

let NewSenkomSecondPage = props => {
  const { handleSubmit, accidentOption, previousPage, disabled } = props;

  const renderFieldAccidentPosition = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Posisi Kecelakaan --</option>
        {accidentOption.accident_position.map((val, index) => {
          return (
            <option value={val.ID_ACCIDENT_POSITION} key={index}>
              {val.POSITION_NAME}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldAccidentWeather = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Cuaca --</option>
        {accidentOption.accident_weather.map((val, index) => {
          return (
            <option value={val.ID_ACCIDENT_WEATHER} key={index}>
              {val.WEATHER_NAME}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldAccidentType = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Jenis Kecelakaan --</option>
        {accidentOption.accident_type.map((val, index) => {
          return (
            <option value={val.ID_ACCIDENT_TYPE} key={index}>
              {val.ACCIDENT_TYPE}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldAccidentCause = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Penyebab Kecelakaan --</option>
        {accidentOption.accident_cause.map((val, index) => {
          return (
            <option value={val.ID_ACCIDENT_CAUSE} key={index}>
              {val.ACCIDENT_CAUSE}
            </option>
          )
        })}
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldGender = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Jenis Kelamin --</option>
        <option value="m">Pria</option>
        <option value="f">Wanita</option>
      </select>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  const renderFieldChronology = ({ input, meta: { touched, error } }) => (
    <div>
      <textarea className="form-control" {...input} rows="5" disabled={disabled}>
      </textarea>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );

  return (
    <Row>
      <Col>
        <form onSubmit={handleSubmit}>
          <h6><b>Informasi Kecelakaan</b></h6>
          <Row>
            <Col md="2">
              <label>Posisi</label>
            </Col>
            <Col md="4">
              <Field
                name="accident_position"
                component={renderFieldAccidentPosition}
              />
            </Col>
            <Col md="1">
              <label>Cuaca</label>
            </Col>
            <Col md="4">
              <Field
                name="accident_weather"
                component={renderFieldAccidentWeather}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="2">
              <label>Jenis Kecelakaan</label>
            </Col>
            <Col md="4">
              <Field
                name="accident_type"
                component={renderFieldAccidentType}
              />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <label>Penyebab Kecelakaan</label>
            </Col>
            <Col md="6">
              <Field
                name="accident_cause"
                component={renderFieldAccidentCause}
              />
            </Col>
          </Row>
          <hr style={{ boder: '1px solid #333' }} />
          <h6><b>Informasi Pengemudi</b></h6>
          <Row>
            <Col md="6">
              <Field
                name="driver_name"
                type="text"
                component={renderField}
                label="Nama"
                labelSize="4"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
            <Col md="1">
              <label>Jenis Kelamin</label>
            </Col>
            <Col md="4">
              <Field
                name="driver_gender"
                component={renderFieldGender}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Field
                name="driver_age"
                type="number"
                component={renderField}
                label="Umur"
                labelSize="4"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
            <Col md="6">
              <Field
                name="driver_address"
                type="text"
                component={renderField}
                label="Alamat"
                labelSize="2"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
          </Row>
          <hr className="mt-0" />
          <h6><b>Informasi Korban</b></h6>
          <Row>
            <Col md="6">
              <Field
                name="light_injury"
                type="number"
                component={renderField}
                label="Luka Ringan"
                labelSize="4"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Field
                name="heavy_injury"
                type="number"
                component={renderField}
                label="Luka Berat"
                labelSize="4"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Field
                name="fatality"
                type="number"
                component={renderField}
                label="Korban Meninggal"
                labelSize="4"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
          </Row>
          <hr style={{ boder: '1px solid #333' }} />
          <Row>
            <Col md="2">
              <label><b>Kronologi Kejadian</b></label>
            </Col>
            <Col md="9">
              <Field name="chronology" component={renderFieldChronology} className="form-control" rows="10" />
            </Col>
          </Row>
          <hr style={{ boder: '1px solid #333' }} />
          <Row>
            <Col md="12">
              <Button type="submit" color="primary" className="float-right" style={{ marginLeft: '5px' }}>
                Next <i className="fa fa-angle-right"></i>
              </Button>
              <Button type="button" color="danger" className="float-left" onClick={previousPage}>
                <i className="fa fa-angle-left"></i> Back
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row >
  );
};

NewSenkomSecondPage = reduxForm({
  form: 'senkom', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount  // forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  enableReinitialize: true,
})(NewSenkomSecondPage);

export default NewSenkomSecondPage