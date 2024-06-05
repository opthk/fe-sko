import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import ChartTransaction from '../Chart/ChartTransaction';

class TransactionMonthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Monthly Monitoring Transaction',
      subtitle: 'Entire Toll Road Section',
      chartType: 'column',
      xTitle: 'Month',
      yTitle: 'Revenue',
      redraw: false,
      dataSet: [],
      dataRaw: [],
      styleGroup: '',
      height: 300,
      dataLabel: true,
      align: 'center',
    };
  }

  componentDidMount() {
    var self = this
    var identity = JSON.parse(localStorage.getItem('identity'))

    setInterval(function () {
      self.resetDataSet()
      self.fillData()
    }, 25 * 1000); // 60 * 1000 milsec

    if (this.props.style_group) {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.0)'
      });
    } else {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.6)'
      });
    }

    if (identity.branch_code !== 'PUSAT') {
      this.setState({
        subtitle: 'Entire Toll Gate',
      });
    }
  }

  resetDataSet = (e) => {
    this.setState({
      dataSet: []
    });
  }

  fillData = (e) => {
    this.setState({
      dataSet: this.state.dataRaw
    });
  }

  componentWillReceiveProps(nextProps) {
    var self = this
    if (this.props.monthlyTransactionByRealisasi !== nextProps.monthlyTransactionByRealisasi) {
      this.resetDataSet()
      setTimeout(function () {
        self.setState({
          dataSet: nextProps.monthlyTransactionByRealisasi.data_trans,
          dataRaw: nextProps.monthlyTransactionByRealisasi.data_trans
        });
      }, 1);
    }
  }

  render() {
    var x = this.state.dataSet
    var longestX = []
    x.forEach((val1) => {
      longestX.push(val1.data.length)
    })

    var thisMonth = Math.max.apply(null, longestX)
    const xCategory = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    xCategory.splice(thisMonth - 1, 1, 'Total')

    return (
      <Row>
        <Col>
          <ChartTransaction
            data_set={this.state.dataSet}
            chart_type={this.state.chartType}
            x_category={xCategory}
            title={this.state.title}
            subtitle={this.state.subtitle}
            x_title={this.state.xTitle}
            y_title={this.state.yTitle}
            style_group={this.state.styleGroup}
            height={this.state.height}
            data_label={this.state.dataLabel}
            align={this.state.align}
            chart_height={this.props.chart_height}
            isOverviewCabang={this.props.isOverviewCabang}
            isCommandCenter={this.props.isCommandCenter}
          />
        </Col>
      </Row>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    monthlyTransactionByRealisasi: state.monthlyDashboardTransactionTrafficByRealisasi.monthlyByRealisasi
  }
}
export default connect(mapStateToProps)(TransactionMonthly)