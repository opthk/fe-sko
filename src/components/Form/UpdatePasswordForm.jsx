import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios';
import { config } from "../../config/";
import qs from 'qs'

import {
  Col,
  Row,
  Button,
} from 'reactstrap';

const validate = values => {
  const errors = {}
  if (!values.old_password) {
    errors.old_password = 'Required'
  }

  if (!values.new_password) {
    errors.new_password = 'Required'
  } else if (values.new_password.length < 6) {
    errors.new_password = 'Must be 6 characters or more'
  }

  if (!values.confirm_password) {
    errors.confirm_password = 'Required'
  } else if (values.confirm_password !== values.new_password) {
    errors.confirm_password = 'Password tidak sesuai'
  }

  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const asyncValidate = (values, dispatch) => {
  var error = {}
  const token = localStorage.getItem('x-access-token');
  const form = {
    old_password: values.old_password,
    username: values.username
  }
  axios.post(config.HK_USER_PORTAL_API + '/user/get-hash-password', qs.stringify(form), { headers: { 'x-access-token': token } })
    .then(response => {
      if (!response.data.data.passwordCorrection) {
        error.old_password = 'Your password is incorrect';
      }
    })

  return sleep(500).then(() => {
    if (error.old_password) {
      throw error;
    }
  });
}

const renderField = ({
  input,
  label,
  type,
  placeHolder,
  meta: { asyncValidating, touched, error }
}) => (
    <div lg="6">
      <div className={asyncValidating ? 'async-validating' : '' + 'form-group'}>
        <label>{label}</label>
        <input {...input} placeholder={placeHolder} type={type} className="form-control" />
        {touched &&
          ((error && <span style={{ color: '#eb1e24' }}><i className="fa fa-exclamation-circle"></i> {error}</span>))}
      </div>
    </div >
  )

const hiddenField = ({ input, type }) => (
  <input {...input} type={type} className="form-control" />
)

let ChangePasswordForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} >
      <Row>
        <Col>
          <Field
            name="old_password"
            component={renderField}
            type="password"
            label="Old Password"
            placeHolder="Masukan password lama anda disini"
          />
          <Field
            name="username"
            type="hidden"
            component={hiddenField}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Field
            name="new_password"
            component={renderField}
            type="password"
            label="New Password"
            placeHolder="Masukan password baru anda disini"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Field
            name="confirm_password"
            component={renderField}
            type="password"
            label="Confirm Password"
            placeHolder="Konfirmasi password baru anda disini"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="float-right" type="submit" color="primary">Submit</Button>
        </Col>
      </Row>
    </form >
  )
}

ChangePasswordForm = reduxForm({
  form: 'updatePasswordForm',
  validate,
  asyncValidate,
  asyncChangeFields: ['old_password']
})(ChangePasswordForm)

ChangePasswordForm = connect(
  state => ({
    initialValues: state.user.myIdentity // pull initial values from account reducer
  }),
)(ChangePasswordForm)

export default ChangePasswordForm