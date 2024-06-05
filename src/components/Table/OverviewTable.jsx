import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardAction, settlementAction } from '../../store/action'

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class TransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Table style={{ width: '95%', color: '#fff', marginLeft: '5%' }}>
            <thead style={{ fontSize: 14 + 'px', fontWeight: 'bold' }}>
              <tr>
                <th style={{ verticalAlign: "middle", textAlign: "center" }}>Ruas</th>
                <th style={{ verticalAlign: "middle", textAlign: "center" }}>Achievement</th>
              </tr>
            </thead>
          </Table>
          <Table style={{ width: '89%', color: '#fff', marginLeft: '5%' }}>
            <thead style={{ fontSize: 12 + 'px', textAlign: 'center' }}>
              <tr>
                <th ><span style={{ marginLeft: '-12.5%' }}>ATP</span></th>
                <th>40%</th>
              </tr>
            </thead>
          </Table>
          <Table style={{ width: '88%', color: '#fff', marginLeft: '5%' }}>
            <thead style={{ fontSize: 12 + 'px', textAlign: 'center' }}>
              <tr>
                <th><span style={{ marginLeft: '-22.5%' }}>BAKTER</span></th>
                <th>40%</th>
              </tr>
            </thead>
          </Table>
          <Table style={{ width: '87%', color: '#fff', marginLeft: '5%' }}>
            <thead style={{ fontSize: 12 + 'px', textAlign: 'center' }}>
              <tr>
                <th>JORR-S</th>
                <th>40%</th>
              </tr>
            </thead>
          </Table>
          <Table style={{ width: '88%', color: '#fff', marginLeft: '5%' }}>
            <thead style={{ fontSize: 12 + 'px', textAlign: 'center' }}>
              <tr>
                <th>MEBI</th>
                <th>40%</th>
              </tr>
            </thead>
          </Table>
          <Table style={{ width: '95%', color: '#fff', marginLeft: '5%' }}>
            <thead style={{ fontSize: 12 + 'px', textAlign: 'center' }}>
              <tr>
                <th>PALINDRA</th>
                <th>40%</th>
              </tr>
            </thead>
          </Table>
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
export default connect(mapStateToProps)(TransactionTable)