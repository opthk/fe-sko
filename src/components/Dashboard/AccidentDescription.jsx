import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';
import ChartTransaction from '../Chart/ChartTransaction';

class AccidentDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      dataRaw: [],
      daily: '',
      redraw: false,
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
    var self = this
    if (this.props.style_group) {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.0)'
      });
    } else {
      this.setState({
        styleGroup: 'rgba(0,0,0,0.6)'
      });
    }

    setInterval(function () {
      self.resetDataSet()
      self.fillData()
    }, 15 * 1000); // 60 * 1000 milsec
  }

  resetDataSet = (e) => {
    this.setState({
      dataSet: []
    });
  }

  fillData = (e) => {
    this.setState({
      dataSet: this.state.dataRaw
    });
  }

  componentWillReceiveProps(nextProps) {
    var self = this
    if (this.props.accidentCount !== nextProps.accidentCount) {

      let dataSet = [{
        name: 'Jumlah Kecelakaan',
        data: []
      }]
      nextProps.accidentCount.ruasAccident.forEach((val, index) => {
        dataSet[0]['data'].push(val.jumlah)
      })
      this.resetDataSet()
      setTimeout(function () {
        self.setState({
          dataSet: dataSet,
          dataRaw: dataSet
        });
      }, 1);
    }
  }

  render() {
    let xCategory = []
    const { accidentCount } = this.props
    accidentCount.ruasAccident.forEach((val, index) => {
      xCategory.push(val.ruas)
    })
    return (
      <Card style={this.state.style}>
        <CardHeader style={this.state.style}>
          <i className="fa fa-ambulance"></i> Accident Count
        </CardHeader>
        <CardBody>
          <ChartTransaction
            data_set={this.state.dataSet}
            chart_type={'bar'}
            x_category={xCategory}
            title={this.state.title}
            subtitle={this.state.subtitle}
            x_title={'Ruas'}
            height={'310'}
            data_label={'true'}
            align={this.state.align}
            isCommandCenter={this.props.isCommandCenter}
          />
        </CardBody>
      </Card >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    accidentCount: state.accident.accident
  }
}
export default connect(mapStateToProps)(AccidentDescription)