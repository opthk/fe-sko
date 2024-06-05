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
import HC_FUNNEL from "highcharts/modules/funnel"; //module

HC_more(Highcharts); //init module
HC_3D(Highcharts); //init module
HC_FUNNEL(Highcharts); //init module

class TransactionDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title_text: '',
      subtitle_text: '',
      x_axis_label: {
        style: { color: '#E0E0E3' }
      },
      y_axis_label: {
        style: { color: '#E0E0E3' }
      },
      x_title: '',
      y_title: '',
      legend: false,
      fontColor: {
        color: '#fff'
      }
    }
  }

  componentDidMount() {
    if (this.props.isOverviewCabang) {
      this.setState({
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
      })
    }

    const { title, subtitle, disable_title, y_title, x_title } = this.props
    if (!disable_title) {
      this.setState({
        title_text: title,
        subtitle_text: subtitle,
        y_title: y_title,
        x_title: x_title
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isCommandCenter) {
      this.setState({
        fontColor: {
          color: '#333'
        },
        y_axis_label: {
          style: { color: '#333' }
        },
        x_axis_label: {
          style: { color: '#333' }
        }
      })
    }

  }

  render() {

    let max = null
    if (this.props.max) {
      max = this.props.max - 1
    }
    const chartOption = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: this.props.style_group,
        style: {
          fontFamily: '\'Unica One\', sans-serif',
        },
        plotBorderColor: '#606063',
        type: this.props.chart_type,
        height: this.props.chart_height,
      },
      credits: {
        enabled: false
      },
      title: {
        text: this.state.title_text,
        align: this.props.align,
        margin: 25,
        style: {
          color: this.state.fontColor.color,
          fontSize: '16px',
        }
      },
      subtitle: {
        text: this.state.subtitle_text,
        align: this.props.align,
        style: {
          color: this.state.fontColor.color,
          marginBottom: '25px;'
        }
      },
      xAxis: {
        categories: this.props.x_category,
        gridLineColor: this.state.fontColor,
        labels: this.state.y_axis_label,
        lineColor: this.state.fontColor,
        minorGridLineColor: this.state.fontColor,
        tickColor: this.state.fontColor,
        title: {
          style: {
            color: this.state.fontColor.color
          },
          text: this.state.x_title
        },
        allowDecimals: false,
        max: max
      },
      yAxis: {
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        gridLineColor: '#707073',
        labels: this.state.y_axis_label,
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: this.state.fontColor.color
          },
          text: this.state.y_title
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        },
        // pointFormat: 'Day {point.x:,.0f} {series.name} revenue <b>Rp. {point.y:,.0f}</b>'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: this.props.data_label,
            inside: false,
          },
          animation: {
            duration: 1500
          }
        }
      },
      legend: this.state.legend,
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
      series: this.props.data_set
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
    dailyTransaction: state.dailyTransaction.dailyTransaction,
    dailyTransactionByRealisasi: state.dailyDashboardTransactionTrafficByRealisasi.dailyByRealisasi
  }
}
export default connect(mapStateToProps)(TransactionDaily)