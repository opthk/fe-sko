import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Col, Row, Table } from 'reactstrap';

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
    const { chartData } = this.props

    var dataList
    dataList = chartData.map((val, index) => {
      return (
        <tr key={index}>
          <td>{val.Gerbang}</td>
          <td>{val.NoGardu}</td>
          <td>{val.lalin1}</td>
          <td>{val.rp1}</td>
          <td>{val.lalin2}</td>
          <td>{val.rp2}</td>
          <td>{val.lalin3}</td>
          <td>{val.rp3}</td>
          <td>{val.lalin4}</td>
          <td>{val.rp4}</td>
          <td>{val.lalin5}</td>
          <td>{val.rp5}</td>
          <td>{val.lalin1 + val.lalin2 + val.lalin3 + val.lalin4 + val.lalin5}</td>
          <td>{val.rp1 + val.rp2 + val.rp3 + val.rp4 + val.rp5}</td>
        </tr>
      )
    })

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <h4>Rekap Transaksi dan Lalu Lintas</h4>
          </Col>
        </Row>
        <hr className="mt-0" />
        <Row>
          <Table responsive bordered striped style={{ color: '#333', borderRadius: 10, margin: '0px 25px 0px 25px' }}>
            <thead style={{ fontSize: 11 + 'px', fontWeight: 'bold' }}>
              <tr>
                <th rowSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Gerbang</th>
                <th rowSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Gardu</th>
                <th colSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Golongan 1</th>
                <th colSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Golongan 2</th>
                <th colSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Golongan 3</th>
                <th colSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Golongan 4</th>
                <th colSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Golongan 5</th>
                <th rowSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Total Lalin</th>
                <th rowSpan="2" style={{ verticalAlign: "middle", textAlign: "center" }}>Total Pendapatan</th>
              </tr>
              <tr>
                <th>Lalin</th>
                <th>Pendapatan</th>
                <th>Lalin</th>
                <th>Pendapatan</th>
                <th>Lalin</th>
                <th>Pendapatan</th>
                <th>Lalin</th>
                <th>Pendapatan</th>
                <th>Lalin</th>
                <th>Pendapatan</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: 10 + 'px', textAlign: 'center' }}>
              {dataList}
            </tbody>
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