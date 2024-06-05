import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from "highcharts/highcharts-more"; //module
import HC_3D from "highcharts/highcharts-3d"; //module
import HC_CYL from "highcharts/modules/cylinder"; //module

HC_more(Highcharts); //init module
HC_3D(Highcharts); //init module
HC_CYL(Highcharts); //init module


class PotholesOverview extends Component {
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
    // var colors = ['#8d62a0', '#ceb3d8', '#d5dddd'];
    const chartOption = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        zoomType: 'xy',
        backgroundColor: 'rgba(0,0,0,0.0)',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063',
        height: 240
      },
      title: false,
      subtitle: false,
      xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true,
        labels: {
          style: {
            color: '#fff'
          }
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      }],
      yAxis: [{ // Primary yAxis
        title: {
          text: 'Total Potholes',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        labels: {
          // format: '{value} mm',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        gridLineWidth: 0,
        opposite: true,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      }, { // Secondary yAxis
        title: {
          text: 'Potholes',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          // format: '{value} mm',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0,

      }, { // Tertiary yAxis
        gridLineWidth: 0,
        title: false,
        opposite: true,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.6)'
      },
      series: [{
        name: 'Potholes',
        type: 'column',
        yAxis: 1,
        data: [19, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: 'Limit',
        type: 'spline',
        data: [23, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tooltip: {
          valueSuffix: ' °C'
        }
      }]
    }

    return (
      <Card style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none' }}>
        <CardHeader style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)' }}>
          <i className="fa fa-exclamation-triangle"></i> Potholes Overview
          </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <HighchartsReact highcharts={Highcharts} options={chartOption} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }

}
const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps)(PotholesOverview)

