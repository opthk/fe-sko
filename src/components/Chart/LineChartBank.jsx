import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

class LineChartBank extends Component {

  render() {
    var color = this.props.color
    return (
      <div className="callout callout-info">
        <small style={this.props.fontColor}>{this.props.bank}</small>
        <br />
        <strong className="h4" style={this.props.fontColor}>{this.props.percentage}</strong>
        <div className="chart-wrapper">
          <Line data={makeSparkLineData(0, color)} options={sparklineChartOpts} width={100} height={10} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dailyTransaction: state.dailyTransaction.dailyTransaction,
    dailyTransactionByRealisasi: state.dailyDashboardTransactionTrafficByRealisasi.dailyByRealisasi
  }
}
export default connect(mapStateToProps)(LineChartBank)