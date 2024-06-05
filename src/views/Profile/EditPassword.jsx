import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../store/action'
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import ChangePasswordForm from '../../components/Form/UpdatePasswordForm';

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props
    dispatch(userActions.updatePassword(values));
  }

  render() {
    const { myIdentity } = this.props
    var username

    if (myIdentity) {
      username = myIdentity.username
    }
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Edit Password</CardTitle>
            <hr />
            <Row>
              <Col lg="4">
              </Col>
              <Col lg="4">
                <ChangePasswordForm onSubmit={this.handleSubmit} username={username} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div >
    )
  }

}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    passwordChecker: state.passwordChecker.passwordChecker
  }
}
export default connect(mapStateToProps)(EditPassword)
