import axios from 'axios';
import { interferenceConstants } from "../constants";
import { config } from "../../config";

export const interferenceActions = {
  getAllInterference
}

function getAllInterference() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getInterference', { headers: { 'x-access-token': token } })
      .then(response => {
        const interference = response.data.data
        dispatch(storeDataInterference(interference));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataInterference(data) { return { type: interferenceConstants.GET_ALL_INTERFERENCE, payload: data } }
}
