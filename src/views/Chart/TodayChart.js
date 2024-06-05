import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  Col,
  Row,
  Button
} from 'reactstrap';
import { ruasActions } from '../../store/action'
import TableTransaction from '../../components/Table/TransactionTable'
import FilterForm from '../../components/Modals/ModalFiltering'
import ModalSelectFilter from '../../components/Modals/ModalSelectFilter'
import ChartTransaction from '../../components/Chart/ChartTransaction'

class TodayChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFilter: true,
      modalFilterForm: false,
      filter_type: ''
    };
    this.openFilterModal = this.openFilterModal.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.switchBackModal = this.switchBackModal.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props
    // dispatch(chartAction.getTodayChartData());
    dispatch(ruasActions.getAllRuas());
  }

  changeFilter = (e) => {
    e.preventDefault()
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  openFilterModal = (e) => {
    e.preventDefault()
    this.setState({
      modalFilter: true,
      modalFilterForm: false,
    })
  }

  switchModal = (e) => {
    e.preventDefault()
    if (this.state.filter_type) {
      this.setState({
        modalFilter: false,
        modalFilterForm: true,
      })
    }
  }

  switchBackModal = (e) => {
    e.preventDefault()
    this.setState({
      modalFilter: true,
      modalFilterForm: false,
    })
  }

  onClose = (e) => {
    e.preventDefault()
    this.setState({
      modalFilter: false,
      modalFilterForm: false,
    })
  }

  render() {
    return (
      <Col>
        <Row>
          <Col>
            <Button className="float-right" color="success" onClick={this.openFilterModal}>Filter</Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Card >
              <CardBody>
                <ChartTransaction />
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
        <ModalSelectFilter
          modalfilter={this.state.modalFilter}
          changefilter={this.changeFilter}
          switchmodal={this.switchModal}
        />
        <FilterForm
          switchbackmodal={this.switchBackModal}
          modalfilterform={this.state.modalFilterForm}
          filtertype={this.state.filter_type}
          onclose={this.onClose}
        />
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