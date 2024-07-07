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
import { color } from 'highcharts';

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
    var palindra = []
    var terpeka = []
    var sibanceh = []
    var permai = []
    var binsa = []
    var bengtaba = []
    var pekbang = []
    var inpra = []
    var inkis = []
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
    palindra['lalin'] = 0
    palindra['transaksi'] = 0
    palindra['settlement'] = []
    palindra['rekeningKoran'] = []
    palindra['safety'] = 0
    palindra['potholes'] = 0
    palindra['rawpercentage'] = []
    palindra['percentage'] = 'loading'
    terpeka['lalin'] = 0
    terpeka['transaksi'] = 0
    terpeka['settlement'] = []
    terpeka['rekeningKoran'] = []
    terpeka['safety'] = 0
    terpeka['potholes'] = 0
    terpeka['rawpercentage'] = []
    terpeka['percentage'] = 'loading'
    sibanceh['lalin'] = 0
    sibanceh['transaksi'] = 0
    sibanceh['settlement'] = []
    sibanceh['rekeningKoran'] = []
    sibanceh['safety'] = 0
    sibanceh['potholes'] = 0
    sibanceh['rawpercentage'] = []
    sibanceh['percentage'] = 'loading'
    permai['lalin'] = 0
    permai['transaksi'] = 0
    permai['settlement'] = []
    permai['rekeningKoran'] = []
    permai['safety'] = 0
    permai['potholes'] = 0
    permai['rawpercentage'] = []
    permai['percentage'] = 'loading'
    binsa['lalin'] = 0
    binsa['transaksi'] = 0
    binsa['settlement'] = []
    binsa['rekeningKoran'] = []
    binsa['safety'] = 0
    binsa['potholes'] = 0
    binsa['rawpercentage'] = []
    binsa['percentage'] = 'loading'
    bengtaba['lalin'] = 0
    bengtaba['transaksi'] = 0
    bengtaba['settlement'] = []
    bengtaba['rekeningKoran'] = []
    bengtaba['safety'] = 0
    bengtaba['potholes'] = 0
    bengtaba['rawpercentage'] = []
    bengtaba['percentage'] = 'loading'
    pekbang['lalin'] = 0
    pekbang['transaksi'] = 0
    pekbang['settlement'] = []
    pekbang['rekeningKoran'] = []
    pekbang['safety'] = 0
    pekbang['potholes'] = 0
    pekbang['rawpercentage'] = []
    pekbang['percentage'] = 'loading'
    inpra['lalin'] = 0
    inpra['transaksi'] = 0
    inpra['settlement'] = []
    inpra['rekeningKoran'] = []
    inpra['safety'] = 0
    inpra['potholes'] = 0
    inpra['rawpercentage'] = []
    inpra['percentage'] = 'loading'
    inkis['lalin'] = 0
    inkis['transaksi'] = 0
    inkis['settlement'] = []
    inkis['rekeningKoran'] = []
    inkis['safety'] = 0
    inkis['potholes'] = 0
    inkis['rawpercentage'] = []
    inkis['percentage'] = 'loading'


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
            else if (val2.RUAS_CODE === 'PALINDRA') {
              palindra['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              palindra['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'TERPEKA') {
              terpeka['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              terpeka['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'SIBANCEH') {
              sibanceh['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              sibanceh['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'PERMAI') {
              permai['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              permai['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'BINSA') {
              binsa['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              binsa['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'BENGTABA') {
              bengtaba['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              bengtaba['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'PEKBANG') {
              pekbang['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              pekbang['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'INPRA') {
              inpra['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              inpra['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
            else if (val2.RUAS_CODE === 'INKIS') {
              inkis['rawpercentage'].push(val2.TRANSACTION_YEARLY_PERCENTAGE)
              inkis['rawpercentage'].push(val2.TRAFFIC_YEARLY_PERCENTAGE)
            }
          }
        })
      }
    })

    dataPerRuas.forEach((val1) => {
      val1.fs.forEach((val2) => {
        if (val1.ruas_code === 'JORR-S') {
          jorrs['settlement'].push(val2)
        } else if (val1.ruas_code === 'ATP') {
          atp['settlement'].push(val2)
        } else if (val1.ruas_code === 'TERPEKA') {
          terpeka['settlement'].push(val2)
        } else if (val1.ruas_code === 'SIBANCEH') {
          sibanceh['settlement'].push(val2)
        } else if (val1.ruas_code === 'PERMAI') {
          permai['settlement'].push(val2)
        } else if (val1.ruas_code === 'PALINDRA') {
          palindra['settlement'].push(val2)
        } else if (val1.ruas_code === 'BINSA') {
          binsa['settlement'].push(val2)
        } else if (val1.ruas_code === 'BENGTABA') {
          bengtaba['settlement'].push(val2)
        } else if (val1.ruas_code === 'PEKBANG') {
          pekbang['settlement'].push(val2)
        } else if (val1.ruas_code === 'INPRA') {
          inpra['settlement'].push(val2)
        } else if (val1.ruas_code === 'INKIS') {
          inkis['settlement'].push(val2)
        }
        fs.push(val2)
      })
      val1.rp.forEach((val3) => {
        if (val1.ruas_code === 'JORR-S') {
          jorrs['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'ATP') {
          atp['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'TERPEKA') {
          terpeka['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'SIBANCEH') {
          sibanceh['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'PERMAI') {
          permai['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'PALINDRA') {
          palindra['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'BINSA') {
          binsa['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'BENGTABA') {
          bengtaba['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'PEKBANG') {
          pekbang['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'INPRA') {
          inpra['rekeningKoran'].push(val3)
        } else if (val1.ruas_code === 'INKIS') {
          inkis['rekeningKoran'].push(val3)
        }
        rp.push(val3)
      })
    })

    jorrs['settlement'] = jorrs['settlement'].reduce((a, b) => a + b, 0)
    atp['settlement'] = atp['settlement'].reduce((a, b) => a + b, 0)
    terpeka['settlement'] = terpeka['settlement'].reduce((a, b) => a + b, 0)
    sibanceh['settlement'] = sibanceh['settlement'].reduce((a, b) => a + b, 0)
    permai['settlement'] = permai['settlement'].reduce((a, b) => a + b, 0)
    palindra['settlement'] = palindra['settlement'].reduce((a, b) => a + b, 0)
    binsa['settlement'] = binsa['settlement'].reduce((a, b) => a + b, 0)
    bengtaba['settlement'] = bengtaba['settlement'].reduce((a, b) => a + b, 0)
    pekbang['settlement'] = pekbang['settlement'].reduce((a, b) => a + b, 0)
    inpra['settlement'] = inpra['settlement'].reduce((a, b) => a + b, 0)
    inkis['settlement'] = inkis['settlement'].reduce((a, b) => a + b, 0)



    jorrs['rekeningKoran'] = jorrs['rekeningKoran'].reduce((a, b) => a + b, 0)
    atp['rekeningKoran'] = atp['rekeningKoran'].reduce((a, b) => a + b, 0)
    terpeka['rekeningKoran'] = terpeka['rekeningKoran'].reduce((a, b) => a + b, 0)
    sibanceh['rekeningKoran'] = sibanceh['rekeningKoran'].reduce((a, b) => a + b, 0)
    permai['rekeningKoran'] = permai['rekeningKoran'].reduce((a, b) => a + b, 0)
    palindra['rekeningKoran'] = palindra['rekeningKoran'].reduce((a, b) => a + b, 0)
    binsa['rekeningKoran'] = binsa['rekeningKoran'].reduce((a, b) => a + b, 0)
    bengtaba['rekeningKoran'] = bengtaba['rekeningKoran'].reduce((a, b) => a + b, 0)
    pekbang['rekeningKoran'] = pekbang['rekeningKoran'].reduce((a, b) => a + b, 0)
    inpra['rekeningKoran'] = inpra['rekeningKoran'].reduce((a, b) => a + b, 0)
    inkis['rekeningKoran'] = inkis['rekeningKoran'].reduce((a, b) => a + b, 0)



    jorrs['rawpercentage'].push(jorrs['rekeningKoran'] / jorrs['settlement'] * 100)
    atp['rawpercentage'].push(atp['rekeningKoran'] / atp['settlement'] * 100)
    terpeka['rawpercentage'].push(terpeka['rekeningKoran'] / terpeka['settlement'] * 100)
    sibanceh['rawpercentage'].push(sibanceh['rekeningKoran'] / sibanceh['settlement'] * 100)
    permai['rawpercentage'].push(permai['rekeningKoran'] / permai['settlement'] * 100)
    palindra['rawpercentage'].push(palindra['rekeningKoran'] / palindra['settlement'] * 100)
    binsa['rawpercentage'].push(binsa['rekeningKoran'] / binsa['settlement'] * 100)
    bengtaba['rawpercentage'].push(bengtaba['rekeningKoran'] / bengtaba['settlement'] * 100)
    pekbang['rawpercentage'].push(pekbang['rekeningKoran'] / pekbang['settlement'] * 100)
    inpra['rawpercentage'].push(inpra['rekeningKoran'] / inpra['settlement'] * 100)
    inkis['rawpercentage'].push(inkis['rekeningKoran'] / inkis['settlement'] * 100)

    fs = fs.reduce((a, b) => a + b, 0)
    rp = rp.reduce((a, b) => a + b, 0)

    settlement = (rp / fs * 100)

    accidentCount.forEach((val, index) => {
      if (val.RUAS_CODE === 'JORR-S') {
        jorrs['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'ATP') {
        atp['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'TERPEKA') {
        terpeka['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'SIBANCEH') {
        sibanceh['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'PERMAI') {
        permai['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'PALINDRA') {
        palindra['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'BINSA') {
        binsa['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'BENGTABA') {
        bengtaba['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'PEKBANG') {
        pekbang['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'INPRA') {
        inpra['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      } else if (val.RUAS_CODE === 'INKIS') {
        inkis['safety'] = 100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8))
      }
      safety_level.push(100 - (val.T_KECELAKAAN * val.SECTION_LENGTH / Math.pow(10, 8)))
    })

    jorrs['rawpercentage'].push(jorrs['safety'])
    atp['rawpercentage'].push(atp['safety'])
    terpeka['rawpercentage'].push(terpeka['safety'])
    sibanceh['rawpercentage'].push(sibanceh['safety'])
    permai['rawpercentage'].push(permai['safety'])
    palindra['rawpercentage'].push(palindra['safety'])
    binsa['rawpercentage'].push(binsa['safety'])
    bengtaba['rawpercentage'].push(bengtaba['safety'])
    pekbang['rawpercentage'].push(pekbang['safety'])
    inpra['rawpercentage'].push(inpra['safety'])
    inkis['rawpercentage'].push(inkis['safety'])

    safety_level = safety_level.reduce((a, b) => a + b, 0) / safety_level.length
    safety_level = safety_level.toString()
    safety_level = safety_level.slice(0, 5) + ' %';

    var potholes_resume = {}
    potholes_resume['ontrack'] = []
    potholes_resume['total'] = []
    potholes.forEach((val, index) => {
      if (val.RUAS_CODE === 'JORR-S') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          jorrs['potholes'] = 100
        } else {
          jorrs['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'ATP') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          atp['potholes'] = 100
        } else {
          atp['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'TERPEKA') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          terpeka['potholes'] = 100
        } else {
          terpeka['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'SIBANCEH') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          sibanceh['potholes'] = 100
        } else {
          sibanceh['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'PERMAI') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          permai['potholes'] = 100
        } else {
          permai['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'PALINDRA') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          palindra['potholes'] = 100
        } else {
          palindra['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'BINSA') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          binsa['potholes'] = 100
        } else {
          binsa['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'BENGTABA') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          bengtaba['potholes'] = 100
        } else {
          bengtaba['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'PEKBANG') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          pekbang['potholes'] = 100
        } else {
          pekbang['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'INPRA') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          inpra['potholes'] = 100
        } else {
          inpra['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      } else if (val.RUAS_CODE === 'INKIS') {
        if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
          inkis['potholes'] = 100
        } else {
          inkis['potholes'] = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
      }
      potholes_resume['ontrack'].push(val.NOT_HANDLING)
      potholes_resume['total'].push(val.TOTAL_POTHOLES)
    })

    jorrs['rawpercentage'].push(jorrs['potholes'])
    atp['rawpercentage'].push(atp['potholes'])
    terpeka['rawpercentage'].push(terpeka['potholes'])
    sibanceh['rawpercentage'].push(sibanceh['potholes'])
    permai['rawpercentage'].push(permai['potholes'])
    palindra['rawpercentage'].push(palindra['potholes'])
    binsa['rawpercentage'].push(binsa['potholes'])
    bengtaba['rawpercentage'].push(bengtaba['potholes'])
    pekbang['rawpercentage'].push(pekbang['potholes'])
    inpra['rawpercentage'].push(inpra['potholes'])
    inkis['rawpercentage'].push(inkis['potholes'])

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
    if (palindra['rawpercentage'].length === 5) {
      sumPercentage = palindra['rawpercentage'].reduce((a, b) => a + b, 0)
      palindra['percentage'] = (sumPercentage / palindra['rawpercentage'].length)
    }
    if (terpeka['rawpercentage'].length === 5) {
      sumPercentage = terpeka['rawpercentage'].reduce((a, b) => a + b, 0)
      terpeka['percentage'] = (sumPercentage / terpeka['rawpercentage'].length).toFixed(2)
    }
    if (sibanceh['rawpercentage'].length === 5) {
      sumPercentage = sibanceh['rawpercentage'].reduce((a, b) => a + b, 0)
      sibanceh['percentage'] = (sumPercentage / sibanceh['rawpercentage'].length).toFixed(2)
    }
    if (permai['rawpercentage'].length === 5) {
      sumPercentage = permai['rawpercentage'].reduce((a, b) => a + b, 0)
      permai['percentage'] = (sumPercentage / permai['rawpercentage'].length).toFixed(2)
    }
    if (binsa['rawpercentage'].length === 5) {
      sumPercentage = binsa['rawpercentage'].reduce((a, b) => a + b, 0)
      binsa['percentage'] = (sumPercentage / binsa['rawpercentage'].length).toFixed(2)
    }
    if (bengtaba['rawpercentage'].length === 5) {
      sumPercentage = bengtaba['rawpercentage'].reduce((a, b) => a + b, 0)
      bengtaba['percentage'] = (sumPercentage / bengtaba['rawpercentage'].length).toFixed(2)
    }
    if (pekbang['rawpercentage'].length === 5) {
      sumPercentage = pekbang['rawpercentage'].reduce((a, b) => a + b, 0)
      pekbang['percentage'] = (sumPercentage / pekbang['rawpercentage'].length).toFixed(2)
    }
    if (inpra['rawpercentage'].length === 5) {
      sumPercentage = inpra['rawpercentage'].reduce((a, b) => a + b, 0)
      inpra['percentage'] = (sumPercentage / inpra['rawpercentage'].length).toFixed(2)
    }
    if (inkis['rawpercentage'].length === 5) {
      sumPercentage = inkis['rawpercentage'].reduce((a, b) => a + b, 0)
      inkis['percentage'] = (sumPercentage / inkis['rawpercentage'].length).toFixed(2)
    }

    let a = percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY.replace(' %', '');
    let b = percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY.replace(' %', '');
    divisionPercent = (parseFloat(a) + parseFloat(b) + settlement + parseFloat(safety_level) + pothole_percentage) / 5

    return (
      <div id="overview" className="animated fadeIn">
        <Row style={{ minHeight: '675px' }
        } >
          <Col lg="3" md="3" style={{ marginTop: '15%' }} >

            <OverviewTableRuasList
              ruas={'JORR-S'}
              value={jorrs['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '55%' }}
              width2={{ width: '45%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={'TERPEKA'}
              value={terpeka['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '60%' }}
              width2={{ width: '40%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={'BINSA'}
              value={binsa['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '60%' }}
              width2={{ width: '40%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={'BENGTABA'}
              value={bengtaba['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '60%' }}
              width2={{ width: '40%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={'PALINDRA'}
              value={palindra['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '55%' }}
              width2={{ width: '45%' }}
              toggle={this.toggle}
            />
            <OverviewTableRuasList
              ruas={'SIBANCEH'}
              value={sibanceh['percentage']}
              style={{ color: '#fffF' }}
              width1={{ width: '60%', letterSpacing: '2px' }}
              width2={{ width: '40%', letterSpacing: '2px' }}
              toggle={this.toggle}
            />
          </Col>

          <Col lg="6" md="6" >
            <Row>
              <Col>
                <img src='https://www.hutamakarya.com/storage/logo-site.png' width='125px' alt="hl-logo" />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '20px' }} id="overview-title">Sistem Kendali Operasi Tol</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <OverviewDivision
                  value={divisionPercent} />
              </Col>
            </Row>
          </Col>

          <Col lg="3" md="3" >
            <Row>
              <Col>
                <DropdownMenuCommandPanel />
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: '60%', fontSize: '16px' }}>
                <OverviewTableRuasList
                  ruas={'PERMAI'}
                  value={permai['percentage']}
                  style={{ color: '#fffF' }}
                  width1={{ width: '60%', letterSpacing: '2px' }}
                  width2={{ width: '40%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
                <OverviewTableRuasList
                  ruas={'ATP'}
                  value={atp['percentage']}
                  style={{ color: '#fffF' }}
                  width1={{ width: '40%', letterSpacing: '2px' }}
                  width2={{ width: '60%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
                <OverviewTableRuasList
                  ruas={'PEKBANG'}
                  value={pekbang['percentage']}
                  style={{ color: '#fffF' }}
                  width1={{ width: '40%', letterSpacing: '2px' }}
                  width2={{ width: '60%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
                <OverviewTableRuasList
                  ruas={'INPRA'}
                  value={inpra['percentage']}
                  style={{ color: '#fffF' }}
                  width1={{ width: '40%', letterSpacing: '2px' }}
                  width2={{ width: '60%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
                <OverviewTableRuasList
                  ruas={'INKIS'}
                  value={inkis['percentage']}
                  style={{ color: '#fffF' }}
                  width1={{ width: '40%', letterSpacing: '2px' }}
                  width2={{ width: '60%', letterSpacing: '2px' }}
                  toggle={this.toggle}
                />
              </Col>
            </Row>
          </Col>
        </ Row>
        <Row >
          <Col lg="1" md="1">
          </Col>
          <Col lg="2" md="2" style={{ marginLeft: '2%', marginTop: '5%' }}>
            <OverviewSpinner
              spinnerID={'spinner-one'}
              spinnerTitle={'Transaction'}
              value={percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY}
            />
          </Col>
          <Col lg="2" md="2" style={{ marginTop: '3%' }}>
            <OverviewSpinner
              spinnerID={'spinner-two'}
              spinnerTitle={'Traffic'}
              value={percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY}
            />
          </Col>
          <Col lg="2" md="2" >
            <OverviewSpinner
              spinnerID={'spinner-three'}
              spinnerTitle={'Settlement'}
              value={settlement.toFixed(2) + ' %'}
            />
          </Col>
          <Col lg="2" md="2" style={{ marginTop: '3%' }}>
            <OverviewSpinner
              spinnerID={'spinner-two'}
              spinnerTitle={'Safety Level'}
              value={safety_level}
            />
          </Col>
          <Col lg="2" md="2" style={{ marginTop: '5%' }}>
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