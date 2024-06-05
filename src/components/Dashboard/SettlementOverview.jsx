import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { dashboardAction } from '../../store/action'

class SettlementPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false
    };
  }

  render() {

    const { bank } = this.props
    var dataSet
    if (bank) {
      dataSet = [
        {
          name: 'Bank',
          colorByPoint: true,
          data: [
            {
              name: 'Mandiri',
              y: bank.mandiri.percentage
            },
            {
              name: 'BCA',
              y: bank.bca.percentage
            },
            {
              name: 'BRI',
              y: bank.bri.percentage
            },
            {
              name: 'BNI',
              y: bank.bni.percentage
            }
          ]
        },
      ]
    }
    // console.log(dataSet)

    const chartOption = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063',
        type: 'pie',
        // height: 140
      },
      title: {
        text: '<b>Monthly monitoring settlement</b>',
        align: 'left',
        margin: 25,
        style: {
          color: '#E0E0E3',
          fontSize: '14px',
        }
      },
      subtitle: {
        text: 'This Month',
        align: 'left',
        style: {
          color: '#E0E0E3',
          marginBottom: '25px;'
        }
      },
      xAxis: {
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
          text: 'Revenue'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        },
        pointFormat: 'Percentage Response File Settlement <b>{point.y:,.0f} %</b>'
      },
      plotOptions: {
        series: {
          dataLabels: {
            color: '#B0B0B3'
          },
          marker: {
            lineColor: '#333'
          },
          pointStart: 1
        },
        boxplot: {
          fillColor: '#505053'
        },
        candlestick: {
          lineColor: 'white'
        },
        errorbar: {
          color: 'white'
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
      credits: {
        style: {
          color: '#666'
        }
      },
      labels: {
        style: {
          color: '#707073'
        }
      },

      drilldown: {
        activeAxisLabelStyle: {
          color: '#F0F0F3'
        },
        activeDataLabelStyle: {
          color: '#F0F0F3'
        }
      },

      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
            fill: '#505053'
          }
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
    bank: state.settlement.settlementByBank,
  }
}
export default connect(mapStateToProps)(SettlementPercentage)