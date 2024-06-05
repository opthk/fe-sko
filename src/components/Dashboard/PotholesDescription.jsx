import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import ChartTransaction from '../Chart/ChartTransaction';

class PotholesDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      dataRaw: [],
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
    }, 19 * 1000); // 60 * 1000 milsec
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
    if (this.props.potholes !== nextProps.potholes) {

      let dataSet = [{
        name: 'Potholes Handling Percentage',
        data: []
      }]
      nextProps.potholes.forEach((val, index) => {
        let a = 0
        if (val.NOT_HANDLING === 0) {
          a = 100
        } else {
          a = 100 - (val.NOT_HANDLING / val.TOTAL_POTHOLES * 100)
        }
        dataSet[0]['data'].push(parseFloat(a.toFixed(2)))
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
    const { potholes } = this.props
    potholes.forEach((val, index) => {
      xCategory.push(val.RUAS_CODE)
    })
    return (
      <Card style={this.state.style}>
        <CardHeader style={this.state.style}>
          <i className="fa fa-exclamation-triangle"></i> Potholes Handling
        </CardHeader>
        <CardBody>
          <ChartTransaction
            data_set={this.state.dataSet}
            chart_type={'column'}
            x_category={xCategory}
            height={'325'}
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
    potholes: state.potholes.potholes,
  }
}
export default connect(mapStateToProps)(PotholesDescription)