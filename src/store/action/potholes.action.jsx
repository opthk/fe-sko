import axios from 'axios';
import { alertActions } from "../action";
import { potholesConstants } from "../constants";
import { config } from "../../config";
import qs from 'qs'

export const potholesActions = {
  getPotholes,
  createDataPotholes,
  updateDataPotholes,
  getDataPotholes,
  getPotholesOverview
}

function createDataPotholes(data_potholes, branch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/createDatapotholes', qs.stringify(data_potholes), { headers: { 'x-access-token': token } })
      .then(response => {
        dispatch(potholesActions.getPotholes(branch));
        const responseAlert = {
          status: response.data.status,
          message: response.data.message
        }
        dispatch(alertActions.successData(responseAlert));
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

function updateDataPotholes(data_potholes, branch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/updateDatapotholes', qs.stringify(data_potholes), { headers: { 'x-access-token': token } })
      .then(response => {
        dispatch(potholesActions.getPotholes(branch));
        const responseAlert = {
          status: response.data.status,
          message: response.data.message
        }
        dispatch(alertActions.successData(responseAlert));
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

function getPotholes(ruas_code) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getPotHoles/' + ruas_code, { headers: { 'x-access-token': token } })
      .then(response => {
        const potholes = response.data.data
        var data = [];
        var i = 0;
        for (i = 0; i < potholes.length; i++) {
          data[i] = []
          var day = new Date(potholes[i].TANGGAL_TEMUAN);
          var nextDay = new Date(day);
          var c = nextDay.setDate(day.getDate() + 2);
          var d = new Date(c);
          var e = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2)
          var dueDate
          if (Date.parse(potholes[i].DATE_TANGGAL_PERBAIKAN) > Date.parse(e) || potholes[i].DATE_TANGGAL_PERBAIKAN === '0000-00-00') {
            dueDate = potholes[i].PRIORITY + '- Due Date'
          } else {
            dueDate = potholes[i].PRIORITY
          }
          data[i].push(
            i + 1,
            potholes[i].RUAS_CODE,
            potholes[i].KM + ' ' + potholes[i].LANE,
            potholes[i].TANGGAL_TEMUAN,
            potholes[i].TANGGAL_PERBAIKAN,
            potholes[i].PRIORITY,
            dueDate,
            potholes[i].PROGRESS + " %",
            potholes[i].ID_POTHOLES,
          )
        }
        dispatch(storeDataPotholes(data));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataPotholes(data) { return { type: potholesConstants.GET_POTHOLES, payload: data } }
}

function getDataPotholes(id_potholes) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getPotHolesById/' + id_potholes, { headers: { 'x-access-token': token } })
      .then(response => {
        const potholes = response.data.data
        dispatch(storeDataPotholes(potholes));
      })
      .catch(error => {
        console.log(error)
      });
  };
  function storeDataPotholes(data) { return { type: potholesConstants.GET_POTHOLES_BY_ID, payload: data } }
}

function getPotholesOverview(branch_id) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/potholes/overview/' + branch_id, { headers: { 'x-access-token': token } })
      .then(response => {
        const potholes = response.data.data
        dispatch(storeDataPotholesOverview(potholes));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataPotholesOverview(data) { return { type: potholesConstants.GET_POTHOLES_BY_OVERVIEW, payload: data } }
}