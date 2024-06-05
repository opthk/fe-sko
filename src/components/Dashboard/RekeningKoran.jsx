import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import ChartTransaction from '../Chart/ChartTransaction';

var month_name = function (dt) {
  let mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return mlist[dt.getMonth()];
};

var today = new Date();
var mm = month_name(today);

class RekeningKoran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Pencapaian Pendapatan Seluruh Ruas',
      subtitle: 'January - ' + mm,
      chartType: 'column',
      xTitle: 'Month',
      yTitle: 'Revenue',
      dataSet: [],
      dataRaw: [],
      styleGroup: '',
      height: 300,
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
        styleGroup: 'rgba(0,0,0,0.6)'
      });
    } else {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.0)'
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
    const { rekeningBulanan } = this.props
    this.setState({
      dataSet: [
        {
          name: 'Pendapatan',
          data: rekeningBulanan.fs,
        },
        {
          name: 'Rekening Koran',
          data: rekeningBulanan.rp,
        }
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    var self = this
    if (this.props.rekeningBulanan !== nextProps.rekeningBulanan) {
      this.resetDataSet()
      setTimeout(function () {
        self.setState({
          dataSet: [
            {
              name: 'Pendapatan',
              data: nextProps.rekeningBulanan.fs,
            },
            {
              name: 'Rekening Koran',
              data: nextProps.rekeningBulanan.rp,
            }
          ]
        });
      }, 1);
    }
  }

  render() {
    const { rekeningBulanan } = this.props
    var xCategory = []

    if (rekeningBulanan) {
      rekeningBulanan.date.forEach((val, index) => {
        if (val === 1) {
          xCategory.push('Jan')
        } else if (parseInt(val) === 2) {
          xCategory.push('Feb')
        } else if (parseInt(val) === 3) {
          xCategory.push('Mar')
        } else if (parseInt(val) === 4) {
          xCategory.push('Apr')
        } else if (parseInt(val) === 5) {
          xCategory.push('Mei')
        } else if (parseInt(val) === 6) {
          xCategory.push('Jun')
        } else if (parseInt(val) === 7) {
          xCategory.push('Jul')
        } else if (parseInt(val) === 8) {
          xCategory.push('Aug')
        } else if (parseInt(val) === 9) {
          xCategory.push('Sep')
        } else if (parseInt(val) === 10) {
          xCategory.push('Oct')
        } else if (parseInt(val) === 11) {
          xCategory.push('Nov')
        } else if (parseInt(val) === 12) {
          xCategory.push('Dec')
        } else {
          xCategory.push(val)
        }
      })
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
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    rekeningBulanan: state.monthlySettlement.rekeningBulanan,
    dataPerRuas: state.monthlySettlement.dataPerRuas,
  }
}
export default connect(mapStateToProps)(RekeningKoran)