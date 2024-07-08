import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import ChartTransaction from '../Chart/ChartTransaction';
class FatalityDetails extends Component {
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
        style: { backgroundColor: 'rgba(0,0,0,0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff', borderRadius: '20px' },
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
    }, 18 * 1000); // 60 * 1000 milsec
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
        name: 'Persentase Tingkat Fatalitas',
        data: []
      }]
      nextProps.accidentCount.forEach((val, index) => {
        let a = 0
        if (!val.T_FATALITY) {
          val.T_FATALITY = 0
        }
        a = parseFloat(val.T_FATALITY).toFixed(2)
        dataSet[0]['data'].push(parseFloat(a))
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
    accidentCount.forEach((val, index) => {
      xCategory.push(val.RUAS_CODE)
    })

    return (
      <Card style={this.state.style}>
        <CardHeader style={{ backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', color: '#fff', borderRadius: '20px' }}>
          <i className="fa fa-ambulance"></i> Tingkat Fatalitas
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
      </Card>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    accidentCount: state.accidentRate.rate
  }
}
export default connect(mapStateToProps)(FatalityDetails)

