import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';
import NumberFormat from 'react-number-format';

class RekeningKoranTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false,
      dataSet: []
    };
  }

  componentWillMount() {
    if (this.props.isCommandCenter) {
      this.setState({
        style: { color: 'white', textAlign: 'center', fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.4)' }
      });
    } else {
      this.setState({
        style: { color: 'black', textAlign: 'center', fontSize: '12px' }
      });
    }
  }

  render() {
    const { dataPerRuas } = this.props
    var preview = ''
    var fs = 0
    var rp = 0

    preview = dataPerRuas.map((val, index) => {
      fs = val.fs.reduce((a, b) => a + b, 0)
      rp = val.rp.reduce((a, b) => a + b, 0)
      return (
        <tr key={index}>
          <td>{val.ruas_code}</td>
          <td>
            <NumberFormat value={fs} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />{' '}
          </td>
          <td>
            <NumberFormat value={rp} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />{' '}
          </td>
          <td>{(rp / fs * 100).toFixed(2) + ' %'}</td>
        </tr>
      )
    })

    return (
      <Row>
        <Col>
          <Table size="sm" style={this.state.style}>
            <thead>
              <tr>
                <th>Ruas</th>
                <th>Pendapatan</th>
                <th>Rekening Koran</th>
                <th>Prosentase</th>
              </tr>
            </thead>
            <tbody>
              {preview}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPerRuas: state.monthlySettlement.dataPerRuas,
  }
}
export default connect(mapStateToProps)(RekeningKoranTable)