import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';
import RtmsLoader from '../RTMS/RtmsLoader';

class Rtms extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
    };
  }

  render() {
    const { data, branch } = this.props
    const identity = JSON.parse(localStorage.getItem('identity'))
    let rtms = {
      ruasCode: 'default',
      a: {
        lane: 'A',
        speed: 0,
        volume: 0,
        occupancy: 0,
        speedStyle: {
          style: {
            transform: 'rotate(0deg)'
          }
        },
        traffic: <small className="float-right badge badge-primary">Loading</small>
      },
      b: {
        lane: 'B',
        speed: 0,
        volume: 0,
        occupancy: 0,
        speedStyle: {
          style: {
            transform: 'rotate(0deg)'
          }
        },
        traffic: <small className="float-right badge badge-primary">Loading</small>
      }
    }

    data.forEach((val, index) => {
      if (identity.branch_code === val.ruasCode || branch === val.ruasCode) {
        rtms['ruasCode'] = val.ruasCode
        rtms['a']['speed'] = val.a.speed
        rtms['a']['occupancy'] = val.a.occupancy
        if (val.a.occupancy > 50) {
          rtms['a']['traffic'] = <small className="float-right badge badge-danger">Macet</small>
        } else if (val.a.occupancy > 20) {
          rtms['a']['traffic'] = <small className="float-right badge badge-warning">Padat</small>
        }
        else {
          rtms['a']['traffic'] = <small className="float-right badge badge-success">Lancar</small>
        }
        rtms['a']['volume'] = val.a.volume
        rtms['a']['speedStyle']['style']['transform'] = 'rotate(' + val.a.speed + 'deg)'
        rtms['b']['speed'] = val.b.speed
        rtms['b']['occupancy'] = val.b.occupancy
        if (val.b.occupancy > 50) {
          rtms['b']['traffic'] = <small className="float-right badge badge-danger">Macet</small>
        } else if (val.b.occupancy > 20) {
          rtms['b']['traffic'] = <small className="float-right badge badge-warning">Padat</small>
        }
        else {
          rtms['b']['traffic'] = <small className="float-right badge badge-success">Lancar</small>
        }
        rtms['b']['volume'] = val.b.volume
        rtms['b']['speedStyle']['style']['transform'] = 'rotate(' + val.b.speed + 'deg)'
      }
    });

    return (
      <div>
        <Row style={{ marginBottom: "-2px" }}>
          <Col md="12">
            <Row>
              <Col md="6">
                <RtmsLoader
                  rtms={rtms.a}
                />
              </Col>
              <Col md="6">
                <RtmsLoader
                  rtms={rtms.b}
                />
              </Col>
            </Row>
          </Col>
        </Row >
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lalinComparison: state.comparisonTransaction.comparison.lalin,
  }
}
export default connect(mapStateToProps)(Rtms)