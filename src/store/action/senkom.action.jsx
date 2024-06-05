import axios from 'axios';
import { alertActions } from "../action";
import { senkomConstants } from "../constants";
import { config } from "../../config";

import qs from 'qs'

export const senkomActions = {
  createDataSenkom,
  updateDataSenkom,
  getAllDataSenkom,
  getDataSenkom,
  deleteDataSenkom,
  getSenkomFilter
}

function createDataSenkom(data_senkom, branch, table_option) {
  const filterData = []
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/createDataSenkom', qs.stringify(data_senkom), { headers: { 'x-access-token': token } })
      .then(response => {
        const responseAlert = {
          status: response.data.status,
          message: response.data.message
        }
        dispatch(alertActions.successData(responseAlert));
        dispatch(senkomActions.getAllDataSenkom(branch, table_option, filterData));
      })
      .catch(error => {
        const responseAlert = {
          status: error.status,
          message: error.message
        }
        dispatch(alertActions.errorData(responseAlert));
      });
  };
}

function updateDataSenkom(data_senkom, branch, table_option) {
  const filterData = []
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/updateDataSenkom', qs.stringify(data_senkom), { headers: { 'x-access-token': token } })
      .then(response => {
        const responseAlert = {
          status: response.data.status,
          message: response.data.message
        }
        dispatch(alertActions.successData(responseAlert));
        dispatch(senkomActions.getAllDataSenkom(branch, table_option, filterData));
      })
      .catch(error => {
        const responseAlert = {
          status: error.status,
          message: error.message
        }
        dispatch(alertActions.errorData(responseAlert));
      });
  };
}

function getAllDataSenkom(ruas_code, options, filterData) {
  const token = localStorage.getItem('x-access-token');
  let option = {}
  let filter = {}
  if (options.length !== 0) {
    option['rowsPerPage'] = options.rowsPerPage
    option['page'] = options.page
    option['idBranch'] = options.idBranch
  }

  if (filterData.length !== 0) {
    filter['day'] = filterData[1][0]
    filter['month'] = filterData[2][0]
    filter['year'] = filterData[3][0]
    filter['branch'] = filterData[4][0]
    filter['shift'] = filterData[6][0]
    filter['sta'] = filterData[7][0]
    filter['lane'] = filterData[8][0]
    filter['interference'] = filterData[9][0]
  }
  var query = {
    params: {
      option,
      filter,
    },
    filter,
    headers: { 'x-access-token': token },
    'Content-Type': 'application/json'
  }
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/senkom/data', query)
      .then(response => {
        const senkom = response.data.data
        var data = [];
        var i = 0;
        var j = 1;
        if (options.page !== 0) {
          j = (options.page * options.rowsPerPage) + 1
        }
        for (i = 0; i < senkom.length; i++) {
          data[i] = []
          data[i].push(
            j,
            senkom[i].DAY,
            senkom[i].MONTH,
            senkom[i].YEAR,
            senkom[i].RUAS_CODE,
            senkom[i].EVENT_TIME,
            senkom[i].SHIFT,
            senkom[i].STA,
            senkom[i].LANE,
            senkom[i].INTERFERENCE_TYPE,
            senkom[i].VEHICLE_IDENTIFICATION,
            senkom[i].ID_SENKOM_HANDLING,
            senkom[i].JUMLAH_TOTAL,
          )
          j++
        }
        dispatch(storeDataSenkom(data));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataSenkom(data) { return { type: senkomConstants.GET_ALL_DATA_SENKOM, payload: data } }
}

function getSenkomFilter(ruas_code) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/senkom/filter/' + ruas_code, { headers: { 'x-access-token': token } })
      .then(response => {
        const filter = response.data.data
        let data = [];
        // console.log(filter)
        data['cabang'] = filter.ruasCode
        data['day'] = filter.date.day
        data['month'] = filter.date.month
        data['year'] = filter.date.year
        data['shift'] = filter.shift
        data['sta'] = filter.sta
        data['lane'] = filter.lane
        data['interference'] = filter.interference
        data['platNomor'] = filter.platNomor
        dispatch(storeDataFilterSenkom(data));
      })
      .catch(error => {
        const responseAlert = {
          status: error.status,
          message: error.message
        }
        dispatch(alertActions.errorData(responseAlert));
      });
  };
  function storeDataFilterSenkom(data) { return { type: senkomConstants.GET_DATA_FILTER_SENKOM, payload: data } }
}

function deleteDataSenkom(data_senkom, branch, table_option) {
  const filterData = []
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.put(config.HK_DASHBOARD_GLOBAL_API + '/deleteDataSenkom/' + data_senkom.id_senkom, qs.stringify(data_senkom), { headers: { 'x-access-token': token } })
      .then(response => {
        const responseAlert = {
          status: response.data.status,
          message: response.data.message
        }
        dispatch(alertActions.successData(responseAlert));
        dispatch(senkomActions.getAllDataSenkom(branch, table_option, filterData));
      })
      .catch(error => {
        const responseAlert = {
          status: error.status,
          message: error.message
        }
        dispatch(alertActions.errorData(responseAlert));
      });
  };
}

function getDataSenkom(id_senkom) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getSenkomById/' + id_senkom, { headers: { 'x-access-token': token } })
      .then(response => {
        const rawsenkom = response.data.data
        let senkom = {
          bantuan: [],
          detail: {},
          kecelakaan: {}
        }
        if (response.data.data.length === 0) {
          dispatch({ type: senkomConstants.DEFAULT })
        } else {
          senkom.detail['id_senkom_handling'] = rawsenkom.detail['ID_SENKOM_HANDLING']
          senkom.detail['id_interference'] = rawsenkom.detail['ID_INTERFERENCE']
          senkom.detail['branch'] = rawsenkom.detail['ID_RUAS']
          senkom.detail['event_time'] = rawsenkom.detail['EVENT_TIME']
          senkom.detail['shift'] = rawsenkom.detail['SHIFT']
          senkom.detail['event_clear'] = rawsenkom.detail['TKP_CLEAR']
          senkom.detail['sta'] = rawsenkom.detail['STA']
          senkom.detail['lane'] = rawsenkom.detail['LANE']
          senkom.detail['id_vehicle'] = rawsenkom.detail['ID_VEHICLE']
          senkom.detail['vehicle_identification'] = rawsenkom.detail['VEHICLE_IDENTIFICATION']
          senkom.detail['accident_position'] = rawsenkom.kecelakaan['ID_ACCIDENT_POSITION']
          senkom.detail['accident_weather'] = rawsenkom.kecelakaan['ID_ACCIDENT_WEATHER']
          senkom.detail['accident_type'] = rawsenkom.kecelakaan['ID_ACCIDENT_TYPE']
          senkom.detail['accident_cause'] = rawsenkom.kecelakaan['ID_ACCIDENT_CAUSE']
          senkom.detail['driver_name'] = rawsenkom.kecelakaan['DRIVER_NAME']
          senkom.detail['driver_gender'] = rawsenkom.kecelakaan['DRIVER_GENDER']
          senkom.detail['driver_age'] = rawsenkom.kecelakaan['DRIVER_AGE']
          senkom.detail['driver_address'] = rawsenkom.kecelakaan['DRIVER_ADDRESS']
          senkom.detail['light_injury'] = rawsenkom.kecelakaan['LIGHT_INJURY']
          senkom.detail['heavy_injury'] = rawsenkom.kecelakaan['HEAVY_INJURY']
          senkom.detail['fatality'] = rawsenkom.kecelakaan['FATALITY']
          senkom.detail['chronology'] = rawsenkom.kecelakaan['CHRONOLOGY']
          senkom.detail['reporter_name'] = rawsenkom.detail['REPORTER_NAME']
          senkom.detail['information'] = rawsenkom.detail['INFORMATION']
          senkom.detail['vehicle_assistance'] = []
          rawsenkom.bantuan.forEach((val, index) => {
            senkom.detail['vehicle_assistance'][index] = {}
            senkom.detail['vehicle_assistance'][index]['id_map_bantuan'] = val.ID_MAP_BANTUAN
            senkom.detail['vehicle_assistance'][index]['unit_type'] = val.ID_UNIT_BANTUAN
            senkom.detail['vehicle_assistance'][index]['unit_number'] = val.JUMLAH
            senkom.detail['vehicle_assistance'][index]['unit_time_arrival'] = val.TIME_ARRIVAL
          });
          // senkom.detail['vehicle_assistance'] = rawsenkom.bantuan
          dispatch(storeDataSenkom(senkom));
        }
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataSenkom(data) { return { type: senkomConstants.GET_DATA_SENKOM_BY_ID, payload: data } }
}