import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { settlementAction } from '../../store/action'

import {
  Card,
  CardBody,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'

import BNIPercentage from '../../components/Dashboard/BNIPercentage';
import MandiriPercentage from '../../components/Dashboard/MandiriPercentage';
import BCAPercentage from '../../components/Dashboard/BCAPercentage';
import BRIPercentage from '../../components/Dashboard/BRIPercentage';
import SettlementDaily from '../../components/Dashboard/SettlementDaily';
import SettlementRuas from '../../components/Dashboard/SettlementRuas';

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class DashboardSettlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dataRuas: [],
      ruasValue: []
    };
  }

  componentDidMount() {
    const { myIdentity, dispatch } = this.props
    var self = this
    if (myIdentity.branch_code === 'PUSAT') {
      dispatch(settlementAction.getSettlementMonthly(myIdentity.branch_code));
      setInterval(function () {
        dispatch(settlementAction.getSettlementMonthly(myIdentity.branch_code));
      }, 300 * 1000); // 60 * 1000 milsec
      setInterval(function () {
        self.resetDataSet()
        self.fillData()
      }, 20 * 1000); // 60 * 1000 milsec
    }
  }

  resetDataSet = (e) => {
    this.setState({
      dataRuas: [],
      ruasValue: []
    });
  }

  fillData = (e) => {
    const { dataRuas, ruasValue } = this.props
    this.setState({
      dataRuas: dataRuas,
      ruasValue: ruasValue
    });
  }

  componentWillReceiveProps(nextProps) {
    var self = this
    this.resetDataSet()
    setTimeout(function () {
      self.setState({
        dataRuas: nextProps.dataRuas,
        ruasValue: nextProps.ruasValue
      });
    }, 1);
  }

  render() {

    const { bank, dataRuas, ruasValue } = this.props

    var mandiriPercentage = 0
    var bcaPercentage = 0
    var briPercentage = 0
    var bniPercentage = 0
    var settlementPerRuas
    var ruasSettelentValue

    if (bank) {
      mandiriPercentage = bank.mandiri.percentage
      bcaPercentage = bank.bca.percentage
      briPercentage = bank.bri.percentage
      bniPercentage = bank.bni.percentage
    }

    if (this.state.dataRuas) {
      settlementPerRuas = this.state.dataRuas.map((val, index) => {
        return (
          <Col lg="6" key={index}>
            <div className="progress-group">
              <div className="progress-group-header">
                <span className="title">{val.ruas + ' ( ' + val.code + ' )'}</span>
                <span className="ml-auto font-weight-bold">{val.achievement + ' %'}</span>
              </div>
            </div>
            <hr className="mt-0" />
            <Row>
              <Col>
                <div className="progress-group mb-12">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      Mandiri
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value={val.mandiri} />
                  </div>
                  <span className="ml-auto font-weight-bold">&nbsp;
                    <span className="text-muted small">{val.mandiri + ' %'}
                    </span>
                  </span>
                </div>
                <div className="progress-group mb-12">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      BCA
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="danger" value={val.bca} />
                  </div>
                  <span className="ml-auto font-weight-bold">&nbsp;
                    <span className="text-muted small">{val.bca + ' %'}
                    </span>
                  </span>
                </div>
                <div className="progress-group mb-12">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      BRI
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="warning" value={val.bri} />
                  </div>
                  <span className="ml-auto font-weight-bold">&nbsp;
                    <span className="text-muted small">{val.bri + ' %'}
                    </span>
                  </span>
                </div>
                <div className="progress-group mb-12">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      BNI
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="success" value={val.bni} />
                  </div>
                  <span className="ml-auto font-weight-bold">&nbsp;
                    <span className="text-muted small">{val.bni + ' %'}
                    </span>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        )
      })
    }

    if (this.state.ruasValue) {
      ruasSettelentValue = this.state.ruasValue.map((val, index) => {
        return (
          <Col lg="6" key={index}>
            <SettlementRuas graphicData={val} />
          </Col>
        )
      })
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="8">
            <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', border: 'none' }}>
              <CardBody className="text-white">
                <Row>
                  <Col xs="12" md="12" lg="12">
                    <strong>Response File Settlement Overview</strong>
                    <Row>
                      <Col sm="3">
                        <div className="callout callout-info">
                          <small className="text-muted">Mandiri</small>
                          <br />
                          <strong className="h4">{mandiriPercentage.toFixed(2) + ' %'}</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(0, brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="callout callout-danger">
                          <small className="text-muted">BCA</small>
                          <br />
                          <strong className="h4">{bcaPercentage.toFixed(2) + ' %'}</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(1, brandDanger)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="callout callout-warning">
                          <small className="text-muted">BRI</small>
                          <br />
                          <strong className="h4">{briPercentage.toFixed(2) + ' %'}</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(2, brandWarning)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                      <Col sm="3">
                        <div className="callout callout-success">
                          <small className="text-muted">BNI</small>
                          <br />
                          <strong className="h4">{bniPercentage.toFixed(2) + ' %'}</strong>
                          <div className="chart-wrapper">
                            <Line data={makeSparkLineData(3, brandSuccess)} options={sparklineChartOpts} width={100} height={30} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row>
              <Col lg="12">
                <SettlementDaily />
              </Col>
            </Row>
            <br></br>
          </Col>
          <Col lg="4">
            <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', border: 'none', minHeight: '300px' }}>
              <CardBody className="text-white">
                <Row>
                  <Col lg="6">
                    <MandiriPercentage />
                  </Col>
                  <Col lg="6">
                    <BNIPercentage />
                  </Col>
                  <Col lg="6">
                    <BCAPercentage />
                  </Col>
                  <Col lg="6">
                    <BRIPercentage />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {ruasSettelentValue}
          </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    myAccess: state.user.myAccess,
    bank: state.monthlySettlement.settlementByBankMonthly,
    dataRuas: state.monthlySettlement.settlementByRuasMonthly,
    ruasValue: state.monthlySettlement.settlementByRuasValue,
  }
}
export default connect(mapStateToProps)(DashboardSettlement)