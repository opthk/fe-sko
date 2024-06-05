import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { dashboardAction } from '../../store/action'

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';
// import Widget04 from '../Widgets/Widget04';
import Widget03 from '../Widgets/Widget03';
import Widget02 from '../Widgets/Widget02';
import TransactionDaily from '../../components/Dashboard/TransactionDaily';

const makeSocialBoxData = (dataSetNo) => {
  const socialBoxData = [
    { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
    { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
    { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
    { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
  ];

  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
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
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// function date(today) {
//   var dd = today.getDate();
//   var mm = today.getMonth() + 1; //January is 0!
//   var yyyy = today.getFullYear();

//   if (dd < 10) {
//     dd = '0' + dd;
//   }
//   if (mm < 10) {
//     mm = '0' + mm;
//   }
//   return today = dd + '/' + mm + '/' + yyyy;
// }

// const today = date(new Date())

class DashboardTransaction extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.state = {
      id_branch: '',
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

  componentDidMount() {
    const { myIdentity, dispatch } = this.props
    if (myIdentity.branch_code === 'PUSAT') {
      dispatch(dashboardAction.getDashboardTrafficIncomeGlobal(myIdentity.branch_code));
    }
  }

  render() {
    // var NumberFormat = require('react-number-format');
    const { overviewPeriode } = this.props
    var monthlyTransPercent = ''
    var monthlyTrafficPercent = ''
    var yearlyTransPercent = ''
    var yearlyTrafficPercent = ''
    var ruasList
    if (overviewPeriode) {
      monthlyTransPercent = overviewPeriode.monthAvgTrans
      monthlyTrafficPercent = overviewPeriode.monthAvgTraf
      yearlyTransPercent = overviewPeriode.yearAvgTrans
      yearlyTrafficPercent = overviewPeriode.yearAvgTraf

      ruasList = overviewPeriode.overViewPerRuas.map((val, index) => {
        // var color1 = 'default'
        // var color2 = 'default'
        // if (val.month[0].persen > 85 && val.month[0].persenLalin > 85) {
        //   color1 = 'success'
        //   color2 = 'success'
        // }
        // else if (val.month[0].persen > 70 && val.month[0].persenLalin < 70) {
        //   color1 = 'danger'
        //   color2 = 'danger'
        // }
        // else {
        //   color1 = 'danger'
        //   color2 = 'danger'
        // }

        return (
          <Col lg="6" key={index}>
            <div className="progress-group mb-4">
              <div className="progress-group-prepend">
                <div className="progress-group-text">
                  <div className="float-left">
                    <strong>{val.ruasCode}</strong>
                  </div>
                  <br></br>
                  <div className="float-left">
                    <small className="text-muted">
                      {/* <NumberFormat value={val.month[0].Total_Rupiah} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> */}
                      <i className="fa fa-trophy"></i> Achivement {val.month[0].persen + ' %'}
                    </small>
                  </div>
                </div>
              </div>
              <div className="progress-group-bars">
                <Progress className="progress-xs" color="primary" value={val.month[0].persen} />
                <Progress className="progress-xs" color="success" value={val.month[0].persenLalin} />
              </div>
              {/* <span className="ml-auto font-weight-bold">&nbsp;
                <span className="text-muted small">{val.month[0].persen + ' %'}
                </span>
              </span>
              <span className="ml-auto font-weight-bold">&nbsp;
                <span className="text-muted small">{val.month[0].persenLalin + ' %'}
                </span>
              </span> */}
            </div>
          </Col>
        );
      })
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="9">
            <Row>
              <Col>
                <TransactionDaily />
              </Col>
            </Row>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget03 dataBox={() => ({ variant: 'money', Monthly: +monthlyTransPercent, Yearly: +yearlyTransPercent, type: 'Transaction Overview' })} >
              <div className="chart-wrapper">
                <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
              </div>
            </Widget03>
            <Widget02 header={monthlyTrafficPercent + ' %'} mainText="Monthly Traffic" icon="fa fa-calendar" color="info" variant="1" />
            <Widget02 header={yearlyTrafficPercent + ' %'} mainText="Yearly Traffic" icon="fa fa-calendar-o" color="info" variant="1" />
          </Col>
          <Col>
            <Card >
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle className="mb-0">
                      <Row>
                        <Col lg="8">
                          <span><strong>Branch Report</strong>&nbsp;</span>
                        </Col>
                        <Col lg="4">
                          <Row>
                            <Col>
                              <div className="callout callout-info">
                                <small className="text-muted">Traffic</small>
                              </div>
                            </Col>
                            <Col>
                              <div className="callout callout-success">
                                <small className="text-muted">Income</small>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardTitle>
                  </Col>
                </Row>
                <hr className="mt-0" />
                <Row>
                  {ruasList}
                </Row>
              </CardBody>
            </Card>
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
    overviewPeriode: state.dashboard.overviewPeriode,
  }
}
export default connect(mapStateToProps)(DashboardTransaction)