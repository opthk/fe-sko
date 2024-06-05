import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class UserSatisfication extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
    };
  }

  render() {
    return (
      <div style={{ fontSize: '1.25em' }}>
        <Row>
          <Col md="6">
            <h6 className="float-left">Layanan Informasi </h6>
          </Col>
          <Col md="6">
            <div className="float-right">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <span> (3.2/5)</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h6 className="float-left">Kondisi Tunnel </h6>
          </Col>
          <Col md="6">
            <div className="float-right">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <span> (3.2/5)</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h6 className="float-left">Rambu Jalan </h6>
          </Col>
          <Col md="6">
            <div className="float-right">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <span> (3.2/5)</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <h6 className="float-left">Kondisi Jalan</h6>
          </Col>
          <Col md="6">
            <div className="float-right">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <span> (3.2/5)</span>
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
export default connect(mapStateToProps)(UserSatisfication)