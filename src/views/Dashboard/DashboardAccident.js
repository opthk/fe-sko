import React, { Component } from 'react';
import { connect } from 'react-redux';
import { accidentActions, potholesActions } from '../../store/action'
import {
  Col,
  Row,
} from 'reactstrap';
import AccidentOverview from '../../components/Dashboard/AccidentOverview';
import AccidentDescription from '../../components/Dashboard/AccidentDescription';
import PotholesDescription from '../../components/Dashboard/PotholesDescription';
import AccidentDetails from '../../components/Dashboard/AccidentDetails';
import FatalityDetails from '../../components/Dashboard/FatalityDetails';
import AccidentTable from '../../components/Table/AccidentTable';



class DashboardAccident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLastAccident: [],
      background_group: true,
      isCommandCenter: false
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    var identity = JSON.parse(localStorage.getItem('identity'))
    const { dispatch } = this.props
    dispatch(accidentActions.getAccident(identity.branch_code));
    dispatch(accidentActions.getLastAccident(identity.branch_code));
    dispatch(accidentActions.getAccidentRate(identity.branch_code));
    dispatch(potholesActions.getPotholesOverview(identity.branch_code));
    setInterval(function () {
      dispatch(accidentActions.getAccident(identity.branch_code));
      dispatch(accidentActions.getLastAccident(identity.branch_code));
      dispatch(accidentActions.getAccidentRate(identity.branch_code));
      dispatch(potholesActions.getPotholesOverview(identity.branch_code));
    }, 1500 * 1000);

    if (identity.ID_GROUP === 5) {
      this.setState({
        isCommandCenter: true
      });
    } else {
      this.setState({
        isCommandCenter: false
      });
    }

  }

  componentWillReceiveProps(nextProps) {
    const { lastAccident } = this.props
    if (lastAccident !== nextProps.lastAccident) {
      this.setState({
        dataLastAccident: nextProps.lastAccident
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="4" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)', // Efek blur
            color: 'white', // Warna teks putih
            borderRadius: '10px', // Border radius
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
          }}>
            <AccidentDescription
              isCommandCenter={this.state.isCommandCenter}
            />
          </Col>

          <Col lg="4" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)', // Efek blur
            color: 'white', // Warna teks putih
            borderRadius: '10px', // Border radius
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
          }}>
            <AccidentOverview
              isCommandCenter={this.state.isCommandCenter}
            />
          </Col>
          <Col lg="4" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)', // Efek blur
            color: 'white', // Warna teks putih
            borderRadius: '10px', // Border radius
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
          }}>
            <AccidentTable
              data={this.state.dataLastAccident}
              isCommandCenter={this.state.isCommandCenter}
            />
          </Col>
        </Row>


        <Row>
          <Col lg="4" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)', // Efek blur
            color: 'white', // Warna teks putih
            borderRadius: '10px', // Border radius
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
          }}>
            <AccidentDetails
              isCommandCenter={this.state.isCommandCenter}
            />
          </Col>

          <Col lg="4" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)', // Efek blur
            color: 'white', // Warna teks putih
            borderRadius: '10px', // Border radius
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
          }}>
            <FatalityDetails
              isCommandCenter={this.state.isCommandCenter}
            />
          </Col>

          <Col lg="4" style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(30px)', // Efek blur
            color: 'white', // Warna teks putih
            borderRadius: '10px', // Border radius
            border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparans
          }}>
            <PotholesDescription
              isCommandCenter={this.state.isCommandCenter}
            />
          </Col>
        </Row>
        <br></br>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lastAccident: state.lastAccident.lastAccident,
  }
}
export default connect(mapStateToProps)(DashboardAccident)