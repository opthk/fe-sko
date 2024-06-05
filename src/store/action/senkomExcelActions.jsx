import axios from 'axios';
import { senkomConstants } from "../constants";
import { config } from "../../config";
import qs from 'qs'

export const senkomExcelActions = {
  getExcelSenkom,
  getExcelAccident
}

function getExcelSenkom(senkom_filter) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/getSenkomExcel', qs.stringify(senkom_filter), { headers: { 'x-access-token': token } })
      .then(response => {
        const senkomExcel = response.data.data
        dispatch(storeExcelSenkom(senkomExcel));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeExcelSenkom(data) { return { type: senkomConstants.GET_EXCEL_SENKOM, payload: data } }
}

function getExcelAccident(senkom_filter) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/getAccidentExcel', qs.stringify(senkom_filter), { headers: { 'x-access-token': token } })
      .then(response => {
        const accidentExcel = response.data.data
        dispatch(storeExcelSenkom(accidentExcel));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeExcelSenkom(data) { return { type: senkomConstants.GET_EXCEL_SENKOM, payload: data } }
}
