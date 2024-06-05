import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class SettlementRuas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false
    };
  }

  render() {

    var rawData = this.props.graphicData
    var dataSet = []
    var ruas

    if (rawData) {
      // console.log(rawData)
      ruas = rawData.ruas
      dataSet = [
        {
          name: 'FS',
          data: rawData.fs
        },
        {
          name: 'RFS',
          data: rawData.rfs
        }
      ]
    }
    const chartOption = {
      colors: ['#4dbd74', '#ffc107', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063',
        type: 'column',
        height: 235
      },
      title: {
        text: 'Monthly monitoring settlement ' + ruas,
        align: 'left',
        margin: 10,
        style: {
          color: '#E0E0E3',
          fontSize: '18px',
        }
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
          style: {
            color: '#A0A0A3'

          }
        },
        allowDecimals: false,
      },
      yAxis: {
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3'
          },
          text: 'Traffic'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        },
        pointFormat: '{series.name} total settelement <b>{point.y:,.0f}</b>'
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            pointStart: 100
          },
          borderColor: false,
          animation: {
            duration: 1500
          }
        }
      },
      legend: {
        itemStyle: {
          color: '#E0E0E3'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#606063'
        }
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
      series: dataSet
    }

    return (
      <Row>
        <Col>
          <HighchartsReact highcharts={Highcharts} options={chartOption} />
        </Col>
      </Row>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
  }
}
export default connect(mapStateToProps)(SettlementRuas)