import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from "highcharts/highcharts-more"; //module
import HC_3D from "highcharts/highcharts-3d"; //module

HC_more(Highcharts); //init module
HC_3D(Highcharts); //init module

const dataA = [{
  name: 'Transaction',
  y: 32.5,
  sliced: true,
  selected: true
}, {
  name: 'Traffic',
  y: 32.5
}, {
  name: 'SLA Accident',
  y: 25
}, {
  name: 'SLA Potholes',
  y: 10
}]

class OverviewBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false
    };
  }

  render() {

    const { dailyTransaction } = this.props

    if (dailyTransaction) {
      dataSet = dailyTransaction
    }
    const chartOption = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        },
        height: 252.5
      },
      title: false,
      subtitle: false,
      plotOptions: {
        pie: {
          innerSize: '70%',
          size: '100%',
          depth: 25,
          dataLabels: false,
          allowPointSelect: true,
          cursor: 'pointer',
        }
      },
      series: [{
        name: 'Percentage',
        data: dataA
      }]
    }

    return (
      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={chartOption} />
        </Col>
      </Row >
    )
  }

}
const mapStateToProps = (state) => {
  return {
    dailyTransaction: state.dailyTransaction.dailyTransaction
  }
}
export default connect(mapStateToProps)(OverviewBranch)

