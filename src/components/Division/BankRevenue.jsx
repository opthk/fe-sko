import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';
import NumberFormat from 'react-number-format';

class BankRevenue extends React.Component {
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
        <Row style={{}}>
          <Col md="12" style={{ fontSize: '1.15em' }}>
            <Row style={{ padding: '2px' }}>
              <Col>
                <span className="float-left" style={{ marginLeft: '-15px' }}>BCA</span>
                <span className="float-right" style={{ marginRight: '-15px' }}>
                  <NumberFormat value={this.props.bca} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
              </Col>
            </Row>
            <Row style={{ padding: '2px' }}>
              <Col>
                <span className="float-left" style={{ marginLeft: '-15px' }}>BNI</span>
                <span className="float-right" style={{ marginRight: '-15px' }}>
                  <NumberFormat value={this.props.bni} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
              </Col>
            </Row>
            <Row style={{ padding: '2px' }}>
              <Col>
                <span className="float-left" style={{ marginLeft: '-15px' }}>BRI</span>
                <span className="float-right" style={{ marginRight: '-15px' }}>
                  <NumberFormat value={this.props.bri} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
              </Col>
            </Row>
            <Row style={{ padding: '2px' }}>
              <Col>
                <span className="float-left" style={{ marginLeft: '-15px' }}>MANDIRI</span>
                <span className="float-right" style={{ marginRight: '-15px' }}>
                  <NumberFormat value={this.props.mandiri} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
              </Col>
            </Row>
            <Row style={{ padding: '2px' }}>
              <Col>
                <span className="float-left" style={{ marginLeft: '-15px' }}>TUNAI</span>
                <span className="float-right" style={{ marginRight: '-15px' }}>
                  <NumberFormat value={this.props.tunai} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
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
export default connect(mapStateToProps)(BankRevenue)