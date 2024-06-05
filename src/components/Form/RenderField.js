import React from 'react';
import {
  Col,
  FormGroup,
  Label,
} from 'reactstrap';


const renderField = ({ input, label, type, labelSize, inputSize, disabled, meta: { touched, error } }) => (
  <div>
    <FormGroup row>
      <Col md={labelSize}>
        <Label htmlFor="text-input">{label}</Label>
      </Col>
      <Col xs="12" md={inputSize}>
        <input {...input} className="form-control input-sm" type={type} disabled={disabled} />
        {touched && error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-triangle"></i> {error}</span>}
      </Col>
    </FormGroup>
  </div>
);

export default renderField;
