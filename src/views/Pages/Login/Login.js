import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Alert } from 'reactstrap';

import { loginActions } from '../../../store/action'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      appcode: '2',
      visible: false
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

  componentWillReceiveProps(nextProps) {
    if (this.props.loggedIn !== nextProps.loggedIn) {
      this.props.history.push('/')
    }
    else {
      this.setState({ visible: true });
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center" style={{
        backgroundImage: `url(../../../../assets/img/wallpaper/night-lights-road-y4.jpg`, backgroundRepeat: "no-repeat",
        backgroundSize: "auto", WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        ObackgroundSize: "cover",
      }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg="4" md="8" sm="12">
              <CardGroup>
                <Card className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', border: '1px solid #ec1e24' }}>
                  <CardBody>
                    <Row>
                      <Col lg="4" xs="4">
                      </Col>
                      <Col lg="4" xs="4">
                        <img src={'../../../../assets/img/wallpaper/logo-site.png'} style={{ width: '100%', textAlign: 'center' }} alt='hk-logo' />
                      </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                      <h4 style={{ textAlign: 'center' }}>Sistem Kendali Operasi Tol</h4>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" placeholder="Username" onChange={this.handleChange} autoComplete="username" required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Password" onChange={this.handleChange} autoComplete="current-password" required />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Input type="hidden" name="application_code" value={this.state.appcode} />
                          <Button type="submit" color="primary" className="px-4" block>Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                    <br></br>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          <br></br>
          <Row className="justify-content-center">
            <Col md="4">
              <div>
                <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
                  {this.props.message}
                </Alert>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
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

export default withRouter(connect(mapStateToProps)(Login))
