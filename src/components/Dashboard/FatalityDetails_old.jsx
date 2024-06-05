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


class FatalityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false
    };
  }

  render() {

    const chartOption = {
      colors: ['#DF5353', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        zoomType: 'xy',
        backgroundColor: 'rgba(0,0,0,0.0)',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063',
        height: 300
      },
      credits: {
        enabled: false
      },
      title: false,
      subtitle: false,
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            inside: true
          },
          allowPointSelect: true,
          cursor: 'pointer',
        }
      },
      xAxis: [{
        categories: ['ATP', 'JORR-S', 'MEBI', 'BAKTER', 'PALINDRA'],
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
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        labels: {
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
          text: 'Fatality Rate',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
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
        y: 5,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.6)'
      },
      responsive: {
        rules: [{
          condition: {
            minWidth: 1000
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      },
      series: [{
        name: 'Accident',
        type: 'column',
        yAxis: 1,
        data: [0, 0, 0, 0.47, 0],
        tooltip: {
          valueSuffix: ''
        },
      }
        , {
        name: 'Limit',
        type: 'spline',
        data: [0, 0, 0, 0],
        tooltip: {
          valueSuffix: ''
        }
      }
      ]
    }

    return (
      <Card style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff', border: 'none' }}>
        <CardHeader style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)' }}>
          <i className="fa fa-ambulance"></i> Tingkat Fatalitas
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
export default connect(mapStateToProps)(FatalityDetails)

