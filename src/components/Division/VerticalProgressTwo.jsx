import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class VerticalProgressTwo extends React.Component {
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
          <Col md="6">
            <Row>
              <Col>
                <span>Total</span><br />
                <span>{this.props.total}</span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="12">
                <span>Light : {this.props.light}</span><br />
              </Col>
              <Col md="12">
                <span>Heavy : {this.props.heavy}</span><br />
              </Col>
              <Col md="12">
                <span>Fatality : {this.props.fatality}</span><br />
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row>
              <Col>
                <span>Tingkat Kecelakaan</span><br />
                <span>{this.props.tk}</span>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <span>Tingkat Fatality</span><br />
                <span>{this.props.tf}</span>
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
export default connect(mapStateToProps)(VerticalProgressTwo)