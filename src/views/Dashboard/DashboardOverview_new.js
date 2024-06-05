import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settlementAction } from '../../store/action'
import {
  Col,
  Row,
} from 'reactstrap';
import OverviewDivision from '../../components/Dashboard/OverviewDivision';
import '../../components/css/dashboard-overview.scss'
import '../../components/css/dashboard-spinner.css'
import DropdownMenuCommandPanel from '../../components/Button/DropdownMenuCommandPanel';
import OverviewTable from '../../components/Table/OverviewTable';
import OverviewSpinner from '../../components/Spinner/OverviewSpinner';
import RekeningKoran from '../../components/Dashboard/RekeningKoran';
import TransactionMonthly from '../../components/Dashboard/TransactionMonthly';
import { dashboardAction } from '../../store/action'
import TransactionDaily from '../../components/Dashboard/TransactionDaily';


class DashboardTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      radioSelected: 2,
      background_group: true
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))

    const { dispatch } = this.props

    if (identity.branch_code === 'PUSAT') {
      dispatch(settlementAction.getBagiHasil(identity.branch_code));
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficMonthlyByRealisasi(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficDailyByRealisasi(identity.branch_code));
    }
  }

  render() {
    return (
      <div id="overview" className="animated fadeIn">
        <Row style={{ minHeight: '675px' }} >
          <Col lg="4" md="4" style={{ marginTop: '17.5%' }}>
            <Row>
              <Col lg="4" md="4" style={{ marginTop: '30%' }}>
                <OverviewSpinner />
              </Col>
              <Col lg="8" md="8">
                <OverviewTable />
              </Col>
            </Row>
            <Row>
              <Col lg="12" md="12" style={{ marginTop: '5%', zIndex: '1000' }}>
                <TransactionDaily
                  style_group={this.state.background_group}
                />
              </Col>
            </Row>
          </Col>
          <Col lg="4" md="4">
            <Row>
              <Col>
                <img src={'../../assets/img/logo-site.png'} width='125px' />
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 style={{ color: '#fff' }} id="overview-title">Sistem Kendali Operasi Tol</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <OverviewDivision />
              </Col>
            </Row>
            <Row>
              <Col lg="12" md="12" style={{ marginTop: '110%', fontSize: '20px', color: '#fff', letterSpacing: '5px' }}>
                <marquee>
                  PT. Hutama Karya (Persero) Divisi Operasi & Pemeliharaan Jalan Tol
                </marquee>
              </Col>
            </Row>
          </Col>
          <Col lg="4" md="4">
            <Row>
              <Col>
                <DropdownMenuCommandPanel />
              </Col>
            </Row>
            <Row style={{ marginRight: '7.5%', marginTop: '46.5%' }}>
              <Col lg="2" md="2">
              </Col>
              <Col lg="2" md="2">
                <OverviewSpinner />
              </Col>
              <Col lg="4" md="4">
              </Col>
              <Col lg="2" md="2">
                <OverviewSpinner />
              </Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
              <Col lg="2" md="2">
              </Col>
              <Col lg="10" md="10">
                <RekeningKoran />
              </Col>
            </Row>
            <Row  >
              <Col lg="2" md="2">
              </Col>
              <Col lg="10" md="10">
                <TransactionMonthly
                  style_group={this.state.background_group}
                />
              </Col>
            </Row>
          </Col>
        </ Row>
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