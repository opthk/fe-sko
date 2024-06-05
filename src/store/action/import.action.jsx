import axios from 'axios';
import { alertActions } from "../action";
import { config } from "../../config";

export const importActions = {
  importExcel,
  importExcelBagiHasil,
  importExcelRencanaTahunan
}

function importExcel(data) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/importExcel', data, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
      .then(response => {
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

function importExcelBagiHasil(data) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/importExcelBagiHasil', data, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
      .then(response => {
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

function importExcelRencanaTahunan(data) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/importExcelRencanaTahunan', data, { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } })
      .then(response => {
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