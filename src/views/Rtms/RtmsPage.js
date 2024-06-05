import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Progress, CardTitle, Col, Row } from 'reactstrap';
import RtmsLoader from '../../components/RTMS/RtmsLoader';
import '../../components/css/dashboard-cabang.css'
import {
  rtmsActions
} from '../../store/action';

class RtmsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      subtitle: 'Entire Toll Road Section',
      extend: []
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))
    dispatch(rtmsActions.getLiveData(identity.branch_code));
  }

  render() {
    return (
      <div>
        <Row>
          <Col md="6">
            <Row>
              <Col>
                <Card >
                  <CardBody>
                    {/* <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                  <CardBody style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}> */}
                    <CardTitle>JORR-S</CardTitle>
                    <Row>
                      <Col>
                        <RtmsLoader />
                      </Col>
                      <Col>
                        <RtmsLoader />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <Col>
                <Card >
                  <CardBody>
                    {/* <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                  <CardBody style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}> */}
                    <CardTitle>JORR-S</CardTitle>
                    <Row>
                      <Col>
                        <RtmsLoader />
                      </Col>
                      <Col>
                        <RtmsLoader />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card >
              <CardBody>
                <CardTitle>JORR-S</CardTitle>
                <Row>
                  <Col md="6" style={{ border: '1px solid #e7e7e7', padding: '5px 5px 5px 5px' }}>
                    <span className="title"> <i className="fa fa-institution "></i> LT.Agunh 1</span>
                    <hr style={{ margin: '5px 2px 5px 2px' }} />
                    <Row style={{ fontSize: '11px', marginBottom: '-10px' }}>
                      <Col md="4">
                        <div className="progress-group">
                          <div className="progress-group-header">
                            <span className="title"><i className="fa fa-dashboard"></i> Speed</span>
                            <span className="ml-auto font-weight-bold">43 Km/h</span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="warning" value="43" />
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="progress-group">
                          <div className="progress-group-header">
                            <span className="title"><i className="fa fa-road"></i> Occupancy</span>
                            <span className="ml-auto font-weight-bold">43%</span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="warning" value="43" />
                          </div>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="progress-group">
                          <div className="progress-group-header">
                            <span className="title"><i className="fa fa-car"></i> Volume</span>
                            <span className="ml-auto font-weight-bold">43%</span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="warning" value="43" />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <video id="video" src="http://192.168.46.60:6060" autoplay="autoplay" width="260" height="144"></video> */}
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
  }
}
export default connect(mapStateToProps)(RtmsPage)
