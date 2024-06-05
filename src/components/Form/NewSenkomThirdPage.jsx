import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import validate from './Validate';
import renderField from './RenderField.js';
import {
  Row,
  Col,
  Button,
  Label,
  FormGroup
} from 'reactstrap';

const NewSenkomThirdPage = props => {

  const { handleSubmit, previousPage, vehicleAssistance, disabled } = props;

  const renderFieldVehicleAsisstance = ({ input, meta: { touched, error } }) => (
    <FormGroup>
      <Label for="vehicleUnit">Unit Bantuan</Label>
      <select {...input} className="form-control input-sm" disabled={disabled}>
        <option value="">-- Pilih Unit Bantuan --</option>
        {vehicleAssistance.map((val, index) => {
          return (
            <option value={val.ID_UNIT_BANTUAN} key={index}>
              {val.NAMA_UNIT_BANTUAN}
            </option>
          )
        })}
      </select>
    </FormGroup>
  );

  const hiddenField = ({ input, type }) => (
    <input {...input} type={type} className="form-control" />
  )

  const renderFieldInformation = ({ input, meta: { touched, error } }) => (
    <div>
      <textarea className="form-control" {...input} rows="5" disabled={disabled}>
      </textarea>
      {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
    </div>
  );


  const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
    <div>
      <Row>
        <Col>
          <Button type="button" onClick={() => fields.push({})} title="Tambah Bantuan" color="success" className="float-right" style={{ marginTop: '-30px' }} disabled={disabled}>
            <i className="fa fa-plus"></i> Tambah Bantuan
        </Button>
          {(touched || submitFailed) && error && <span>{error}</span>}
        </Col>
      </Row >
      <br />
      {
        fields.map((vehicle_assistance, index) => (
          <Row key={index}>
            <Col>
              <Row>
                <Col>
                  <h6>Kendaraan #{index + 1}</h6>
                </Col>
                <Col>
                  <Button className="float-right" type="button" title="Hapus Bantuan" color="danger" onClick={() => fields.remove(index)} disabled={disabled}>
                    <i className="fa fa-trash"></i>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md="5">
                  <Field
                    name={`${vehicle_assistance}.id_map_bantuan`}
                    type="hidden"
                    component={hiddenField}
                  />
                  <Field
                    name={`${vehicle_assistance}.unit_type`}
                    type="text"
                    component={renderFieldVehicleAsisstance}
                    label="Jenis Bantuan"
                  />
                </Col>
                <Col md="2">
                  <Field
                    name={`${vehicle_assistance}.unit_number`}
                    type="number"
                    component={renderField}
                    label="Jumlah"
                    disabled={disabled}
                  />
                </Col>
                <Col md="5">
                  <Field
                    name={`${vehicle_assistance}.unit_time_arrival`}
                    type="datetime-local"
                    component={renderField}
                    label="Waktu Kedatangan"
                    disabled={disabled}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        ))
      }
    </div >
  );

  return (
    <Row>
      <Col>
        <form onSubmit={handleSubmit}>
          <h6><b>Unit Pelapor</b></h6>
          <Row>
            <Col md="6">
              <Field
                name="reporter_name"
                type="text"
                component={renderField}
                label="Nama"
                labelSize="4"
                inputSize="8"
                disabled={disabled}
              />
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <label>Keterangan</label>
            </Col>
            <Col md="9">
              <Field name="information" component={renderFieldInformation} className="form-control" rows="10" />
            </Col>
          </Row>
          <br />
          <hr className="mt-0" />
          <h6><b>Bantuan Kendaraan</b></h6>
          <FieldArray name="vehicle_assistance" component={renderMembers} />
          <br />
          <hr style={{ boder: '1px solid #333' }} />
          <Row>
            <Col md="12">
              <Button type="submit" color="primary" className="float-right" style={{ marginLeft: '5px' }} disabled={disabled}>
                Submit <i className="fa fa-angle-right"></i>
              </Button>
              <Button type="button" color="danger" className="float-left" onClick={previousPage}>
                Back <i className="fa fa-angle-left"></i>
              </Button>
            </Col>
          </Row>
        </form>
      </Col>
    </Row >
  );
};

export default reduxForm({
  form: 'senkom', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  form: 'senkom', //                 <------ same form name
  // enableReinitialize: true,

  // validate,
})(NewSenkomThirdPage);
