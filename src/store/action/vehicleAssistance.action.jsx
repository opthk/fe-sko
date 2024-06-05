import axios from 'axios';
import { vehicleAssistanceConstants } from "../constants";
import { config } from "../../config";

export const vehicleAssistanceActions = {
  getAllAssistance
}

function getAllAssistance() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllAssistance', { headers: { 'x-access-token': token } })
      .then(response => {
        const assistance = response.data.data
        dispatch(storeDataAssistances(assistance));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataAssistances(data) { return { type: vehicleAssistanceConstants.GET_ALL_ASSISTANCE, payload: data } }
}
