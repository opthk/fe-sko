import axios from 'axios';
import { accidentConstants } from "../constants";
import { config } from "../../config";

export const accidentOptionActions = {
  getAccidentOption
}

function getAccidentOption() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAccidentOption', { headers: { 'x-access-token': token } })
      .then(response => {
        const option = response.data.data
        dispatch(storeAccidentOption(option));
      })
      .catch(error => {
        console.log(error)
        // dispatch(loginActions.logout());
      });
  };

  function storeAccidentOption(data) { return { type: accidentConstants.GET_ACCIDENT_OPTION, payload: data } }
}
