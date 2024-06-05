import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { loginActions } from '../../../store/action'

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      appcode: '2',
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const dataLogin = {
      username: this.state.username,
      password: this.state.password,
      id_application: this.state.appcode,
    }
    const { dispatch } = this.props;
    dispatch(loginActions.login(dataLogin));
  }

  componentDidMount(nextProps) {
    var identity = JSON.parse(localStorage.getItem('identity'))
    this.setState({
      username: identity.first_name,
    });
  }

  render() {
    return (
      <div className="jumbotron" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: '#fff', textAlign: "center" }}>
        <Row>
          <Col lg="3">
          </Col>
          <Col lg="6">
            <img src={'../../../../assets/img/wallpaper/logo-site.png'} style={{ width: '20%' }} alt="hk-logo" />
            <h1 className="display-4" style={{ fontSize: '42px' }}>Sistem Kendali Operasi Tol</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="3"></Col>
          <Col lg="6">
            <h5 className="display-5" style={{ textTransform: 'capitalize' }}>
              Welcome, {this.state.username} !</h5>
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usernameAlert: state.alert.usernameAlert,
    passwordAlert: state.alert.passwordAlert,
    message: state.alert.message,
    loggedIn: state.login.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(LandingPage))
