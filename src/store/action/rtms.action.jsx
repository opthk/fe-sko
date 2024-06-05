import axios from 'axios';
import { rtmsConstants } from "../constants";
import { config } from "../../config";

export const rtmsActions = {
  getLiveData
}

function getLiveData(branch_code) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/rtms/realTime/' + branch_code, { headers: { 'x-access-token': token } })
      .then(response => {
        dispatch(storeDataRTMS(response.data.data));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataRTMS(data) { return { type: rtmsConstants.GET_DATA_LIVE_RTMS, payload: data } }
}
