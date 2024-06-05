import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import { settlementAction } from '../../store/action'
import ChartTransaction from '../Chart/ChartTransaction';

var month_name = function (dt) {
  let mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return mlist[dt.getMonth()];
};

var today = new Date();
var mm = month_name(today);

class SettlementDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Daily Monitoring Response File Settlement',
      subtitle: mm,
      chartType: 'line',
      xTitle: 'Day',
      yTitle: 'Revenue',
      dataSet: [],
      dataRaw: [],
      styleGroup: '',
      height: 265,
      dataLabel: false,
      align: 'center'
    };
  }

  componentDidMount() {
    const { dispatch } = this.props
    var self = this
    var identity = JSON.parse(localStorage.getItem('identity'))

    if (identity.branch_code === 'PUSAT') {
      dispatch(settlementAction.getSettlementDaily(identity.branch_code));
      setInterval(function () {
        dispatch(settlementAction.getSettlementDaily(identity.branch_code));
      }, 300 * 1000); // 60 * 1000 milsec
      setInterval(function () {
        self.resetDataSet()
        self.fillData()
      }, 25 * 1000); // 60 * 1000 milsec
    }
    if (this.props.style_group) {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.6)'
      });
    } else {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.0)'
      });
    }
  }

  resetDataSet = (e) => {
    this.setState({
      dataSet: []
    });
  }

  fillData = (e) => {
    const { dailySettlement } = this.props
    this.setState({
      dataSet: [{
        name: 'Mandiri',
        data: dailySettlement.rfs.mandiri
      },
      {
        name: 'BCA',
        data: dailySettlement.rfs.bca
      },
      {
        name: 'BRI',
        data: dailySettlement.rfs.bri
      },
      {
        name: 'BNI',
        data: dailySettlement.rfs.bni
      }]
    });
  }

  componentWillReceiveProps(nextProps) {
    var self = this
    this.resetDataSet()
    setTimeout(function () {
      self.setState({
        dataSet: [{
          name: 'Mandiri',
          data: nextProps.dailySettlement.rfs.mandiri
        },
        {
          name: 'BCA',
          data: nextProps.dailySettlement.rfs.bca
        },
        {
          name: 'BRI',
          data: nextProps.dailySettlement.rfs.bri
        },
        {
          name: 'BNI',
          data: nextProps.dailySettlement.rfs.bni
        }]
      });
    }, 1);
  }

  render() {
    const { dailySettlement } = this.props
    var xCategory
    var max
    if (dailySettlement.tanggal) {
      xCategory = dailySettlement.tanggal
      max = dailySettlement.tanggal[dailySettlement.tanggal.length - 1]
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
            isCommandCenter={this.props.isCommandCenter}
            max={max}
          />
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dailySettlement: state.dailySettlement.dailySettlement
  }
}
export default connect(mapStateToProps)(SettlementDaily)