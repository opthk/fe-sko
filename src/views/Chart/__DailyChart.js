import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Form,
} from 'reactstrap';
import { chartActions } from '../../store/action'
import { ruasActions } from '../../store/action'
import { gerbangActions } from '../../store/action'



class DailyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionId: '',
      gateId: '',
      tanggal: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props
    // dispatch(chartAction.getTodayChartData());
    dispatch(ruasActions.getAllRuas());
  }

  handleChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(function (previousState, currentProps) {
      if (newState.sectionId) {
        const { dispatch } = this.props
        dispatch(gerbangActions.getGerbangByRuas(newState.sectionId));
        return {
          sectionId: newState.sectionId
        };
      }
      if (newState.gateId) {
        return {
          gateId: newState.gateId
        };
      }
      if (newState.tanggal) {
        return {
          tanggal: newState.tanggal
        };
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    const filter = {
      tanggal: this.state.tanggal,
      id_ruas: this.state.sectionId,
      id_gerbang: this.state.gateId
    }
    dispatch(chartActions.getTodayChartData(filter));
  }

  render() {
    const { ruas, gerbang, chart } = this.props
    var allRuasList
    var gerbangList

    if (ruas) {
      allRuasList = ruas.map((val, index) => {
        return (
          <option value={val.ID_RUAS} key={index}>
            {val.RUAS_CODE}
          </option>
        )
      })
    }

    if (gerbang) {
      gerbangList = gerbang.map((val, index) => {
        return (
          <option value={val.GERBANG_NAME} key={index}>
            {val.GERBANG_NAME}
          </option>
        )
      })
    }

    var timestamp = 0
    var hour = 0
    var cash_revenue = 0
    var cash_traffic = 0
    var non_cash_revenue = 0
    var non_cash_traffic = 0
    var total_revenue = 0
    var traffic = 0

    if (chart) {
      timestamp = chart.timestamp
      hour = chart.hour
      cash_revenue = chart.cash_revenue
      cash_traffic = chart.cash_traffic
      non_cash_revenue = chart.non_cash_revenue
      non_cash_traffic = chart.non_cash_traffic
      total_revenue = chart.total_revenue
      traffic = chart.traffic
    }


    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Today Transaction and Traffic'
      },
      xAxis: {
        categories: timestamp,
        crosshair: true,
      },
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value:,.0f}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        title: {
          text: 'Traffic',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        floor: 0
      }, { // Secondary yAxis
        title: {
          text: 'Transaction',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          format: '{value:,.0f}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        floor: 0,
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      series: [
        {
          name: 'Pdpt. Non-Tunai',
          yAxis: 1,
          type: 'column',
          data: non_cash_revenue, // FILL THIS
          tooltip: {}
        },
        {
          name: 'Pdpt. Tunai',
          yAxis: 1,
          type: 'column',
          data: cash_revenue, // FILL THIS
          tooltip: {}
        },
        {
          name: 'Lalin Non Tunai',
          yAxis: 0,
          type: 'spline',
          data: non_cash_traffic,
          tooltip: {}
        },
        {
          name: 'Lalin Tunai',
          yAxis: 0,
          type: 'spline',
          data: cash_traffic,
          tooltip: {}
        },
        {
          name: 'Pdpt. Total',
          yAxis: 1,
          type: 'line',
          data: total_revenue, // FILL THIS
          lineWidth: 0,
          tooltip: {}
        },
        {
          name: 'Lalin. Total',
          yAxis: 0,
          type: 'line',
          data: traffic, // FILL THIS
          lineWidth: 0,
          tooltip: {}
        }
      ]
    };

    return (
      <Col>
        <Row>
          <Col>
            <Card style={{ marginBottom: 0.5 + 'rem' }}>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col xs="12" lg="3">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="selectSm">Date</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="date" name="tanggal" id="date" bsSize="sm" onChange={this.handleChange} required />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="selectSm">Branch</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="select" name="sectionId" id="section" bsSize="sm" onChange={this.handleChange} required>
                            <option value="">Please select section</option>
                            {allRuasList}
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col xs="12" lg="3">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="selectSm">Gate</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="select" name="gateId" id="gate" bsSize="sm" onChange={this.handleChange}>
                            <option value="0">Please select gate</option>
                            {gerbangList}
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col xs="3" lg="3">
                      <FormGroup row>
                        <Col xs="12" md="12">
                          <Button color="primary" size="sm">Search</Button>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card >
              <CardBody>
                <HighchartsReact highcharts={Highcharts} options={options} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myAccess: state.user.myAccess,
    ruas: state.ruas.ruas,
    gerbang: state.gerbang.gerbang,
    chart: state.chart,
  }
}
export default connect(mapStateToProps)(DailyChart)