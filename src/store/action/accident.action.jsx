import axios from 'axios';
import { accidentConstants, senkomConstants } from "../constants";
import { alertActions } from "../action";
import { config } from "../../config";

export const accidentActions = {
  getAccident,
  getAccidentRate,
  getLastAccident,
  getAllDataAccident,
  getAccidentFilter
}

function getLastAccident(branch_code) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/accident/last/' + branch_code, { headers: { 'x-access-token': token } })
      .then(response => {
        var accident = response.data.data
        var rawDataRuas = []
        accident.forEach((value, index) => {
          rawDataRuas[index] = []
          var accident_type = ''
          if (value.FATALITY && value.FATALITY !== 0) {
            accident_type = 'Fatality'
          } else if (value.HEAVY_INJURY && value.HEAVY_INJURY !== 0) {
            accident_type = 'Heavy'
          } else if (value.LIGHT_INJURY && value.LIGHT_INJURY !== 0) {
            accident_type = 'Light'
          } else {
            accident_type = 'None'
          }

          rawDataRuas[index]['ruas'] = value.RUAS_CODE
          rawDataRuas[index]['event_time'] = value.EVENT_TIME
          rawDataRuas[index]['lokasi'] = value.STA + ' ' + value.LANE
          rawDataRuas[index]['type'] = accident_type
        })

        dispatch(storeDataLastAccident(rawDataRuas));
      })
      .catch(error => {
        console.log(error)
        // dispatch(loginActions.logout());
      });
  }
  function storeDataLastAccident(data) { return { type: accidentConstants.GET_DATA_LAST_ACCIDENT, payload: data } }
}

function getAllDataAccident(ruas_code, options, filterData) {
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
    filter['sta'] = filterData[7][0]
    filter['lane'] = filterData[8][0]
    filter['lightInjury'] = filterData[9][0]
    filter['heavyInjury'] = filterData[10][0]
    filter['fatality'] = filterData[11][0]
    filter['accidentPosition'] = filterData[12][0]
    filter['accidentWeather'] = filterData[13][0]
    filter['accidentType'] = filterData[14][0]
    filter['accidentCause'] = filterData[15][0]
  }

  var query = {
    params: {
      option,
      filter,
    },
    headers: { 'x-access-token': token },
    'Content-Type': 'application/json'
  }
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/accident/report/data', query)
      .then(response => {
        const accident = response.data.data
        var data = [];
        var i = 0;
        var j = 1;
        if (options.page !== 0) {
          j = (options.page * options.rowsPerPage) + 1
        }
        for (i = 0; i < accident.length; i++) {
          data[i] = []

          if (!accident[i].LIGHT_INJURY) {
            accident[i].LIGHT_INJURY = 0
          }
          if (!accident[i].HEAVY_INJURY) {
            accident[i].HEAVY_INJURY = 0
          }
          if (!accident[i].FATALITY) {
            accident[i].FATALITY = 0
          }

          data[i].push(
            j,
            accident[i].DAY,
            accident[i].MONTH,
            accident[i].YEAR,
            accident[i].RUAS_CODE,
            accident[i].EVENT_TIME,
            accident[i].TIME,
            accident[i].STA,
            accident[i].LANE,
            accident[i].LIGHT_INJURY,
            accident[i].HEAVY_INJURY,
            accident[i].FATALITY,
            accident[i].POSITION_NAME,
            accident[i].WEATHER_NAME,
            accident[i].ACCIDENT_TYPE,
            accident[i].ACCIDENT_CAUSE,
            accident[i].ID_SENKOM_HANDLING,
            accident[i].TOTAL,
          )
          j++
        }
        // console.log(data)
        dispatch(storeDataReportAccident(data));
      })
      .catch(error => {
        console.log(error)
        // dispatch(loginActions.logout());
      });
  }
  function storeDataReportAccident(data) { return { type: accidentConstants.GET_DATA_REPORT_ACCIDENT, payload: data } }
}

function getAccidentFilter(ruas_code) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/accident/filter/' + ruas_code, { headers: { 'x-access-token': token } })
      .then(response => {
        const filter = response.data.data
        let data = {}
        // console.log(filter)
        data['cabang'] = filter.ruasCode
        data['day'] = filter.date.day
        data['month'] = filter.date.month
        data['year'] = filter.date.year
        data['shift'] = filter.shift
        data['sta'] = filter.sta
        data['lane'] = filter.lane
        data['lightInjury'] = ['Include', 'Exclude']
        data['heavyInjury'] = ['Include', 'Exclude']
        data['fatality'] = ['Include', 'Exclude']
        data['accidentCause'] = filter.accidentCause
        data['accidentLevel'] = filter.accidentLevel
        data['accidentPosition'] = filter.accidentPosition
        data['accidentType'] = filter.accidentType
        data['accidentWeather'] = filter.accidentWeather

        dispatch(storeDataFilterAccident(data));
      })
      .catch(error => {
        const responseAlert = {
          status: error.status,
          message: error.message
        }
        dispatch(alertActions.errorData(responseAlert));
      });
  };
  function storeDataFilterAccident(data) { return { type: accidentConstants.GET_DATA_FILTER_ACCIDENT, payload: data } }
}

function getAccident(id_ruas) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAccident/' + id_ruas, { headers: { 'x-access-token': token } })
      .then(response => {
        var accident = response.data.data
        var rawDataRuas = []
        var rawDataCount = {}
        var result = []

        rawDataCount['lightInjury'] = 0
        rawDataCount['heavyInjury'] = 0
        rawDataCount['fatality'] = 0

        accident.forEach((value, index) => {

          rawDataRuas[index] = []
          rawDataRuas[index]['ruas'] = value.RUAS_CODE
          rawDataRuas[index]['jumlah'] = value.JUMLAH

          rawDataCount['lightInjury'] += value.LIGHT_INJURY
          rawDataCount['heavyInjury'] += value.HEAVY_INJURY
          rawDataCount['fatality'] += value.FATALITY

        })

        result = {
          countAccident: rawDataCount,
          ruasAccident: rawDataRuas
        }
        dispatch(storeDataAccident(result));
      })
      .catch(error => {
        console.log(error)
        // dispatch(loginActions.logout());
      });
  }
  function storeDataAccident(data) { return { type: accidentConstants.GET_DATA_ACCIDENT, payload: data } }
}

function getAccidentRate(id_ruas) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/accident/rate/' + id_ruas, { headers: { 'x-access-token': token } })
      .then(response => {
        console.log('accidentrate');
        console.log(response);
        let accident = []
        accident['count'] = []
        accident['type'] = []
        accident['accident_rate'] = []
        accident['fatality_rate'] = []
        response.data.data.forEach((val, index) => {
          accident['count'][index] = []
          accident['type'][index] = []
          accident['accident_rate'][index] = []
          accident['fatality_rate'][index] = []
          accident['count'][index]['ID_RUAS'] = val.ID_RUAS
          accident['count'][index]['RUAS_CODE'] = val.RUAS_CODE
          accident['count'][index]['ACCIDENT_COUNT'] = val.COUNT_ACCIDENT
          accident['type'][index]['ID_RUAS'] = val.ID_RUAS
          accident['type'][index]['RUAS_CODE'] = val.RUAS_CODE
          accident['type'][index]['LIGHT_INJURY'] = val.LIGHT_INJURY
          accident['type'][index]['HEAVY_INJURY'] = val.HEAVY_INJURY
          accident['type'][index]['FATALITY'] = val.FATALITY
          accident['accident_rate'][index]['ID_RUAS'] = val.ID_RUAS
          accident['accident_rate'][index]['RUAS_CODE'] = val.RUAS_CODE
          accident['accident_rate'][index]['T_KECELAKAAN'] = val.T_KECELAKAAN
          accident['fatality_rate'][index]['ID_RUAS'] = val.ID_RUAS
          accident['fatality_rate'][index]['RUAS_CODE'] = val.RUAS_CODE
          accident['fatality_rate'][index]['T_KECELAKAAN'] = val.T_FATALITY
        })
        dispatch(storeDataAccidentRate(response.data.data));
      })
      .catch(error => {
        console.log(error)
        // dispatch(loginActions.internalServerError());
      });
  }
  function storeDataAccidentRate(data) { return { type: accidentConstants.GET_DATA_ACCIDENT_RATE, payload: data } }
}