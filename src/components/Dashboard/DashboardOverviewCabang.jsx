import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
  Progress
} from 'reactstrap';
import CardBasic from '../Cards/CardBasic';
import TransactionDaily from './TransactionDaily';
import { dashboardAction, accidentActions, potholesActions, rtmsActions, settlementAction, ruasActions } from '../../store/action'
import '../css/dashboard-cabang.css'
import Revenue from '../Division/Revenue';
import VerticalProgress from '../Division/VerticalProgress';
import VerticalProgressTwo from '../Division/VerticalProgressTwo';
import VerticalProgressThree from '../Division/VerticalProgressThree';
import Core from '../Division/Core';
import RevenueDaily from '../Division/RevenueDaily';
import BankRevenue from '../Division/BankRevenue';
import Rtms from '../Division/Rtms';
import UserSatisfication from '../Division/UserSatification';

class DashboardOverviewCabang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background_group: true,
      disable_title: false,
      chartHeight: 150,
      isOverviewCabang: true
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    let timeout
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))
    dispatch(dashboardAction.getPercentageTransactionTrafficDailyByRealisasi(identity.branch_code));
    dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(identity.branch_code));
    dispatch(accidentActions.getAccident(identity.branch_code));
    dispatch(accidentActions.getAccidentRate(identity.branch_code));
    dispatch(rtmsActions.getLiveData(identity.branch_code));
    dispatch(settlementAction.getSettlementKoran(identity.branch_code));
    dispatch(potholesActions.getPotholesOverview(identity.branch_code));
    dispatch(ruasActions.getRuasByCode(identity.branch_code));
    timeout = setInterval(function () {
      dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(identity.branch_code));
      dispatch(accidentActions.getAccident(identity.branch_code));
      dispatch(accidentActions.getAccidentRate(identity.branch_code));
      dispatch(rtmsActions.getLiveData(identity.branch_code));
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
      dispatch(potholesActions.getPotholesOverview(identity.branch_code));
    }, 1500 * 1000);
    if (!this.props.is_division) {
      this.setState({
        disable_title: true
      });
    }
  }

  render() {

    const { percentage, monthlyRevenueBank, accidentCount, accidentRateData, potholes, rtms, dataPerRuas, ruas } = this.props
    const identity = JSON.parse(localStorage.getItem('identity'))
    let thisMonthTransaction = 0
    let thisMonthTrafic = 0
    let thisYearTransaction = 0
    let thisYearTrafic = 0
    let monthlyPercentageTransaction = 0
    let monthlyPercentageTraffic = 0
    let yearlyPercentageTransaction = 0
    let yearlyPercentageTraffic = 0
    let monthlyRevenueValue = 0
    let yearlyRevenueValue = 0

    percentage.percentageRuas.forEach((val, index) => {
      if (val.RUAS_CODE === identity.branch_code) {
        thisMonthTransaction = val.TRANSACTION_REALISASI_MONTHLY
        thisMonthTrafic = val.TRAFFIC_REALISASI_MONTHLY
        thisYearTransaction = val.TRANSACTION_REALISASI_YEARLY
        thisYearTrafic = val.TRAFFIC_REALISASI_YEARLY
        monthlyRevenueValue = Math.round((val.TRAFFIC_MONTHLY_PERCENTAGE + val.TRANSACTION_MONTHLY_PERCENTAGE) / 2)
        yearlyRevenueValue = Math.round((val.TRAFFIC_YEARLY_PERCENTAGE + val.TRANSACTION_YEARLY_PERCENTAGE) / 2)
        monthlyPercentageTransaction = Math.round(val.TRANSACTION_MONTHLY_PERCENTAGE)
        monthlyPercentageTraffic = Math.round(val.TRAFFIC_MONTHLY_PERCENTAGE)
        yearlyPercentageTransaction = (val.TRANSACTION_YEARLY_PERCENTAGE)
        yearlyPercentageTraffic = (val.TRAFFIC_YEARLY_PERCENTAGE)
      }
    })

    let accidentRateBar = {
      style: {
        height: '0%'
      }
    }
    let potholeBar = {
      style: {
        height: '0%'
      }
    }

    if (accidentRateData[0].T_KECELAKAAN > 0) {
      accidentRateBar = {
        style: {
          height: accidentRateData[0].T_KECELAKAAN.toFixed(2) + '%'
        }
      }
    }
    let potholesPercentage = '00'
    let currentPotholes = 0
    if (potholes[0]) {
      let a = 0
      if (potholes[0].NOT_HANDLING === 0) {
        a = 100
      } else {
        a = 100 - (potholes[0].NOT_HANDLING / potholes[0].TOTAL_POTHOLES * 100)
      }

      potholesPercentage = Math.round(a) + '%'
      if (potholes[0].NOT_HANDLING) {
        currentPotholes = potholes[0].NOT_HANDLING
      } else {
        currentPotholes = 0
      }
      potholeBar = {
        style: {
          height: Math.round(a) + '%'
        }
      }
    }

    let fatality
    if (!accidentRateData[0].T_FATALITY) {
      fatality = 0
    }

    let chartTrans = <TransactionDaily
      style_group={this.state.background_group}
      disable_title={this.state.disable_title}
      chart_height={this.state.chartHeight}
      isOverviewCabang={this.state.isOverviewCabang}
    />
    let monthlyRevenue = <Revenue
      transaction={thisMonthTransaction}
      traffic={thisMonthTrafic}
      revenueValue={monthlyRevenueValue}
      percentageTransaction={monthlyPercentageTransaction}
      percentageTraffic={monthlyPercentageTraffic}
    ></Revenue>
    let yearlyRevenue = <Revenue
      transaction={thisYearTransaction}
      traffic={thisYearTrafic}
      revenueValue={yearlyRevenueValue}
      percentageTransaction={Math.round(yearlyPercentageTransaction)}
      percentageTraffic={Math.round(yearlyPercentageTraffic)}
    ></Revenue>
    let accidentCountComp = <VerticalProgressTwo
      total={accidentCount.ruasAccident[0].jumlah}
      light={accidentCount.countAccident.lightInjury}
      heavy={accidentCount.countAccident.heavyInjury}
      fatality={accidentCount.countAccident.fatality}
      tk={accidentRateData[0].T_KECELAKAAN.toFixed(2)}
      tf={fatality}
    />
    let complainRate = <VerticalProgress ></VerticalProgress>
    let potholeHandling = <VerticalProgress
      total={currentPotholes}
      current={potholesPercentage}
      bar={potholeBar}
    />
    let revenueDaily = <RevenueDaily
      transaction={monthlyPercentageTransaction}
      traffic={monthlyPercentageTraffic}
    />
    let bankRevenue = <BankRevenue
      bca={monthlyRevenueBank.TOTAL_TRANSAKSI_BCA}
      bni={monthlyRevenueBank.TOTAL_TRANSAKSI_BNI}
      bri={monthlyRevenueBank.TOTAL_TRANSAKSI_BRI}
      mandiri={monthlyRevenueBank.TOTAL_TRANSAKSI_MANDIRI}
      tunai={monthlyRevenueBank.TOTAL_TRANSAKSI_TUNAI}
    ></BankRevenue>
    let rtmsComp = <Rtms
      data={rtms}
    />
    let userSatisfication = <UserSatisfication ></UserSatisfication>

    let ruasPercentage = 0
    let safetyLevel = 0
    let ruasName = 'Loading'
    if (ruas[0]) {
      safetyLevel = 100 - (accidentRateData[0].T_KECELAKAAN * ruas[0].SECTION_LENGTH / Math.pow(10, 8))
      ruasName = ruas[0].RUAS_NAME
    }

    let pendapatan = 0
    if (dataPerRuas[0]) {
      pendapatan = (dataPerRuas[0].rp.reduce((a, b) => a + b, 0) / dataPerRuas[0].fs.reduce((a, b) => a + b, 0) * 100)
    }

    let transactionRuas = ((pendapatan + yearlyPercentageTraffic + yearlyPercentageTransaction + parseInt(potholesPercentage) + safetyLevel) / 5).toFixed(1)
    return (
      <div id="overview" className="animated fadeIn">
        <Row>
          <Col md="3">
            <Row className="no-gutters">
              <Col>
                <CardBasic
                  title={'Pendapatan Harian'}
                  body={chartTrans}
                />
              </Col>
            </Row>
            <Row className="no-gutters">
              <Col md="12">
                <CardBasic
                  title={'Pendapatan Bulan ini'}
                  body={monthlyRevenue}
                />
              </Col>
            </Row>
            <Row className="no-gutters">
              <Col md="12">
                <CardBasic
                  title={'Pendapatan Tahunan'}
                  body={yearlyRevenue}
                />
              </Col>
            </Row>
            <Row className="no-gutters">
              <Col md="6">
                <CardBasic
                  title={'Complain'}
                  body={complainRate}
                />
              </Col>
              <Col md="6">
                <CardBasic
                  title={'Pothole Handling'}
                  body={potholeHandling}
                />
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Core
              percentage={transactionRuas}
              ruas={ruasName}
            />
          </Col>
          <Col md="3">
            <Row className="no-gutters">
              <Col md="12">
                <CardBasic
                  title={'Info Kecelakaan'}
                  body={accidentCountComp}
                />
              </Col>
            </Row>
            <Row className="no-gutters">
              <Col md="12">
                <CardBasic
                  title={'Remote Traffic Microwave System'}
                  body={rtmsComp}
                />
              </Col>
            </Row>
            <Row className="no-gutters">
              <Col md="12">
                <CardBasic
                  title={'User Satisfaction Level'}
                  body={userSatisfication}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    monthlyTransactionByRealisasi: state.monthlyDashboardTransactionTrafficByRealisasi.monthlyByRealisasi,
    monthlyRevenueBank: state.monthlyRevenueBank.monthlyRevenueBank,
    percentage: state.dashboard.percentage,
    potholes: state.potholes.potholes,
    rtms: state.rtms.rtms,
    accidentRateData: state.accidentRate.rate,
    accidentCount: state.accident.accident,
    dataPerRuas: state.monthlySettlement.dataPerRuas,
    potholes: state.potholes.potholes,
    ruas: state.ruas.ruas
  }
}

export default connect(mapStateToProps)(DashboardOverviewCabang) 