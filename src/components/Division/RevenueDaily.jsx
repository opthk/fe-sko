import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class RevenueDaily extends React.Component {
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
        <Row style={{ marginBottom: "-2px" }}>
          <Col md="12">
            <Row>
              <Col>
                <h5>Total Transaksi</h5>
                <h6>{this.props.transaction} %</h6>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <h5>Total Lalu Lintas</h5>
                <h6>{this.props.traffic} %</h6>
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
export default connect(mapStateToProps)(RevenueDaily)