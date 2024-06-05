import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { senkomActions } from '../../store/action'
import Event from '../Tabs/Senkom/Event';
import AccidentDetail from '../Tabs/Senkom/AccidentDetail';
import VehicleAssistance from '../Tabs/Senkom/VehicleAssistance';
import Reporter from '../Tabs/Senkom/Reporter';

const initialState = {
  data: '',
  readOnly: true,
  activeTab: new Array(1).fill('1'),
  status: '',
  branch: '',
  sta: '',
  lane: '',
  event_time: '',
  shift: '',
  event_clear: '',
  interference: '',
  id_interference: '',
  id_vehicle: '',
  vehicle_identification: '',
  reporter_name: '',
  reporter_phone: '',
  information: '',
  accident_position: '',
  accident_weather: '',
  accident_type: '',
  accident_cause: '',
  driver_name: '',
  driver_gender: '',
  driver_age: '',
  driver_adress: '',
  light_injury: '',
  heavy_injury: '',
  fatality: '',
  chronology: '',
  units: {
    'unit0': '',
  },
  vehicle_assistance: [{
    'unit_type': '',
    'unit_number': '',
    'unit_time-arrival': '',
  }],
  jumlah: 1,
  x: 0
}

class NewSenkom extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
    this.handleChange = this.handleChange.bind(this);
    this.handleSuperChange = this.handleSuperChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  handleChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSuperChange = (e) => {
    this.state.vehicle_assistance[this.state.x][e.target.name] = e.target.value;
    this.setState({
      vehicle_assistance: this.state.vehicle_assistance,
    })
  }

  addRow(e) {
    e.preventDefault()
    let i = this.state.jumlah.toString()
    let x = this.state.x.toString()
    this.state.units['unit' + i] = '';
    this.state.vehicle_assistance[i] = {}
    this.state.vehicle_assistance[i]['unit_type'] = '';
    this.state.vehicle_assistance[i]['unit_number'] = '';
    this.state.vehicle_assistance[i]['unit_time-arrival'] = '';
    this.setState({
      units: this.state.units,
      vehicle_assistance: this.state.vehicle_assistance,
      jumlah: this.state.jumlah + 1,
      x: this.state.x + 1
    })
  }

  deleteRow(row) {
    var vehicle_unit = this.state.units
    let last = Object.keys(vehicle_unit)[Object.keys(vehicle_unit).length - 1];
    delete vehicle_unit.last;
  }

  handleSubmit = (e) => {
    const { table_option } = this.props
    e.preventDefault();
    var id_senkom_handling = ''
    let updated_by = ''
    const { dispatch } = this.props
    let identity = JSON.parse(localStorage.getItem('identity'))


    if (this.props.edit) {
      id_senkom_handling = this.props.idsenkom
      updated_by = identity.username
    }

    var formSenkom = {
      id_senkom_handling: id_senkom_handling,
      id_interference: this.state.id_interference,
      branch: this.state.branch,
      event_time: this.state.event_time,
      event_clear: this.state.event_clear,
      shift: this.state.shift,
      sta: this.state.sta,
      lane: this.state.lane,
      id_vehicle: this.state.id_vehicle,
      vehicle_identification: this.state.vehicle_identification,
      accident_position: this.state.accident_position,
      accident_weather: this.state.accident_weather,
      accident_type: this.state.accident_type,
      accident_cause: this.state.accident_cause,
      driver_name: this.state.driver_name,
      driver_gender: this.state.driver_gender,
      driver_age: this.state.driver_age,
      driver_address: this.state.driver_adress,
      light_injury: this.state.light_injury,
      heavy_injury: this.state.heavy_injury,
      fatality: this.state.fatality,
      chronology: this.state.chronology,
      reporter_name: this.state.reporter_name,
      reporter_phone: this.state.reporter_phone,
      information: this.state.information,
      vehicle_assistance: this.state.vehicle_assistance,
      created_by: identity.username,
      updated_by: updated_by
    }
    if (this.props.add) {
      dispatch(senkomActions.createDataSenkom(formSenkom, identity.branch_code,table_option));
    } else {
      dispatch(senkomActions.updateDataSenkom(formSenkom, identity.branch_code,table_option));
    }
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, toastr } = this.props

    if (nextProps.add) {
      this.setState(initialState);
    } else {
      if (this.props.idsenkom !== nextProps.idsenkom) {
        dispatch(senkomActions.getDataSenkom(nextProps.idsenkom));
      }
      if (this.props.senkom_detail !== nextProps.senkom_detail) {
        this.setState({
          id_senkom_handling: nextProps.senkom_detail.ID_SENKOM_HANDLING,
          branch: nextProps.senkom_detail.ID_RUAS,
          sta: nextProps.senkom_detail.STA,
          lane: nextProps.senkom_detail.LANE,
          event_time: nextProps.senkom_detail.EVENT_TIME,
          shift: nextProps.senkom_detail.SHIFT,
          event_clear: nextProps.senkom_detail.TKP_CLEAR,
          interference: nextProps.senkom_detail.INTERFERENCE_TYPE,
          id_interference: nextProps.senkom_detail.ID_INTERFERENCE,
          id_vehicle: nextProps.senkom_detail.ID_VEHICLE,
          vehicle_type: nextProps.senkom_detail.VEHICLE_TYPE,
          vehicle_identification: nextProps.senkom_detail.VEHICLE_IDENTIFICATION,
          reporter_name: nextProps.senkom_detail.REPORTER_NAME,
          reporter_phone: nextProps.senkom_detail.REPORTER_PHONE,
          information: nextProps.senkom_detail.INFORMATION,
        });
      }

      if (this.props.senkom_kecelakaan !== nextProps.senkom_kecelakaan) {
        this.setState({
          accident_position: nextProps.senkom_kecelakaan.ID_ACCIDENT_POSITION,
          accident_weather: nextProps.senkom_kecelakaan.ID_ACCIDENT_WEATHER,
          accident_type: nextProps.senkom_kecelakaan.ID_ACCIDENT_TYPE,
          accident_cause: nextProps.senkom_kecelakaan.ID_ACCIDENT_CAUSE,
          driver_name: nextProps.senkom_kecelakaan.DRIVER_NAME,
          driver_gender: nextProps.senkom_kecelakaan.DRIVER_GENDER,
          driver_age: nextProps.senkom_kecelakaan.DRIVER_AGE,
          driver_address: nextProps.senkom_kecelakaan.DRIVER_ADDRESS,
          light_injury: nextProps.senkom_kecelakaan.LIGHT_INJURY,
          heavy_injury: nextProps.senkom_kecelakaan.HEAVY_INJURY,
          fatality: nextProps.senkom_kecelakaan.FATALITY,
          chronology: nextProps.senkom_kecelakaan.CHRONOLOGY,
        });
      }

      if (this.props.senkom_bantuan !== nextProps.senkom_bantuan) {
        nextProps.senkom_bantuan.forEach((val, index) => {
          this.state.units['unit' + index] = '';
          this.state.vehicle_assistance[index] = {}
          this.state.vehicle_assistance[index]['id_map_bantuan'] = val.ID_MAP_BANTUAN;
          this.state.vehicle_assistance[index]['unit_type'] = val.ID_UNIT_BANTUAN;
          this.state.vehicle_assistance[index]['unit_number'] = val.JUMLAH;
          this.state.vehicle_assistance[index]['unit_time-arrival'] = val.TIME_ARRIVAL;
          this.setState({
            units: this.state.units,
            vehicle_assistance: this.state.vehicle_assistance,
          })
        })
      }
    }
    if (toastr.toastrs.length > 0 && toastr.toastrs[0].type !== "error") {
      this.props.onclose()
    }
  }

  render() {
    const { ruas, interference, vehicle, accident_option, vehicle_assistance } = this.props
    var accidentTabStyle = {}
    var submitButtonStyle = {}
    var requiredStyle = { color: 'red' }

    if (parseInt(this.state.id_interference) !== 1) {
      accidentTabStyle = { display: 'none' }
    }
    else {
      accidentTabStyle = {}
    }

    if (parseInt(this.state.activeTab[0]) === 4 && this.props.view === false) {
      submitButtonStyle = { display: 'block' }
    } else {
      submitButtonStyle = { display: 'none' }
    }

    const allRuasList = ruas.map((val, index) => {
      return (
        <option value={val.ID_RUAS} key={index}>
          {val.RUAS_NAME + ' (' + val.RUAS_CODE + ')'}
        </option>
      )
    })
    const interferenceList = interference.map((val, index) => {
      return (
        <option value={val.ID_INTERFERENCE} key={index}>
          {val.INTERFERENCE_TYPE}
        </option>
      )
    })
    const vehicleList = vehicle.map((val, index) => {
      return (
        <option value={val.ID_VEHICLE} key={index}>
          {val.VEHICLE_TYPE}
        </option>
      )
    })
    const accident_cause_list = accident_option.accident_cause.map((val, index) => {
      return (
        <option value={val.ID_ACCIDENT_CAUSE} key={index}>
          {val.ACCIDENT_CAUSE}
        </option>
      )
    })
    const accident_position_list = accident_option.accident_position.map((val, index) => {
      return (
        <option value={val.ID_ACCIDENT_POSITION} key={index}>
          {val.POSITION_NAME}
        </option>
      )
    })
    const accident_type_list = accident_option.accident_type.map((val, index) => {
      return (
        <option value={val.ID_ACCIDENT_TYPE} key={index}>
          {val.ACCIDENT_TYPE}
        </option>
      )
    })
    const accident_weather_list = accident_option.accident_weather.map((val, index) => {
      return (
        <option value={val.ID_ACCIDENT_WEATHER} key={index}>
          {val.WEATHER_NAME}
        </option>
      )
    })
    const assistance_list = vehicle_assistance.map((val, index) => {
      return (
        <option value={val.ID_UNIT_BANTUAN} key={index}>
          {val.NAMA_UNIT_BANTUAN}
        </option>
      )
    })

    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={'modal-lg ' + this.props.className}>
        <Form onSubmit={this.handleSubmit} noValidate>
          <ModalHeader toggle={this.props.toggle}>{this.state.type} Data Senkom
          </ModalHeader>
          <ModalBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Kejadian
                </NavLink>
              </NavItem>
              <NavItem style={accidentTabStyle}>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Detail Kecelakaan
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Bantuan Kendaraan
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => { this.toggle(0, '4'); }}
                >
                  Informasi lainya
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <Event
                  requiredstyle={requiredStyle}
                  handlechange={this.handleChange}
                  all_ruas_list={allRuasList}
                  interference_list={interferenceList}
                  vehicle_list={vehicleList}
                  read_only={this.props.view}
                  status={this.state.status}
                  branch={this.state.branch}
                  sta={this.state.sta}
                  lane={this.state.lane}
                  event_time={this.state.event_time}
                  shift={this.state.shift}
                  event_clear={this.state.event_clear}
                  id_interference={this.state.id_interference}
                  id_vehicle={this.state.id_vehicle}
                  vehicle_identification={this.state.vehicle_identification}
                />
              </TabPane>
              <TabPane tabId="2">
                <AccidentDetail
                  requiredstyle={requiredStyle}
                  handlechange={this.handleChange}
                  read_only={this.props.view}
                  accident_position_list={accident_position_list}
                  accident_weather_list={accident_weather_list}
                  accident_type_list={accident_type_list}
                  accident_cause_list={accident_cause_list}
                  accident_position={this.state.accident_position}
                  accident_weather={this.state.accident_weather}
                  accident_type={this.state.accident_type}
                  accident_cause={this.state.accident_cause}
                  driver_name={this.state.driver_name}
                  driver_gender={this.state.driver_gender}
                  driver_age={this.state.driver_age}
                  driver_adress={this.state.driver_adress}
                  light_injury={this.state.light_injury}
                  heavy_injury={this.state.heavy_injury}
                  fatality={this.state.fatality}
                  chronology={this.state.chronology}
                />
              </TabPane>
              <TabPane tabId="3">
                <VehicleAssistance
                  requiredstyle={requiredStyle}
                  handleSuperChange={this.handleSuperChange}
                  read_only={this.props.view}
                  senkom_bantuan={this.props.senkom_bantuan}
                  units={this.state.units}
                  jumlah={this.state.jumlah}
                  addrow={this.addRow}
                  deleterow={this.deleteRow}
                  vehicle_assistance={this.state.vehicle_assistance}
                  assistance_list={assistance_list}
                />
              </TabPane>
              <TabPane tabId="4">
                <Reporter
                  requiredstyle={requiredStyle}
                  handlechange={this.handleChange}
                  read_only={this.props.view}
                  reporter_name={this.state.reporter_name}
                  reporter_phone={this.state.reporter_phone}
                  information={this.state.information}
                />
              </TabPane>
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" style={submitButtonStyle} >Submit</Button>
            <Button color="secondary" color="danger" onClick={this.props.onclose}>Close</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    myIdentity: state.user.myIdentity,
    senkom_detail: state.senkom_detail.senkom_detail,
    senkom_bantuan: state.senkom_detail.senkom_bantuan,
    senkom_kecelakaan: state.senkom_detail.senkom_kecelakaan,
    toastr: state.toastr
  }
}
export default connect(mapStateToProps)(NewSenkom)

