import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Row,
} from 'reactstrap';
import LineChartBank from '../../components/Chart/LineChartBank';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

class BankPercentage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontColor: { color: '#fff' }
    };
  }

  componentWillMount() {
    if (!this.props.isCommandCenter) {
      this.setState({
        fontColor: { color: '#333' }
      });
    }
  }

  render() {
    const { bankPercentage } = this.props

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
      <Row>
        <Col sm="3">
          <LineChartBank
            percentage={mandiriPercentage}
            color={brandPrimary}
            bank={'Mandiri'}
            fontColor={this.state.fontColor}
          />
        </Col>
        <Col sm="3">
          <LineChartBank
            percentage={bcaPercentage}
            color={brandDanger}
            bank={'BCA'}
            fontColor={this.state.fontColor}
          />
        </Col>
        <Col sm="3">
          <LineChartBank
            percentage={briPercentage}
            color={brandWarning}
            bank={'BRI'}
            fontColor={this.state.fontColor}
          />
        </Col>
        <Col sm="3">
          <LineChartBank
            percentage={bniPercentage}
            color={brandSuccess}
            bank={'BNI'}
            fontColor={this.state.fontColor}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bankPercentage: state.monthlySettlement.bankPercentage,
  }
}
export default connect(mapStateToProps)(BankPercentage)