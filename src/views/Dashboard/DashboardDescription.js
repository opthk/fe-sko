import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settlementAction, dashboardAction } from '../../store/action'

import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import '../../components/css/table-desc.css'
import DropdownMenuCommandPanel from '../../components/Button/DropdownMenuCommandPanel';

class DashboardDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount() {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))

    if (identity.branch_code === 'PUSAT') {
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficMonthlyByRealisasi(identity.branch_code));
      dispatch(settlementAction.getBagiHasil(identity.branch_code));
    }
  }

  render() {
    const { bagiHasilSettlement, bankPercentagePerRuas, monthlyByRealisasi } = this.props
    let NumberFormat = require('react-number-format');
    let resultData = []
    let tableList = []
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let ruas = []
    let last_update = []

    bagiHasilSettlement.forEach((val, index) => {
      last_update.push(val.CREATED_DATE)
      ruas.push(val.RUAS_CODE)
    })
    let uniqueDate = [...new Set(last_update)];
    let uniqueRuas = [...new Set(ruas)];
    uniqueRuas = uniqueRuas.sort()
    let today = new Date();
    let dd = today.getDate(); //January is 0!
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let tillThisMonth = monthNames[today.getMonth()]
    today = mm + '/' + dd + '/' + yyyy;
    let raw = []
    // console.log(uniqueRuas)
    // console.log(monthlyByRealisasi)
    // console.log(bagiHasilSettlement)

    uniqueRuas.forEach((val1, index1) => {
      tableList[index1] = []
      tableList[index1]['ruas'] = []
      tableList[index1] = []
      tableList[index1]['date'] = []
      tableList[index1] = []
      tableList[index1] = []
      tableList[index1]['rencana'] = []
      tableList[index1]['realisasi'] = []
      tableList[index1]['rencana_lalin'] = []
      tableList[index1]['realisasi_lalin'] = []
      raw[index1] = []
      raw[index1]['ruas'] = []
      raw[index1]['trafficPlanMonthly'] = []
      raw[index1]['trafficRealMonthly'] = []
      raw[index1]['trafficPlanYearly'] = []
      raw[index1]['trafficRealYearly'] = []
      raw[index1]['transPlanMonthly'] = []
      raw[index1]['transPlanYearly'] = []
      raw[index1]['transRealMonthly'] = []
      raw[index1]['transRealYearly'] = []
      bagiHasilSettlement.forEach((val2, index2) => {
        if (val1 === val2.RUAS_CODE) {
          tableList[index1]['ruas'] = val2.RUAS_CODE
          tableList[index1]['date'] = val2.MONTH + '-' + val2.YEAR
          tableList[index1]['rencana'].push(val2.RENCANA)
          tableList[index1]['realisasi'].push(val2.REALISASI)
          tableList[index1]['rencana_lalin'].push(val2.RENCANA_LALIN)
          tableList[index1]['realisasi_lalin'].push(val2.REALISASI_LALIN)
          raw[index1]['ruas'] = val2.RUAS_CODE
          raw[index1]['trafficPlanMonthly'].push(val2.RENCANA_LALIN)
          raw[index1]['transPlanMonthly'].push(val2.RENCANA)
        }
      })
      if (monthlyByRealisasi.data_trafic && monthlyByRealisasi.data_trans) {
        monthlyByRealisasi.data_trafic.forEach((val3, index3) => {
          if (val1 === val3.name) {
            raw[index1]['trafficRealMonthly'].push(val3.data[mm - 1])
            raw[index1]['trafficRealYearly'].push(val3.data[val3.data.length - 1])
          }
        })
        monthlyByRealisasi.data_trans.forEach((val4, index4) => {
          if (val1 === val4.name) {
            raw[index1]['transRealMonthly'].push(val4.data[mm - 1])
            raw[index1]['transRealYearly'].push(val4.data[val4.data.length - 1])
          }
        })
      }
    })
    raw.forEach((val, index) => {
      resultData[index] = {}
      resultData[index]['ruas'] = val.ruas
      resultData[index]['trafficPlanMonthly'] = val.trafficPlanMonthly[val.trafficPlanMonthly.length - 1]
      resultData[index]['trafficRealMonthly'] = val.trafficRealMonthly[0]
      resultData[index]['trafficPlanYearly'] = val.trafficPlanMonthly.reduce((a, b) => a + b, 0)
      resultData[index]['trafficRealYearly'] = val.trafficRealYearly[0]
      resultData[index]['transPlanMonthly'] = val.transPlanMonthly[val.transPlanMonthly.length - 1]
      resultData[index]['transRealMonthly'] = val.transRealMonthly[0]
      resultData[index]['transPlanYearly'] = val.transPlanMonthly.reduce((a, b) => a + b, 0)
      resultData[index]['transRealYearly'] = val.transRealYearly[0]
    })

    var table = tableList.map((val, index) => {
      let yearReal = ((val.realisasi.reduce((a, b) => a + b, 0))).toFixed(2)
      let yearPlan = ((val.rencana.reduce((a, b) => a + b, 0))).toFixed(2)
      let yearAvg = (yearReal / yearPlan * 100).toFixed(2)
      let yearRealLalin = ((val.realisasi_lalin.reduce((a, b) => a + b, 0))).toFixed(2)
      let yearPlanLalin = ((val.rencana_lalin.reduce((a, b) => a + b, 0))).toFixed(2)
      let yearAvgLalin = (yearRealLalin / yearPlanLalin * 100).toFixed(2)
      let monthReal = (val.realisasi[val.realisasi.length - 1]).toFixed(2)
      let monthPlan = (val.rencana[val.rencana.length - 1]).toFixed(2)
      let monthAvg = ((val.realisasi[val.realisasi.length - 1] / val.rencana[val.rencana.length - 1] * 100)).toFixed(2)
      let monthRealLalin = (val.realisasi_lalin[val.realisasi_lalin.length - 1]).toFixed(2)
      let monthPlanLalin = (val.rencana_lalin[val.rencana_lalin.length - 1]).toFixed(2)
      let monthAvgLalin = ((val.realisasi_lalin[val.realisasi_lalin.length - 1] / val.rencana_lalin[val.rencana_lalin.length - 1] * 100)).toFixed(2)

      if (isNaN(yearAvg)) {
        yearAvg = 0
        monthAvg = 0
      }
      if (isNaN(monthAvg)) {
        yearAvgLalin = 0
        monthAvgLalin = 0
      }

      return (
        <tr key={index}>
          <td>{val.ruas}</td>
          <td><NumberFormat value={monthPlan} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></td>
          <td><NumberFormat value={monthReal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></td>
          <td>{monthAvg + ' %'}</td>
          <td><NumberFormat value={yearPlan} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></td>
          <td><NumberFormat value={yearReal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></td>
          <td>{yearAvg + ' %'}</td>
          <td><NumberFormat value={monthPlanLalin} displayType={'text'} thousandSeparator={true} /></td>
          <td><NumberFormat value={monthRealLalin} displayType={'text'} thousandSeparator={true} /></td>
          <td>{monthAvgLalin + ' %'}</td>
          <td><NumberFormat value={yearPlanLalin} displayType={'text'} thousandSeparator={true} /></td>
          <td><NumberFormat value={yearRealLalin} displayType={'text'} thousandSeparator={true} /></td>
          <td>{yearAvgLalin + ' %'}</td>
        </tr>
      )
    })


    var table2 = bankPercentagePerRuas.map((val, index) => {
      let mandiri = 0
      let bca = 0
      let bni = 0
      let bri = 0
      mandiri = ((val.mandiri.rp.reduce((a, b) => a + b, 0)) / (val.mandiri.fs.reduce((a, b) => a + b, 0)) * 100).toFixed(2)
      bca = ((val.bca.rp.reduce((a, b) => a + b, 0)) / (val.bca.fs.reduce((a, b) => a + b, 0)) * 100).toFixed(2)
      bni = ((val.bni.rp.reduce((a, b) => a + b, 0)) / (val.bni.fs.reduce((a, b) => a + b, 0)) * 100).toFixed(2)
      bri = ((val.bri.rp.reduce((a, b) => a + b, 0)) / (val.bri.fs.reduce((a, b) => a + b, 0)) * 100).toFixed(2)

      return (
        <tr key={index}>
          <td>{val.ruas_code}</td>
          <td>{mandiri} %</td>
          <td>{bca} %</td>
          <td>{bri} %</td>
          <td>{bni} %</td>
        </tr>
      )
    })

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', border: 'none' }}>
              <CardHeader style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                <i className="fa fa-list"></i> Branch Detail Overview
                <DropdownMenuCommandPanel />
              </CardHeader>
              <CardBody>
                <Table id="desc" responsive bordered style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 10, textAlign: 'center' }}>
                  <thead style={{ fontSize: 11 + 'px' }}>
                    <tr>
                      <th rowSpan="3" style={{ verticalAlign: "middle" }}>Ruas</th>
                      <th colSpan="6">Transaksi</th>
                      <th colSpan="6">Lalu Lintas</th>
                    </tr>
                    <tr>
                      <th colSpan="3">Bulan ini sampai dengan {uniqueDate}</th>
                      <th colSpan="3">Tahunan</th>
                      <th colSpan="3">Bulan ini sampai dengan {uniqueDate}</th>
                      <th colSpan="3">Tahunan</th>
                    </tr>
                    <tr>
                      <th>Rencana</th>
                      <th>Realisasi</th>
                      <th>Prosentase</th>
                      <th>Rencana</th>
                      <th>Realisasi</th>
                      <th>Prosentase</th>
                      <th>Rencana</th>
                      <th>Realisasi</th>
                      <th>Prosentase</th>
                      <th>Rencana</th>
                      <th>Realisasi</th>
                      <th>Prosentase</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: 10 + 'px', textAlign: 'center' }}>
                    {table}
                  </tbody>
                </Table>
                <Table responsive bordered striped style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 10 }}>
                  <thead style={{ fontSize: 11 + 'px' }}>
                    <tr>
                      <th style={{ textAlign: "center", verticalAlign: "middle" }} rowSpan="2">Ruas</th>
                      <th style={{ textAlign: "center" }} colSpan="4">Pencapaian Settlement per Bank ( January s/d {tillThisMonth + yyyy})</th>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "center" }} >Mandiri</th>
                      <th style={{ textAlign: "center" }} >BCA</th>
                      <th style={{ textAlign: "center" }} >BRI</th>
                      <th style={{ textAlign: "center" }} >BNI</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: 10 + 'px', textAlign: 'center' }}>
                    {table2}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    dailyTransaction: state.dailyTransaction.dailyTransaction,
    dailyTraffic: state.dailyTraffic.dailyTraffic,
    monthlyTransaction: state.monthlyTransaction.monthlyTransaction,
    monthlyTraffic: state.monthlyTraffic.monthlyTraffic,
    ruasList: state.monthlySettlement.settlementByRuasMonthly,
    dailySettlement: state.dailySettlement.dailySettlement,
    bagiHasilSettlement: state.bagiHasilSettlement.bagiHasil,
    bankPercentagePerRuas: state.monthlySettlement.bankPercentagePerRuas,
    monthlyByRealisasi: state.monthlyDashboardTransactionTrafficByRealisasi.monthlyByRealisasi,
  }
}
export default connect(mapStateToProps)(DashboardDescription)