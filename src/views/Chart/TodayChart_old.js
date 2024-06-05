import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { ruasActions } from '../../store/action'
import Filtering from '../../components/Filter/Filtering'
import TableTransaction from '../../components/Table/TransactionTable'
import ModalSelectFilter from '../../components/Modals/ModalSelectFilter'

class TodayChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionId: '',
      gateId: '',
      tanggal: '',
      typeDate: '',
      modalFilter:true
    };
  }

  componentWillMount() {
    const { dispatch } = this.props
    // dispatch(chartAction.getTodayChartData());
    dispatch(ruasActions.getAllRuas());
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
    var cash_revenue = 0
    var cash_traffic = 0
    var non_cash_revenue = 0
    var non_cash_traffic = 0
    var total_revenue = 0
    var traffic = 0
    var title = 'Please select filter'
    var subtitle = ''

    if (chart) {
      timestamp = chart.timestamp
      cash_revenue = chart.cash_revenue
      cash_traffic = chart.cash_traffic
      non_cash_revenue = chart.non_cash_revenue
      non_cash_traffic = chart.non_cash_traffic
      total_revenue = chart.total_revenue
      traffic = chart.traffic
      title = chart.title
      subtitle = chart.subtitle
    }

    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
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
            <Filtering />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card >
              <CardBody>
                <Row>
                  <Col>
                    <h4>Grafik Transaksi dan Lalu lintas</h4>
                  </Col>
                </Row>
                <hr className="mt-0" />
                <Row>
                  <Col>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card >
              <CardBody>
                <TableTransaction />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <ModalSelectFilter modalfilter={this.state.modalFilter} />
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
export default connect(mapStateToProps)(TodayChart)