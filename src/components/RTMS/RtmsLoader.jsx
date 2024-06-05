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
    const { rtms } = this.props

    return (
      <div>
        <Row>
          <Col>
            <span className="bg-dark px-2" style={{ width: 'fit-content', fontSize: '1rem' }}>{rtms.lane}</span>
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
                <div className="needle_A" style={rtms.speedStyle.style}></div>
                <span className="loading_A">{rtms.speed} km/h</span>
              </div>
            </div>
            <small className="float-left">Avg. Speed</small>
            <small className="float-right avgspeed_A">{rtms.speed} Km/H</small>
            <br />
            <small className="float-left">Traffic Status</small>
            {rtms.traffic}
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