import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardAction } from '../../store/action'
import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import TransactionDaily from '../../components/Dashboard/TransactionDaily';
import TrafficDaily from '../../components/Dashboard/TrafficDaily';
import TransactionMonthly from '../../components/Dashboard/TransactionMonthly';
import TrafficMonthly from '../../components/Dashboard/TrafficMonthly';
import TransactionPercentage from '../../components/Dashboard/TransactionPercentage';
import DropdownMenuCommandPanel from '../../components/Button/DropdownMenuCommandPanel';
import DropdownMenuSwitchData from '../../components/Button/DropdownMenuSwitchData';

var timeout

class DashboardTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dropdownOpen: false,
      radioSelected: 2,
      background_group: true,
      defaultRenderValue: false,
      chartHeight: 250,
      isOverviewCabang: false
    };
    this.switchData = this.switchData.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    let identity = JSON.parse(localStorage.getItem('identity'))

    if (!this.state.defaultRenderValue) {
      this.setState({
        defaultRenderValue: 0
      });
      this.doRender(0)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.defaultRenderValue !== nextState.defaultRenderValue) {
      clearInterval(timeout)
      console.log(nextState.defaultRenderValue)
      this.doRender(nextState.defaultRenderValue)
    }
  }

  doRender(val) {
    const { dispatch } = this.props
    var identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.ID_GROUP === 5) {
      this.setState({
        style: { backgroundColor: 'rgb(0,0,0,0)', border: 'none', color: '#fff', fontSize: '18px' },
        isCommandCenter: true
      });
    } else {
      this.setState({
        style: { fontSize: '18px' },
        isCommandCenter: false
      });
    }
    if (val === 0) {
      dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficDailyByRealisasi(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficMonthlyByRealisasi(identity.branch_code));
      timeout = setInterval(function () {
        dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(identity.branch_code));
        dispatch(dashboardAction.getPercentageTransactionTrafficDailyByRealisasi(identity.branch_code));
        dispatch(dashboardAction.getPercentageTransactionTrafficMonthlyByRealisasi(identity.branch_code));
      }, 12000 * 1000);
    } else {
      dispatch(dashboardAction.getPercentageTransactionTrafficByEoj(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficDailyByEoj(identity.branch_code));
      dispatch(dashboardAction.getPercentageTransactionTrafficMonthlyByEoj(identity.branch_code));
      timeout = setInterval(function () {
        dispatch(dashboardAction.getPercentageTransactionTrafficByEoj(identity.branch_code));
        dispatch(dashboardAction.getPercentageTransactionTrafficDailyByEoj(identity.branch_code));
        dispatch(dashboardAction.getPercentageTransactionTrafficMonthlyByEoj(identity.branch_code));
      }, 1500 * 1000);
    }
  }

  switchData(val) {
    this.setState({
      defaultRenderValue: val
    });
  }

  render() {
    let ket
    if (this.state.defaultRenderValue === 0) {
      ket = ''
    } else {
      ket = 'Data by End Of Journal'
    }
    return (
      <div className="animated fadeIn">
        <Card style={this.state.style}>
          <CardHeader style={this.state.style}>
            <i className="fa fa-exchange"></i> <b>Transaction Overview -</b> <small>{ket}</small>
            <DropdownMenuCommandPanel />
            <DropdownMenuSwitchData
              switch_data={this.switchData}
            />
          </CardHeader>
          <CardBody>
            <Col lg="12" style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.1))', // Gradasi dari gelap ke terang

              paddingRight: '30px',
              paddingLeft: '30px',
              paddingBottom: '20px',
              backdropFilter: 'blur(30px)', // Efek blur
              color: 'white', // Warna teks putih
              borderRadius: '8px', // Border radius
              border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparan
            }}>
              <TransactionPercentage />
              <Row >
                <Col style={{
                  color: 'white', // Warna teks putih
                  padding: '20px',
                  borderRadius: '30px', // Border radius
                  border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
                }}>
                  <TransactionDaily
                    style_group={this.state.background_group}
                    disable_title={this.props.disable_title}
                    chart_height={this.state.chartHeight}
                    isOverviewCabang={this.state.isOverviewCabang}
                    isCommandCenter={this.state.isCommandCenter}
                  />
                  <div style={{ height: '50px' }}></div>
                  <TransactionMonthly
                    style_group={this.state.background_group}
                    disable_title={true}
                    chart_height={this.state.chartHeight}
                    isOverviewCabang={this.state.isOverviewCabang}
                    isCommandCenter={this.state.isCommandCenter}
                  />
                </Col>
                <div style={{ width: '20px' }}></div>
                <Col style={{
                  color: 'white', // Warna teks putih
                  padding: '20px',
                  borderRadius: '30px', // Border radius
                  border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparan
                }}>
                  <TrafficDaily
                    style_group={this.state.background_group}
                    disable_title={true}
                    chart_height={this.state.chartHeight}
                    isOverviewCabang={this.state.isOverviewCabang}
                    isCommandCenter={this.state.isCommandCenter}
                  />
                  <div style={{ height: '50px' }}></div>
                  <TrafficMonthly
                    style_group={this.state.background_group}
                    disable_title={true}
                    chart_height={this.state.chartHeight}
                    isOverviewCabang={this.state.isOverviewCabang}
                    isCommandCenter={this.state.isCommandCenter}
                  />
                </Col>
              </Row>
            </Col>
            <div style={{ height: '20px' }} />

          </CardBody>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
  }
}
export default connect(mapStateToProps)(DashboardTransaction) 