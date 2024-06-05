import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, ModalHeader, ModalBody, Card, CardBody } from 'reactstrap';
import { dashboardAction, settlementAction, rtmsActions } from '../../store/action'
import ChartTransaction from '../Chart/ChartTransaction';
import OverviewSpinner from '../Spinner/OverviewSpinner';
import OverviewTableDetail from '../Table/OverviewTableDetail';
import LineChartBank from '../Chart/LineChartBank';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import Rtms from '../Division/Rtms';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
var percentage_potholes = 0

class ModalOverview extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      color: 'primary',
      background_group: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this._isMounted = true;
    const { dispatch, activeRuas, percentage, dataPerRuas, potholes } = this.props

    if (this._isMounted) {
      if (nextProps.activeRuas !== activeRuas && nextProps.activeRuas !== '') {
        dispatch(dashboardAction.getComparisonTransactionMonthly(nextProps.activeRuas));
        dispatch(settlementAction.getSettlementKoran(nextProps.activeRuas));
        dispatch(dashboardAction.getPercentageTransactionTrafficByRealisasi(nextProps.activeRuas));
        dispatch(rtmsActions.getLiveData(nextProps.activeRuas));
      }
    }
    if (percentage !== nextProps.percentage) {
      if (nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY || nextProps.percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY) {
        if (nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY) {
          this.setState({
            yearlyTransPercent: nextProps.percentage.percentageDivisi.PROSENTASE_TRANSAKSI_YEARLY,
            yearlyTrafficPercent: nextProps.percentage.percentageDivisi.PROSENTASE_LALIN_YEARLY
          });
        }
      }
    }
    if (dataPerRuas !== nextProps.dataPerRuas) {
      var fs = 0
      var rp = 0
      dataPerRuas.forEach((val, index) => {
        if (val.ruas_code === this.props.activeRuas) {
          fs = val.fs.reduce((a, b) => a + b, 0)
          rp = val.rp.reduce((a, b) => a + b, 0)
          this.setState({
            settlementPercentage: (rp / fs * 100).toFixed(2) + ' %'
          });
        }
      })
    }
    if (activeRuas !== nextProps.activeRuas) {
      potholes.forEach((val, index) => {
        if (nextProps.activeRuas === val.RUAS_CODE) {
          if (isNaN(val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)) {
            let a = 100
            percentage_potholes = a.toFixed(2) + ' %'
          } else {
            percentage_potholes = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
            percentage_potholes = percentage_potholes.toFixed(2) + ' %'
          }
        }
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { lalinComparison, transactionComparison, bankPercentage, rtms } = this.props
    var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    var mandiriPercentage = 0
    var bcaPercentage = 0
    var briPercentage = 0
    var bniPercentage = 0
    if (bankPercentage) {
      mandiriPercentage = bankPercentage.mandiri
      bcaPercentage = bankPercentage.bca
      briPercentage = bankPercentage.bri
      bniPercentage = bankPercentage.bni
    }
    return (
      <div>
        <Modal isOpen={this.props.modalOpen} toggle={this.props.toggle} className="modal-xl" centered>
          <ModalHeader toggle={this.props.toggle} style={{ color: '#fff' }}>{this.props.activeRuas} Detail Achievement</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg="6">
                <Row>
                  <Col >
                    <ChartTransaction
                      data_set={transactionComparison}
                      chart_type={'column'}
                      x_category={categories}
                      title={'Transaksi Realisasi vs Rencana'}
                      subtitle={'Data Komparasi Realisasi Terhadap Rencana Ruas ' + this.props.activeRuas}
                      x_title={'Month'}
                      y_title={'Revenue'}
                      style_group={'rgba(0,0,0,0.0)'}
                      height={'300'}
                      align={'center'}
                      isCommandCenter={this.props.isCommandCenter}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>&nbsp;</Col>
                </Row>
                <Row>
                  <Col>
                    <ChartTransaction
                      data_set={lalinComparison}
                      chart_type={'line'}
                      x_category={categories}
                      title={'Lalin Realisasi vs Rencana'}
                      subtitle={'Data Komparasi Realisasi Terhadap Rencana Ruas ' + this.props.activeRuas}
                      x_title={'Month'}
                      y_title={'Revenue'}
                      style_group={'rgba(0,0,0,0.0)'}
                      height={'300'}
                      align={'center'}
                      isCommandCenter={this.props.isCommandCenter}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg="6">
                <Row>
                  <Col lg="7">
                    <Card style={{ background: 'rgba(0,0,0,0.0)' }}>
                      <CardBody>
                        <OverviewTableDetail
                          ruas={this.props.activeRuas}
                          percentage_lalin={this.state.yearlyTrafficPercent}
                          percentage_trans={this.state.yearlyTransPercent}
                          percentage_settlement={this.state.settlementPercentage}
                          percentage_potholes={percentage_potholes}
                        />
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="1">
                  </Col>
                  <Col lg="4" style={{ textAlign: 'right' }}>
                    <OverviewSpinner
                      spinnerID={'spinner-two'}
                      spinnerTitle={'Achievement ' + this.props.activeRuas}
                      value={parseFloat(this.props.valueRuas).toFixed(2) + ' %'}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <Card style={{ background: 'rgba(0,0,0,0.0)', color: '#fff' }}>
                      <CardBody>
                        <div className="text-center">Bank Settlement Ruas {this.props.activeRuas}</div>
                        <Row>
                          <Col lg="3">
                            <LineChartBank
                              percentage={mandiriPercentage}
                              color={brandPrimary}
                              bank={'MANDIRI'}
                            />
                          </Col>
                          <Col lg="3">
                            <LineChartBank
                              percentage={bcaPercentage}
                              color={brandDanger}
                              bank={'BCA'}
                            />
                          </Col>
                          <Col lg="3">
                            <LineChartBank
                              percentage={briPercentage}
                              color={brandWarning}
                              bank={'BRI'}
                            />
                          </Col>
                          <Col lg="3">
                            <LineChartBank
                              percentage={bniPercentage}
                              color={brandSuccess}
                              bank={'BNI'}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Rtms
                      data={rtms}
                      branch = {this.props.activeRuas}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lalinComparison: state.comparisonTransaction.comparison.lalin,
    transactionComparison: state.comparisonTransaction.comparison.transaction,
    bankPercentage: state.monthlySettlement.bankPercentage,
    percentage: state.dashboard.percentage,
    dataPerRuas: state.monthlySettlement.dataPerRuas,
    potholes: state.potholes.potholes,
    rtms: state.rtms.rtms,
  }
}
export default connect(mapStateToProps)(ModalOverview)