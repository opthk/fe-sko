import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { gerbangActions } from '../../store/action'
import { chartActions } from '../../store/action'

class ModalFiltering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      todayFilter: false,
      dailyFilter: false,
      monthlyFilter: false,
      yearlyFilter: false,
      type: '',
      gateId: '',
      sectionId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var show = true
    if (parseInt(nextProps.filtertype) === 0) {
      this.setState({
        todayFilter: show,
        dailyFilter: !show,
        monthlyFilter: !show,
        yearlyFilter: !show,
        type: 'Date'
      });
    }
    else if (parseInt(nextProps.filtertype) === 1) {
      this.setState({
        todayFilter: !show,
        dailyFilter: show,
        monthlyFilter: !show,
        yearlyFilter: !show,
        type: 'Daily'
      });
    }
    else if (parseInt(nextProps.filtertype) === 2) {
      this.setState({
        todayFilter: !show,
        dailyFilter: !show,
        monthlyFilter: show,
        yearlyFilter: !show,
        type: 'Monthly'
      });
    }
    else if (parseInt(nextProps.filtertype) === 3) {
      this.setState({
        todayFilter: !show,
        dailyFilter: !show,
        monthlyFilter: !show,
        yearlyFilter: show,
        type: 'Yearly'
      });
    }
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
    });
    this.setState(newState)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    var filter = {}
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    if (parseInt(this.props.filtertype) === 0) {
      filter = {
        start_date: this.state.date_start_date,
        end_date: this.state.date_start_date,
        id_ruas: this.state.sectionId,
        gate_code: this.state.gateId,
        type: 'date'
      }
    } else if (parseInt(this.props.filtertype) === 1) {
      filter = {
        start_date: this.state.daily_start_date,
        end_date: this.state.daily_end_date,
        id_ruas: this.state.sectionId,
        gate_code: this.state.gateId,
        type: 'daily'
      }
    } else if (parseInt(this.props.filtertype) === 2) {
      filter = {
        start_date: this.state.monthly_start_date,
        end_date: this.state.monthly_end_date,
        id_ruas: this.state.sectionId,
        gate_code: this.state.gateId,
        type: 'monthly'
      }
    }
    else if (parseInt(this.props.filtertype) === 3) {
      filter = {
        start_date: yyyy + '-' + mm + '-' + dd,
        end_date: yyyy + '-' + mm + '-' + dd,
        id_ruas: this.state.sectionId,
        gate_code: this.state.gateId,
        type: 'yearly'
      }
    }
    dispatch(chartActions.getChartData(filter));
    dispatch(chartActions.getChartDataGolongan(filter));
  }

  render() {
    const todayStyle = this.state.todayFilter ? {} : { display: 'none' }
    const dailyStyle = this.state.dailyFilter ? {} : { display: 'none' }
    const mothlyStyle = this.state.monthlyFilter ? {} : { display: 'none' }
    const { ruas, gerbang } = this.props
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

    return (
      <Modal isOpen={this.props.modalfilterform} toggle={this.props.toggle} className={this.props.className}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.props.toggle}>{this.state.type} Filter Chart</ModalHeader>
          <ModalBody>
            <Row style={todayStyle}>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="ccnumber">Date</Label>
                  <Input type="date" name="date_start_date" id="date_start_date" bsSize="sm" onChange={this.handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={dailyStyle}>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="ccnumber">Start Date</Label>
                  <Input type="date" name="daily_start_date" id="date" bsSize="sm" onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="ccnumber">End Date</Label>
                  <Input type="date" name="daily_end_date" id="date" bsSize="sm" onChange={this.handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row style={mothlyStyle}>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="ccnumber">Start Date</Label>
                  <Input type="month" name="monthly_start_date" id="date" bsSize="sm" onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="ccnumber">End Date</Label>
                  <Input type="month" name="monthly_end_date" id="date" bsSize="sm" onChange={this.handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="ccnumber">Branch</Label>
                  <Input type="select" name="sectionId" id="section" bsSize="sm" onChange={this.handleChange}>
                    <option value="">-- All Branch --</option>
                    {allRuasList}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="ccnumber">Gate</Label>
                  <Input type="select" name="gateId" id="gate" bsSize="sm" onChange={this.handleChange}>
                    <option value="">-- All Gate --</option>
                    {gerbangList}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" >Submit</Button>
            <Button type="button" color="success" onClick={this.props.switchbackmodal}>Back</Button>
            <Button type="button" color="secondary" color="danger" onClick={this.props.onclose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    ruas: state.ruas.ruas,
    gerbang: state.gerbang.gerbang,
  }
}
export default connect(mapStateToProps)(ModalFiltering)

