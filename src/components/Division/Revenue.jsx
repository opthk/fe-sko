import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';
import NumberFormat from 'react-number-format';
class Revenue extends React.Component {
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
          <Col md="4">
            <div className="arc e1 c_ease">{this.props.revenueValue}%</div>
          </Col>
          <Col md="8">
            <Row>
              <Col>
                <span className="float-left">Pendapatan</span>
                <span className="float-right">
                  <NumberFormat value={this.props.transaction} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span><br />
                <Progress animated color="success" value={this.props.percentageTransaction} > {this.props.percentageTransaction} %</Progress>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <span className="float-left">Lalin</span>
                <span className="float-right">
                  <NumberFormat value={this.props.traffic} displayType={'text'} thousandSeparator={true} prefix={''} />
                </span><br />
                <Progress animated color="success" value={this.props.percentageTraffic} > {this.props.percentageTraffic} %</Progress>
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
export default connect(mapStateToProps)(Revenue)