import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class RtmsLoader extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <span className="bg-dark px-2" style={{ width: 'fit-content', fontSize: '1rem' }}>B</span>
            <div id="loader-wrapper">
              <img src="../../assets/img/background/core.png" className="background" />
              <div className="loader">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="subline"></div>
                <div className="subline"></div>
                <div className="subline"></div>
                <div className="subline"></div>
                <div className="subline"></div>
                <div className="loader-circle-1">
                  <div className="loader-circle-2"></div>
                </div>
                <div className="needle_A" style={{ transform: 'rotate(90deg)' }}></div>
                <span className="loading_A">
                  90 km/h
                  <br />
                  <small style={{ fontSize: '8px' }}> Avg. Speed</small>
                </span>
              </div>
              <img src="../../assets/img/background/core.png" className="rtms_background_right" />
              <div className="loader_side">
                <span className="loading_side_text">
                  <small>Traffic</small>
                  <br />
                  <i className="fa fa-car" style={{ color: '#fff', marginTop: '5px' }}></i>
                  <br />
                  <small className="badge badge-danger" style={{ marginTop: '2px' }}>
                    Heavy
                  </small>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div >
          );
        }
      }
      
const mapStateToProps = (state) => {
  return {
            lalinComparison: state.comparisonTransaction.comparison.lalin,
        }
      }
export default connect(mapStateToProps)(RtmsLoader)