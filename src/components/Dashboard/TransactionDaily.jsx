import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import ChartTransaction from '../Chart/ChartTransaction';

class TransactionDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Daily Monitoring Transaction',
      subtitle: 'Entire Toll Road Section',
      chartType: 'line',
      xTitle: 'Day',
      yTitle: 'Revenue',
      redraw: false,
      dataSet: [],
      dataRaw: [],
      styleGroup: '',
      dataLabel: false,
      align: 'center'
    };
  }

  componentDidMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    var self = this

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
    if (this.props.dailyTransactionByRealisasi !== nextProps.dailyTransactionByRealisasi) {
      this.resetDataSet()
      setTimeout(function () {
        self.setState({
          dataSet: nextProps.dailyTransactionByRealisasi.data_trans,
          dataRaw: nextProps.dailyTransactionByRealisasi.data_trans
        });
      }, 1);
    }
  }

  render() {
    var xCategory = []
    var i = 1
    var today = new Date();
    var dd = today.getDate();

    for (i = 1; i <= dd; i++) {
      xCategory.push(i)
    }

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
            disable_title={this.props.disable_title}
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
    dailyTransaction: state.dailyTransaction.dailyTransaction,
    dailyTransactionByRealisasi: state.dailyDashboardTransactionTrafficByRealisasi.dailyByRealisasi
  }
}
export default connect(mapStateToProps)(TransactionDaily)