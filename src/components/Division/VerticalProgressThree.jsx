import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';

class VerticalProgressThree extends React.Component {
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
          <Col md="12">
            <Row>
              <Col>
                <span>Current</span><br />
                <span>{this.props.current}</span>
              </Col>
            </Row>
            <br />
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
export default connect(mapStateToProps)(VerticalProgressThree)