import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardAction, accidentActions, settlementAction, potholesActions } from '../../store/action'

import {
  Col,
  Row,
} from 'reactstrap';
import OverviewDivision from './OverviewDivision';
import '../../components/css/dashboard-overview.scss'
import '../../components/css/dashboard-spinner.css'
import DropdownMenuCommandPanel from '../Button/DropdownMenuCommandPanel';
import OverviewTableRuasList from '../Table/OverviewTableRuasList';
import OverviewSpinner from '../Spinner/OverviewSpinner';
import ModalOverview from '../Modals/ModalOverview';
import '../../components/css/dashboard-overview.scss'

class DashboardOverviewDivisi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      modal: false,
      activeRuas: '',
      valueRuas: 0
    };
    this.toggle = this.toggle.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.ID_GROUP) {
      this.setState({
        isCommandCenter: true
      });
    }
  }

  componentDidMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    const { dispatch } = this.props
    if (identity.branch_code === 'PUSAT') {
      dispatch(settlementAction.getBagiHasil(identity.branch_code));
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(identity.branch_code));
      dispatch(accidentActions.getAccidentRate(identity.branch_code));
      dispatch(potholesActions.getPotholesOverview(identity.branch_code));
    }
  }

  toggle(ruas, value) {
    if (this.state.activeRuas === '') {
      this.setState(prevState => ({
        modal: !prevState.modal,
        activeRuas: ruas,
        valueRuas: value
      }));
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal,
        activeRuas: ''
      }));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (this.state.activeRuas !== nextState.activeRuas && nextState.activeRuas === '') {
      // dispatch(settlementAction.getBagiHasil(identity.branch_code));
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(identity.branch_code));
      dispatch(accidentActions.getAccidentRate(identity.branch_code));
      dispatch(potholesActions.getPotholesOverview(identity.branch_code));
    }
  }

  render() {
    const { percentage, dataPerRuas, bagiHasilSettlement, accidentCount, potholes } = this.props
    var ruas = []
    var bagiHasil = []
    var jorrs = []
    var atp = []
    var mebi = []
    var palindra = []
    var bakter = []
    var divisionPercent = 0 + '%'
    var fs = []
    var rp = []
    var settlement = 0 + '%'
    var safety_level = []
    jorrs['lalin'] = 0
    jorrs['transaksi'] = 0
    jorrs['settlement'] = []
    jorrs['rekeningKoran'] = []
    jorrs['safety'] = 0
    jorrs['potholes'] = 0
    jorrs['rawpercentage'] = []
    jorrs['percentage'] = 'loading'
    atp['lalin'] = 0
    atp['transaksi'] = 0
    atp['settlement'] = []
    atp['rekeningKoran'] = []
    atp['safety'] = 0
    atp['potholes'] = 0
    atp['rawpercentage'] = []
    atp['percentage'] = 'loading'
    mebi['lalin'] = 0
    mebi['transaksi'] = 0
    mebi['settlement'] = []
    mebi['rekeningKoran'] = []
    mebi['safety'] = 0
    mebi['potholes'] = 0
    mebi['rawpercentage'] = []
    mebi['percentage'] = 'loading'
    palindra['lalin'] = 0
    palindra['transaksi'] = 0
    palindra['settlement'] = []
    palindra['rekeningKoran'] = []
    palindra['safety'] = 0
    palindra['potholes'] = 0
    palindra['rawpercentage'] = []
    palindra['percentage'] = 'loading'
    bakter['lalin'] = 0
    bakter['transaksi'] = 0
    bakter['settlement'] = []
    bakter['rekeningKoran'] = []
    bakter['safety'] = 0
    bakter['potholes'] = 0
    bakter['rawpercentage'] = []
    bakter['percentage'] = 'loading'
    bagiHasilSettlement.forEach((val, index) => {
      ruas.push(val.RUAS_CODE)
    })
    let uniqueRuas = [...new Set(ruas)];
    uniqueRuas = uniqueRuas.sort();
    uniqueRuas.forEach((val1, index1) => {
      bagiHasil[index1] = []
      bagiHasil[index1]['ruas'] = []
      bagiHasil[index1] = []
      bagiHasil[index1]['date'] = []
      bagiHasil[index1] = []
      bagiHasil[index1]['rencana'] = []
      bagiHasil[index1]['realisasi'] = []
      bagiHasil[index1]['rencana_lalin'] = []
      bagiHasil[index1]['realisasi_lalin'] = []
      if (percentage.percentageRuas.length > 1) {
        percentage.percentageRuas.forEach((val2, index2) => {
          if (uniqueRuas[index1] === val2.RUAS_CODE) {
            if (val2.RUAS_CODE === 'JORR-S') {
              jorrs['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              jorrs['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'ATP') {
              atp['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              atp['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'MEBI') {
              mebi['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              mebi['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'PALINDRA') {
              palindra['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              palindra['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'BAKTER') {
              bakter['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              bakter['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
          }
        })
      }
    })
    // bagiHasil.forEach((val, index) => {
    //   let yearRealTrans = ((val.realisasi.reduce((a, b) => a + b, 0)) / val.realisasi.length).toFixed(2)
    //   let yearPlanTrans = ((val.rencana.reduce((a, b) => a + b, 0)) / val.rencana.length).toFixed(2)
    //   let yearRealTraf = ((val.realisasi_lalin.reduce((a, b) => a + b, 0)) / val.realisasi_lalin.length).toFixed(2)
    //   let yearPlanTraf = ((val.rencana_lalin.reduce((a, b) => a + b, 0)) / val.rencana_lalin.length).toFixed(2)
    //   if (val.ruas === 'JORR-S') {
    //     jorrs['lalin'] = (yearRealTraf / yearPlanTraf * 100)
    //     jorrs['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
    //     jorrs['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
    //     jorrs['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
    //   }
    //   else if (val.ruas === 'ATP') {
    //     atp['lalin'] = (yearRealTraf / yearPlanTraf * 100)
    //     atp['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
    //     atp['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
    //     atp['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
    //   }
    //   else if (val.ruas === 'MEBI') {
    //     mebi['lalin'] = (yearRealTraf / yearPlanTraf * 100)
    //     mebi['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
    //     mebi['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
    //     mebi['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
    //   }
    //   else if (val.ruas === 'PALINDRA') {
    //     palindra['lalin'] = (yearRealTraf / yearPlanTraf * 100)
    //     palindra['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
    //     palindra['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
    //     palindra['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
    //   }
    //   else if (val.ruas === 'BAKTER') {
    //     bakter['lalin'] = (yearRealTraf / yearPlanTraf * 100)
    //     bakter['transaksi'] = (yearRealTrans / yearPlanTrans * 100)
    //     bakter['rawpercentage'].push(yearRealTrans / yearPlanTrans * 100)
    //     bakter['rawpercentage'].push(yearRealTraf / yearPlanTraf * 100)
    //   }
    // })

    dataPerRuas.forEach((val1) => {
      val1.fs.forEach((val2) => {
        if (val1.ruas_code === 'JORR-S') {
          jorrs['settlement'].push(val2)
        } else if (val1.ruas_code === 'ATP') {
          atp['settlement'].push(val2)
        } else if (val1.ruas_code === 'BAKTER') {
          bakter['settlement'].push(val2)
        } else if (val1.ruas_code === 'MEBI') {
          mebi['settlement'].push(val2)
        } else if (val1.ruas_code === 'PALINDRA') {
          palindra['settlement'].push(val2)
        }
        fs.push(val2)
      })
      val1.rp.forEach((val3) => {
        if (val1.ruas_code === 'JORR-S') {
          jorrs['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'ATP') {
          atp['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'BAKTER') {
          bakter['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'MEBI') {
          mebi['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'PALINDRA') {
          palindra['rekeningKoran'].push(val3)
        }
        rp.push(val3)
      })
    })

    jorrs['settlement'] = jorrs['settlement'].reduce((a, b) => a + b, 0)
    atp['settlement'] = atp['settlement'].reduce((a, b) => a + b, 0)
    bakter['settlement'] = bakter['settlement'].reduce((a, b) => a + b, 0)
    mebi['settlement'] = mebi['settlement'].reduce((a, b) => a + b, 0)
    palindra['settlement'] = palindra['settlement'].reduce((a, b) => a + b, 0)
    jorrs['rekeningKoran'] = jorrs['rekeningKoran'].reduce((a, b) => a + b, 0)
    atp['rekeningKoran'] = atp['rekeningKoran'].reduce((a, b) => a + b, 0)
    bakter['rekeningKoran'] = bakter['rekeningKoran'].reduce((a, b) => a + b, 0)
    mebi['rekeningKoran'] = mebi['rekeningKoran'].reduce((a, b) => a + b, 0)
    palindra['rekeningKoran'] = palindra['rekeningKoran'].reduce((a, b) => a + b, 0)

    jorrs['rawpercentage'].push(jorrs['rekeningKoran'] / jorrs['settlement'] * 100)
    atp['rawpercentage'].push(atp['rekeningKoran'] / atp['settlement'] * 100)
    bakter['rawpercentage'].push(bakter['rekeningKoran'] / bakter['settlement'] * 100)
    mebi['rawpercentage'].push(mebi['rekeningKoran'] / mebi['settlement'] * 100)
    palindra['rawpercentage'].push(palindra['rekeningKoran'] / palindra['settlement'] * 100)

    fs = fs.reduce((a, b) => a + b, 0)
    rp = rp.reduce((a, b) => a + b, 0)

    settlement = (rp / fs * 100)

    accidentCount.forEach((val, index) => {
      if (val.RUAS_CODE === 'JORR-S') {
        jorrs['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'ATP') {
        atp['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'BAKTER') {
        bakter['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'MEBI') {
        mebi['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'PALINDRA') {
        palindra['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      }
      safety_level.push(100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8)))
    })

    jorrs['rawpercentage'].push(jorrs['safety'])
    atp['rawpercentage'].push(atp['safety'])
    bakter['rawpercentage'].push(bakter['safety'])
    mebi['rawpercentage'].push(mebi['safety'])
    palindra['rawpercentage'].push(palindra['safety'])

    safety_level = safety_level.reduce((a, b) => a + b, 0) / safety_level.length
    safety_level = safety_level.toString()
    safety_level = safety_level.slice(0, 5) + ' %';

    var potholes_resume = {}
    potholes_resume['ontrack'] = []
    potholes_resume['total'] = []
    potholes.forEach((val, index) => {
      if (val.RUAS_CODE === 'JORR-S') {
        jorrs['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
      } else if (val.RUAS_CODE === 'ATP') {
        atp['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
      } else if (val.RUAS_CODE === 'BAKTER') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          bakter['potholes'] = 100
        } else {
          bakter['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'MEBI') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          mebi['potholes'] = 100
        } else {
          mebi['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'PALINDRA') {
        palindra['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
      }
      potholes_resume['ontrack'].push(val.NOT_HANDLING)
      potholes_resume['total'].push(val.TOTAL_POTHOLES)
    })

    jorrs['rawpercentage'].push(jorrs['potholes'])
    atp['rawpercentage'].push(atp['potholes'])
    bakter['rawpercentage'].push(bakter['potholes'])
    mebi['rawpercentage'].push(mebi['potholes'])
    palindra['rawpercentage'].push(palindra['potholes'])

    potholes_resume['ontrack'] = potholes_resume['ontrack'].reduce((a, b) => a + b, 0)
    potholes_resume['total'] = potholes_resume['total'].reduce((a, b) => a + b, 0)

    var pothole_percentage = 100 - (potholes_resume['ontrack'] / potholes_resume['total'] * 100)
    var sumPercentage = 0

    if (jorrs['rawpercentage'].length === 5) {
      sumPercentage = jorrs['rawpercentage'].reduce((a, b) => a + b, 0)
      jorrs['percentage'] = (sumPercentage / jorrs['rawpercentage'].length)
    }
    if (atp['rawpercentage'].length === 5) {
      sumPercentage = atp['rawpercentage'].reduce((a, b) => a + b, 0)
      atp['percentage'] = (sumPercentage / atp['rawpercentage'].length)
    }
    if (mebi['rawpercentage'].length === 5) {
      sumPercentage = mebi['rawpercentage'].reduce((a, b) => a + b, 0)
      mebi['percentage'] = (sumPercentage / mebi['rawpercentage'].length)
    }
    if (palindra['rawpercentage'].length === 5) {
      sumPercentage = palindra['rawpercentage'].reduce((a, b) => a + b, 0)
      palindra['percentage'] = (sumPercentage / palindra['rawpercentage'].length)
    }
    if (bakter['rawpercentage'].length === 5) {
      sumPercentage = bakter['rawpercentage'].reduce((a, b) => a + b, 0)
      bakter['percentage'] = (sumPercentage / bakter['rawpercentage'].length).toFixed(2)
    }

    let a = percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY.replace(' %', '');
    let b = percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY.replace(' %', '');
    divisionPercent = (parseFloat(a) + parseFloat(b) + settlement + parseFloat(safety_level) + pothole_percentage) / 5

    return (
      <div id="overview" className="animated fadeIn">
        <Row style={{ minHeight: '675px' }
        } >
          <Col lg="3" md="3" style={{ marginTop: '17.5%' }}>
            <OverviewTableRuasList
              ruas={uniqueRuas[0]}
              value={atp['percentage']}
              style={{ marginLeft: '7.5%', color: '#fffF' }}
              width1={{ width: '55%' }}
              width2={{ width: '45%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={uniqueRuas[1]}
              value={bakter['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '60%' }}
              width2={{ width: '40%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={uniqueRuas[2]}
              value={jorrs['percentage']}
              style={{ marginLeft: '7.5%', color: '#fffF' }}
              width1={{ width: '55%' }}
              width2={{ width: '45%' }}
              toggle={this.toggle}
            />
          </Col>
          <Col lg="6" md="6">
            <Row>
              <Col>
                <img src='http://www.hutamakarya.com/assets/front-end/images/logo-site.png' width='125px' alt="hl-logo" />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 style={{ color: '#fff' }} id="overview-title">Sistem Kendali Operasi Tol</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <OverviewDivision
                  value={divisionPercent} />
              </Col>
            </Row>
          </Col>
          <Col lg="3" md="3">
            <Row>
              <Col>
                <DropdownMenuCommandPanel />
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: '61.5%', fontSize: '16px' }}>
                <OverviewTableRuasList
                  ruas={uniqueRuas[3]}
                  value={mebi['percentage']}
                  style={{ marginRight: '7.5%', color: '#fffF' }}
                  width1={{ width: '60%', letterSpacing: '2px' }}
                  width2={{ width: '40%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
                <OverviewTableRuasList
                  ruas={uniqueRuas[4]}
                  value={palindra['percentage']}
                  style={{ color: '#fffF' }}
                  width1={{ width: '40%', letterSpacing: '2px' }}
                  width2={{ width: '60%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
              </Col>
            </Row>
          </Col>
        </ Row>
        <Row>
          <Col lg="1" md="1">
          </Col>
          <Col lg="2" md="2" style={{ marginLeft: '2%' }}>
            <OverviewSpinner
              spinnerID={'spinner-one'}
              spinnerTitle={'Transaction'}
              value={percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY}
            />
          </Col>
          <Col lg="2" md="2">
            <OverviewSpinner
              spinnerID={'spinner-two'}
              spinnerTitle={'Traffic'}
              value={percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY}
            />
          </Col>
          <Col lg="2" md="2">
            <OverviewSpinner
              spinnerID={'spinner-three'}
              spinnerTitle={'Settlement'}
              value={settlement.toFixed(2) + ' %'}
            />
          </Col>
          <Col lg="2" md="2">
            <OverviewSpinner
              spinnerID={'spinner-two'}
              spinnerTitle={'Safety Level'}
              value={safety_level}
            />
          </Col>
          <Col lg="2" md="2">
            <OverviewSpinner
              spinnerID={'spinner-one'}
              spinnerTitle={'Potholes Handling'}
              value={pothole_percentage.toFixed(2) + ' %'}
            />
          </Col>
        </Row>
        <ModalOverview
          modalOpen={this.state.modal}
          toggle={this.toggle}
          activeRuas={this.state.activeRuas}
          valueRuas={this.state.valueRuas}
          isCommandCenter={this.state.isCommandCenter}
        />
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    percentage: state.dashboard.percentage,
    dataPerRuas: state.monthlySettlement.dataPerRuas,
    bagiHasilSettlement: state.bagiHasilSettlement.bagiHasil,
    accidentCount: state.accidentRate.rate,
    potholes: state.potholes.potholes,
  }
}
export default connect(mapStateToProps)(DashboardOverviewDivisi)