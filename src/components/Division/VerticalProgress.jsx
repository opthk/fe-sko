import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class VerticalProgress extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
    };
  }

  render() {
    let bar
    if (this.props.bar) {
      bar = this.props.bar.style
    }
    return (
      <div>
        <Row>
          <Col md="4">
            <div className="progress progress-bar-vertical">
              <div className="progress-bar progress-bar progress-bar-animated bg-success progress-bar-striped" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={bar}>
                <span className="sr-only"></span>
              </div>
            </div>
          </Col>
          <Col md="8">
            <Row>
              <Col>
                <span>Current</span><br />
                <span>{this.props.current}</span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span>Total</span><br />
                <span>{this.props.total}</span>
              </Col>
            </Row>
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
export default connect(mapStateToProps)(VerticalProgress)