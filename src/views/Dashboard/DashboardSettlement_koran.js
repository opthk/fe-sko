import React, { Component } from 'react';
import { connect } from 'react-redux';
import { settlementAction } from '../../store/action'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import RekeningKoran from '../../components/Dashboard/RekeningKoran';
import SettlementDaily from '../../components/Dashboard/SettlementDaily';
import DropdownMenuCommandPanel from '../../components/Button/DropdownMenuCommandPanel';
import BankPercentage from '../../components/Dashboard/BankPercentage';
import RekeningKoranTable from '../../components/Dashboard/RekeningKoranTable';

class DashboardSettlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_branch: '',
      dataRuas: [],
      ruasValue: [],
      background_group: false,
      isCommandCenter: false
    };
  }

  componentWillMount() {
    let identity = JSON.parse(localStorage.getItem('identity'))
    if (identity.ID_GROUP === 5) {
      this.setState({
        background_group: true,
        style: { border: 'none', backgroundColor: 'rgba(0,0,0,0.0)', color: '#fff', fontSize: '16px' },
        isCommandCenter: true
      });
    } else {
      this.setState({
        style: { color: '#333', fontSize: '16px' },
        isCommandCenter: false
      });
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    var self = this
    var identity = JSON.parse(localStorage.getItem('identity'))

    dispatch(settlementAction.getSettlementKoran(identity.branch_code));
    // dispatch(settlementAction.getSettlementDaily(identity.branch_code));
    setInterval(function () {
      dispatch(settlementAction.getSettlementKoran(identity.branch_code));
      // dispatch(settlementAction.getSettlementDaily(identity.branch_code));
    }, 300 * 1000); // 300 * 1000 milsec
    setInterval(function () {
      self.resetDataSet()
      self.fillData()
    }, 20 * 1000); // 20 * 1000 milsec
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
    return (
      <div className="animated fadeIn">
        <Card style={this.state.style}>
          <CardHeader style={this.state.style}>
            <i className="fa fa-money"></i> <b>Overview Pendapatan</b>
            <DropdownMenuCommandPanel />
          </CardHeader>
          <CardBody className="text-white">
            <Row>
              <Col lg="12">
                <BankPercentage
                  isCommandCenter={this.state.isCommandCenter} />
              </Col>
            </Row>
            <hr style={{ backgroundColor: '#fff' }} />
            <Row>
              <Col lg="12">
                <SettlementDaily isCommandCenter={this.state.isCommandCenter}
                />
              </Col>
            </Row>
            <hr style={{ backgroundColor: '#fff' }} />
            <Row>
              <Col lg="12">
                <RekeningKoran isCommandCenter={this.state.isCommandCenter}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                &nbsp;
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <RekeningKoranTable isCommandCenter={this.state.isCommandCenter} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dailySettlement: state.dailySettlement.dailySettlement,
    bankPercentage: state.monthlySettlement.bankPercentage,
  }
}
export default connect(mapStateToProps)(DashboardSettlement)