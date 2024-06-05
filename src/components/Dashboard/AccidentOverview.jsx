import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import Highcharts from 'highcharts'

import HC_more from "highcharts/highcharts-more"; //module
import HC_3D from "highcharts/highcharts-3d"; //module
import HC_FUNNEL from "highcharts/modules/funnel"; //module

import ChartTransaction from '../Chart/ChartTransaction';

HC_more(Highcharts); //init module
HC_3D(Highcharts); //init module
HC_FUNNEL(Highcharts); //init module


class AccidentOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      daily: '',
      redraw: false
    };
  }

  componentWillMount() {
    if (this.props.isCommandCenter) {
      this.setState({
        style: { backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color: '#fff' }
      });
    }
  }

  componentDidMount() {
    if (this.props.style_group) {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.0)'
      });
    } else {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.6)'
      });
    }
  }

  render() {
    const { accidentCount } = this.props
    let dataSet = []
    dataSet['lightInjury'] = []
    dataSet['heavyInjury'] = []
    dataSet['fatality'] = []
    accidentCount.forEach((val, index) => {
      dataSet['lightInjury'].push(val.LIGHT_INJURY)
      dataSet['heavyInjury'].push(val.HEAVY_INJURY)
      dataSet['fatality'].push(val.FATALITY)
    })

    dataSet = [{
      name: 'Unique users',
      data: [
        ['Light (' + dataSet['lightInjury'].reduce((a, b) => a + b, 0) + ')', dataSet['lightInjury'].reduce((a, b) => a + b, 0)],
        ['Heavy (' + dataSet['heavyInjury'].reduce((a, b) => a + b, 0) + ')', dataSet['heavyInjury'].reduce((a, b) => a + b, 0)],
        ['Fatality (' + dataSet['fatality'].reduce((a, b) => a + b, 0) + ')', dataSet['fatality'].reduce((a, b) => a + b, 0)],
      ]
    }]

    return (
      <Card style={this.state.style}>
        <CardHeader style={this.state.style}>
          <i className="fa fa-ambulance"></i> Accident Overview
          </CardHeader>
        <CardBody>
          <ChartTransaction
            data_set={dataSet}
            chart_type={'pyramid'}
            title={this.state.title}
            subtitle={this.state.subtitle}
            x_title={'Ruas'}
            isCommandCenter={this.props.isCommandCenter}
            height={'300'}
            data_label={'true'}
            align={this.state.align}
          />
        </CardBody>
      </Card >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    accidentCount: state.accidentRate.rate
  }
}
export default connect(mapStateToProps)(AccidentOverview)