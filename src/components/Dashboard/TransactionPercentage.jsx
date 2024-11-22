import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';

import '../css/dashboard-transaction.scss'
import DropdownMenuCommandPanel from '../Button/DropdownMenuCommandPanel';
import TransactionSpinner from '../Spinner/TransactionSpinner';
import DropdownMenuSwitchData from '../Button/DropdownMenuSwitchData';

class TransactionPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyTransPercent: 'Loading',
      monthlyTrafficPercent: 'Loading',
      yearlyTransPercent: 'Loading',
      yearlyTrafficPercent: 'Loading'
    };
  }

  componentWillMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.ID_GROUP === 5) {
      this.setState({
        style: { backgroundColor: 'rgb(0,0,0,0)', border: 'none' }
      })
    } else {
      this.setState({
        style: { backgroundColor: 'rgb(0,0,0,0)', border: 'none' }
      })
    }
  }


  componentWillReceiveProps(nextProps) {
    const { percentage } = this.props
    let identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.branch_code === 'PUSAT') {
      if (percentage[0] !== nextProps.percentage.percentageDivisi) {
        if (nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_MONTHLY || nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY || nextProps.percentage.percentageDivisi.PROSENTASE_LALIN_MONTHLY || nextProps.percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY) {
          if (nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_MONTHLY) {
            this.setState({
              monthlyTransPercent: nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_MONTHLY,
              yearlyTransPercent: nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY,
              monthlyTrafficPercent: nextProps.percentage.percentageDivisi.PROSENTASE_LALIN_MONTHLY,
              yearlyTrafficPercent: nextProps.percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY
            });
          }
        }
      }
    }
    else {
      if (percentage[0] !== nextProps.percentage.percentageRuas) {
        nextProps.percentage.percentageRuas.forEach((val, index) => {
          if (val.RUAS_CODE === identity.branch_code) {
            this.setState({
              monthlyTransPercent: val.TRANSACTION_MONTHLY_PERCENTAGE.toFixed(2) + ' %',
              yearlyTransPercent: val.TRANSACTION_YEARLY_PERCENTAGE.toFixed(2) + ' %',
              monthlyTrafficPercent: val.TRAFFIC_MONTHLY_PERCENTAGE.toFixed(2) + ' %',
              yearlyTrafficPercent: val.TRAFFIC_YEARLY_PERCENTAGE.toFixed(2) + ' %'
            });
          }
        })
      }
    }
  }

  render() {
    return (

      <Card style={this.state.style}>
        {/* <CardHeader style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)', fontSize: '18px' }}>
          <i className="fa fa-exchange"></i> <b>Transaction Overview</b>
          <DropdownMenuCommandPanel />
          <DropdownMenuSwitchData
            switch_data={this.props.switch_data}
          />
        </CardHeader> */}
        <CardBody>
          <Row>
            <Col xs="12" sm="6" lg="3">
              <TransactionSpinner
                title='Monthly Transaction Achievement'
                percentage={this.state.monthlyTransPercent}
                spinner_class="spinner spinner-1"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <TransactionSpinner
                title='Yearly Transaction Achievement'
                percentage={this.state.yearlyTransPercent}
                spinner_class="spinner spinner-2"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <TransactionSpinner
                title='Monthly Traffic Achievement'
                percentage={this.state.monthlyTrafficPercent}
                spinner_class="spinner spinner-3"
              />
            </Col>
            <Col xs="12" sm="6" lg="3">
              <TransactionSpinner
                title='Yearly Traffic Achievement'
                percentage={this.state.yearlyTrafficPercent}
                spinner_class="spinner spinner-4"
              />
            </Col>
          </Row>
        </CardBody>
      </Card >
    )
  }

}
const mapStateToProps = (state) => {
  return {
    percentage: state.dashboard.percentage
  }
}
export default connect(mapStateToProps)(TransactionPercentage)