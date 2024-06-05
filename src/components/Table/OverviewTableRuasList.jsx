import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col, Row, Table, Button } from 'reactstrap';

class OverviewTableRuasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'primary'
    };
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillReceiveProps(nextProps) {
    if (nextProps.value > 95) {
      this.setState({
        color: 'success'
      });
    }
    else if (nextProps.value > 90) {
      this.setState({
        color: 'warning'
      });
    }
    else {
      this.setState({
        color: 'danger'
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row style={this.props.style}>
          <Col>
            <Table responsive style={{ color: '#fff', fontSize: '18px', letterSpacing: '2px' }}>
              <thead>
                <tr>
                  <th style={this.props.width1}>{this.props.ruas}</th>
                  <th style={this.props.width2}>
                    <Button color={this.state.color} onClick={() => this.props.toggle(this.props.ruas, this.props.value)}>
                      {parseFloat(this.props.value).toFixed(2) + ' %'}
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    chartData: state.chartData.chartData,
  }
}
export default connect(mapStateToProps)(OverviewTableRuasList)