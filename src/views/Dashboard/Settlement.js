import React, { Component } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import Widget01 from '../Widgets/Widget01';

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandDanger = getStyle('--danger')

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20', 'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const doughnut = {
  labels: [
    'ATP',
    'JORR - S',
    'LAMPUNG',
    'MEDAN',
    'PALEMBANG',
  ],
  datasets: [
    {
      data: [300, 50, 100,23,40],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4E3E2E',
        '#87F902',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4E3E2E',
        '#87F902',
      ],
    }],
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="9">
            <Row>
              <Col xs="12" sm="6" lg="4">
                <Widget01 color="info" income="Rp. 12.502.032,000" traffic="3.004" />
              </Col>
              <Col xs="12" sm="6" lg="4">
                <Widget01 color="danger" income="Rp. 120.502.032,00" traffic="90.004" />
              </Col>
              <Col xs="12" sm="6" lg="4">
                <Widget01 color="warning" income="Rp. 1.204.502.032,00" traffic="286.004" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="text-white" style={{backgroundColor: 'rgba(21, 49, 53, 0.2)'}}>
                  <CardBody>
                    <Row>
                      <Col sm="5">
                        <CardTitle className="mb-0">Traffic Route</CardTitle>
                      </Col>
                      <Col sm="7" className="d-none d-sm-inline-block">
                        <div className="float-right">
                          <span className="small text-muted">
                            1 - 7 February 2019
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                      <Line data={mainChart} options={mainChartOpts} height={300} />
                    </div>
                  </CardBody>
                  <CardFooter className="text-white" style={{backgroundColor: 'rgba(21, 49, 53, 0.2)'}}>
                    <Row className="text-center">
                      <Col sm={12} md className="mb-sm-2 mb-0">
                        <div className="text-muted">ATP</div>
                        <strong>29.703 Users (40%)</strong>
                        <Progress className="progress-xs mt-2" color="success" value="40" />
                      </Col>
                      <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                        <div className="text-muted">JORR - S</div>
                        <strong>24.093 Users (20%)</strong>
                        <Progress className="progress-xs mt-2" color="info" value="20" />
                      </Col>
                      <Col sm={12} md className="mb-sm-2 mb-0">
                        <div className="text-muted">LAMPUNG</div>
                        <strong>78.706 Views (60%)</strong>
                        <Progress className="progress-xs mt-2" color="warning" value="60" />
                      </Col>
                      <Col sm={12} md className="mb-sm-2 mb-0">
                        <div className="text-muted">MEDAN BINJAI</div>
                        <strong>22.123 Users (80%)</strong>
                        <Progress className="progress-xs mt-2" color="danger" value="80" />
                      </Col>
                      <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                        <div className="text-muted">PALEMBANG</div>
                        <strong>Average Rate (40.15%)</strong>
                        <Progress className="progress-xs mt-2" color="primary" value="40" />
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white" style={{backgroundColor: 'rgba(21, 49, 53, 0.2)'}}>
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle className="mb-0">
                      <div className="float-left">
                        <span>Traffic & Income&nbsp;</span>
                      </div>
                      <div className="float-right">
                        <span className="small text-muted ">
                          February 2019
                        </span>
                      </div>
                    </CardTitle>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6" sm="6" >
                    <div className="callout callout-info">
                      <small className="text-muted">Traffic</small>
                      <br />
                    </div>
                  </Col>
                  <Col xs="6" sm="6">
                    <div className="callout callout-danger">
                      <small className="text-muted">Income</small>
                      <br />
                    </div>
                  </Col>
                </Row>
                <hr className="mt-0" />
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <div className="progress-group-text">
                      <div className="float-left">
                        <strong>ATP</strong>
                      </div>
                      <br></br>
                      <div className="float-left">
                        <small className="text-muted">Rp. 102.312.231</small>
                      </div>
                    </div>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="34" />
                    <Progress className="progress-xs" color="danger" value="54" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <div className="progress-group-text">
                      <div className="float-left">
                        <strong>JORR - S</strong>
                      </div>
                      <div className="float-left">
                        <small className="text-muted">Rp. 102.312.231</small>
                      </div>
                    </div>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="56" />
                    <Progress className="progress-xs" color="danger" value="44" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <div className="progress-group-text">
                      <div className="float-left">
                        <strong>LAMPUNG</strong>
                      </div>
                      <div className="float-left">
                        <small className="text-muted">Rp. 102.312.231</small>
                      </div>
                    </div>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="12" />
                    <Progress className="progress-xs" color="danger" value="30" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <div className="progress-group-text">
                      <div className="float-left">
                        <strong>MEDAN BINJAI</strong>
                      </div>
                      <div className="float-left">
                        <small className="text-muted">Rp. 102.312.231</small>
                      </div>
                    </div>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="43" />
                    <Progress className="progress-xs" color="danger" value="65" />
                  </div>
                </div>
                <div className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <div className="progress-group-text">
                      <div className="float-left">
                        <strong>PALEMBANG</strong>
                      </div>
                      <div className="float-left">
                        <small className="text-muted">Rp. 102.312.231</small>
                      </div>
                    </div>
                  </div>
                  <div className="progress-group-bars">
                    <Progress className="progress-xs" color="info" value="43" />
                    <Progress className="progress-xs" color="danger" value="74" />
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="text-white" style={{backgroundColor: 'rgba(21, 49, 53, 0.2)'}}>
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle className="mb-0">
                      Comparison&nbsp;
                      <span className="small text-muted">
                        November 2015
                      </span>
                    </CardTitle>
                  </Col>
                </Row>
                <hr className="mt-0" />
                <div className="chart-wrapper">
                  <Doughnut data={doughnut} width={300} height={210} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
