import axios from 'axios';
import { ruasConstants } from "../constants";
import { config } from "../../config";

export const ruasActions = {
  getAllRuas,
  getRuasByCode
}

function getAllRuas() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        const ruas = response.data.data
        dispatch(storeDataRuas(ruas));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataRuas(data) { return { type: ruasConstants.GET_ALL_RUAS, payload: data } }
}

function getRuasByCode(branchCode) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getRuasByCode/' + branchCode, { headers: { 'x-access-token': token } })
      .then(response => {
        const ruas = response.data.data
        dispatch(storeDataRuas(ruas));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataRuas(data) { return { type: ruasConstants.GET_ALL_RUAS, payload: data } }
}
