import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardAction } from '../../store/action'
import { settlementAction } from '../../store/action'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge
} from 'reactstrap';
import OverviewDivision from '../../components/Dashboard/OverviewDivision';
import OverviewBranch from '../../components/Dashboard/OverviewBranch';
import '../../components/css/dashboard-overview.scss'
import '../../components/css/dashboard-spinner.css'
import DropdownMenuCommandPanel from '../../components/Button/DropdownMenuCommandPanel';

class DashboardTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))

    const { dispatch } = this.props

    if (identity.branch_code === 'PUSAT') {
      dispatch(settlementAction.getBagiHasil(identity.branch_code));
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
    }
  }

  render() {
    var rekap = 0
    var jorrs = []
    var atp = []
    var mebi = []
    var palindra = []
    var bakter = []
    var division = []
    var divisionPercent = 0 + '%'
    var x
    var z
    var bagiHasil = []

    jorrs['lalin'] = 0
    jorrs['transaksi'] = 0
    jorrs['rekeningKoran'] = 0
    jorrs['rawpercentage'] = []
    jorrs['percentage'] = 'loading'
    atp['lalin'] = 0
    atp['transaksi'] = 0
    atp['rekeningKoran'] = 0
    atp['rawpercentage'] = []
    atp['percentage'] = 'loading'
    mebi['lalin'] = 0
    mebi['transaksi'] = 0
    mebi['rekeningKoran'] = 0
    mebi['rawpercentage'] = []
    mebi['percentage'] = 'loading'
    palindra['lalin'] = 0
    palindra['transaksi'] = 0
    palindra['rekeningKoran'] = 0
    palindra['rawpercentage'] = []
    palindra['percentage'] = 'loading'
    bakter['lalin'] = 0
    bakter['transaksi'] = 0
    bakter['rekeningKoran'] = 0
    bakter['rawpercentage'] = []
    bakter['percentage'] = 'loading'

    const { percentage, dataPerRuas, bagiHasilSettlement } = this.props
    var ruas = []
    var ruasHasil = bagiHasilSettlement.map((val, index) => {
      ruas.push(val.RUAS_CODE)
    })
    let uniqueRuas = [...new Set(ruas)];

    for (x = 0; x < uniqueRuas.length; x++) {
      bagiHasil[x] = []
      bagiHasil[x]['ruas'] = []
      bagiHasil[x] = []
      bagiHasil[x]['date'] = []
      bagiHasil[x] = []
      bagiHasil[x] = []
      bagiHasil[x]['rencana'] = []
      bagiHasil[x]['realisasi'] = []
      bagiHasil[x]['rencana_lalin'] = []
      bagiHasil[x]['realisasi_lalin'] = []
      for (z = 0; z < bagiHasilSettlement.length; z++) {
        if (uniqueRuas[x] === bagiHasilSettlement[z].RUAS_CODE) {
          bagiHasil[x]['ruas'] = bagiHasilSettlement[z].RUAS_CODE
          bagiHasil[x]['date'] = bagiHasilSettlement[z].MONTH + '-' + bagiHasilSettlement[z].YEAR
          bagiHasil[x]['rencana'].push(bagiHasilSettlement[z].RENCANA)
          bagiHasil[x]['realisasi'].push(bagiHasilSettlement[z].REALISASI)
          bagiHasil[x]['rencana_lalin'].push(bagiHasilSettlement[z].RENCANA_LALIN)
          bagiHasil[x]['realisasi_lalin'].push(bagiHasilSettlement[z].REALISASI_LALIN)
        }
      }
    }

    var bagiHasil = bagiHasil.map((val, index) => {
      let yearRealTrans = ((val.realisasi.reduce((a, b) => a + b, 0)) / val.realisasi.length).toFixed(2)
      let yearPlanTrans = ((val.rencana.reduce((a, b) => a + b, 0)) / val.rencana.length).toFixed(2)
      let yearRealTraf = ((val.realisasi_lalin.reduce((a, b) => a + b, 0)) / val.realisasi_lalin.length).toFixed(2)
      let yearPlanTraf = ((val.rencana_lalin.reduce((a, b) => a + b, 0)) / val.rencana_lalin.length).toFixed(2)
      // let yearAvgTrans = (yearRealTraf / yearPlanTraf * 100).toFixed(2)
      // let yearAvgTraf = (yearRealTrans / yearPlanTrans * 100).toFixed(2)
      // let monthReal = (val.realisasi[val.realisasi.length - 1]).toFixed(2)
      // let monthPlan = (val.rencana[val.rencana.length - 1]).toFixed(2)
      // let monthAvg = ((val.realisasi[val.realisasi.length - 1] / val.rencana[val.rencana.length - 1] * 100)).toFixed(2)

      if (val.ruas === 'JORR-S') {
        jorrs['lalin'] = (yearRealTraf / yearPlanTraf * 100)
        jorrs['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
        jorrs['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
        jorrs['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
      }
      else if (val.ruas === 'ATP') {
        atp['lalin'] = (yearRealTraf / yearPlanTraf * 100)
        atp['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
        atp['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
        atp['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
      }
      else if (val.ruas === 'MEBI') {
        mebi['lalin'] = (yearRealTraf / yearPlanTraf * 100)
        mebi['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
        mebi['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
        mebi['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
      }
      // else if (val.ruasCode === 'PALINDRA') {
      //   palindra['lalin'] = 0
      //   palindra['transaksi'] = 0
      //   palindra['rawpercentage'].push(val.year[0].persenLalin)
      //   palindra['rawpercentage'].push(val.year[0].persen)
      // }
      else if (val.ruas === 'BAKTER') {
        bakter['lalin'] = (yearRealTraf / yearPlanTraf * 100)
        // bakter['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
        // bakter['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
        bakter['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
      }
    })

    dataPerRuas.map((val, index) => {
      if (val.ruas_code === 'JORR-S') {
        rekap = val.rekap.reduce((a, b) => a + b, 0)
        rekap = (rekap / val.rekap.length).toFixed(1)
        jorrs['rekeningKoran'] = parseFloat(rekap)
        jorrs['rawpercentage'].push(parseFloat(rekap))
      }
      else if (val.ruas_code === 'ATP') {
        rekap = val.rekap.reduce((a, b) => a + b, 0)
        rekap = (rekap / val.rekap.length).toFixed(1)
        atp['rekeningKoran'] = parseFloat(rekap)
        atp['rawpercentage'].push(parseFloat(rekap))
      }
      else if (val.ruas_code === 'MEBI') {
        rekap = val.rekap.reduce((a, b) => a + b, 0)
        rekap = (rekap / val.rekap.length).toFixed(1)
        mebi['rekeningKoran'] = parseFloat(rekap)
        mebi['rawpercentage'].push(parseFloat(rekap))
      }
      // else if (val.ruas_code === 'PALINDRA') {
      //   rekap = val.rekap.reduce((a, b) => a + b, 0)
      //   rekap = (rekap / val.rekap.length).toFixed(1)
      //   palindra['rekeningKoran'] = parseFloat(rekap)
      //   palindra['rawpercentage'].push(parseFloat(rekap))
      // }
      else if (val.ruas_code === 'BAKTER') {
        rekap = val.rekap.reduce((a, b) => a + b, 0)
        rekap = (rekap / val.rekap.length).toFixed(1)
        bakter['rekeningKoran'] = parseFloat(rekap)
        bakter['rawpercentage'].push(parseFloat(rekap))
      }
    })

    if (jorrs['lalin'] !== 0) {
      var sumPercentage = 0
      sumPercentage = jorrs['rawpercentage'].reduce((a, b) => a + b, 0)
      jorrs['percentage'] = (sumPercentage / jorrs['rawpercentage'].length).toFixed(2) + '%'
      division.push(sumPercentage / jorrs['rawpercentage'].length)
    }
    if (atp['lalin'] !== 0) {
      var sumPercentage = 0
      sumPercentage = atp['rawpercentage'].reduce((a, b) => a + b, 0)
      atp['percentage'] = (sumPercentage / atp['rawpercentage'].length).toFixed(2) + '%'
      division.push(sumPercentage / atp['rawpercentage'].length)
    }
    if (mebi['lalin'] !== 0) {
      var sumPercentage = 0
      sumPercentage = mebi['rawpercentage'].reduce((a, b) => a + b, 0)
      mebi['percentage'] = (sumPercentage / mebi['rawpercentage'].length).toFixed(2) + '%'
      division.push(sumPercentage / mebi['rawpercentage'].length)
    }
    // if (palindra['lalin'] !== 0) {
    //   var sumPercentage = 0
    //   sumPercentage = palindra['rawpercentage'].reduce((a, b) => a + b, 0)
    //   palindra['percentage'] = Math.round(sumPercentage / palindra['rawpercentage'].length) + '%'
    //   division.push(sumPercentage / palindra['rawpercentage'].length)
    // } else {
    //   division.push(0)
    //   palindra['percentage'] = 0 + '%'
    // }
    if (bakter['lalin'] !== 0) {
      var sumPercentage = 0
      sumPercentage = bakter['rawpercentage'].reduce((a, b) => a + b, 0)
      bakter['percentage'] = (sumPercentage / bakter['rawpercentage'].length).toFixed(2) + '%'
      division.push(sumPercentage / bakter['rawpercentage'].length)
    }

    if (division.length !== 0) {
      var sumDivision = division.reduce((a, b) => a + b, 0)
      divisionPercent = Math.round(sumDivision / division.length) + '%'
    }

    return (
      <div id="overview" className="animated fadeIn">
        <Row style={{ minHeight: '675px' }
        } >
          <Col lg="3" md="3" style={{ marginTop: '17.5%' }}>
            <Row style={{ marginLeft: '7.5%' }}>
              <Col>
                <Table responsive style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>Transaksi</th>
                      <th style={{ width: '50%' }}>100.56%</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>Lalu Lintas</th>
                      <th style={{ width: '50%' }}>100.22%</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row style={{ marginLeft: '7.5%' }}>
              <Col>
                <Table responsive style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>Settlement</th>
                      <th style={{ width: '50%' }}>98.32%</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
          <Col lg="6" md="6">
            <Row>
              <Col>
                <img src='http://www.hutamakarya.com/assets/front-end/images/logo-site.png' width='125px' />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 style={{ color: '#fff' }} id="overview-title">Sistem Kendali Operasi Tol</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <OverviewDivision persen={divisionPercent} />
              </Col>
            </Row>
          </Col>
          <Col lg="3" md="3">
            <Row>
              <Col>
                <DropdownMenuCommandPanel />
              </Col>
            </Row>
            <Row style={{ marginRight: '7.5%', marginTop: '66.5%' }}>
              <Col>
                <Table responsive style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>Safety Level</th>
                      <th style={{ width: '50%' }}>99.99%</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table responsive style={{ backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50%' }}>Potholes Handling</th>
                      <th style={{ width: '50%' }}>100%</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </ Row>
        <Row>
          <Col lg="3" md="3">
            <div className="spinner" id="spinner-one">
              <div className="spinner-circle spinner-circle-outer-2"></div>
              <div className="spinner-circle-off spinner-circle-inner-2"></div>
              <div className="spinner-circle spinner-circle-single-1-2"></div>
              <div className="spinner-circle spinner-circle-single-2-2"></div>
              <div className="text">{jorrs['percentage']}</div>
              <div className="title" id="ruas_title">Jakarta Outter Ring Road Section S</div>
            </div>
          </Col>
          <Col lg="3" md="3">
            <div className="spinner" id="spinner-two">
              <div className="spinner-circle spinner-circle-outer"></div>
              <div className="spinner-circle-off spinner-circle-inner"></div>
              <div className="spinner-circle spinner-circle-single-1"></div>
              <div className="spinner-circle spinner-circle-single-2"></div>
              <div className="text">{atp['percentage']}</div>
              <div className="title" id="ruas_title" >Akses Tanjung Priok</div>
            </div>
          </Col>
          <Col lg="3" md="3">
            <div className="spinner" id="spinner-two">
              <div className="spinner-circle spinner-circle-outer"></div>
              <div className="spinner-circle-off spinner-circle-inner"></div>
              <div className="spinner-circle spinner-circle-single-1"></div>
              <div className="spinner-circle spinner-circle-single-2"></div>
              <div className="text">{mebi['percentage']}</div>
              <div className="title" id="ruas_title">Medan Binjai</div>
            </div>
          </Col>
          <Col lg="3" md="3">
            <div className="spinner" id="spinner-one">
              <div className="spinner-circle spinner-circle-outer-2"></div>
              <div className="spinner-circle-off spinner-circle-inner-2"></div>
              <div className="spinner-circle spinner-circle-single-1-2"></div>
              <div className="spinner-circle spinner-circle-single-2-2"></div>
              <div className="text">{bakter['percentage']}</div>
              <div className="title" id="ruas_title">Bakauheuni Terbanggi</div>
            </div>
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    percentage: state.dashboard.percentage,
    dataPerRuas: state.monthlySettlement.dataPerRuas,
    bagiHasilSettlement: state.bagiHasilSettlement.bagiHasil
  }
}
export default connect(mapStateToProps)(DashboardTransaction)