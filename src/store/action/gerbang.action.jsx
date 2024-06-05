import axios from 'axios';
import { gerbangConstants } from "../constants";
import { config } from "../../config";

export const gerbangActions = {
  getGerbangByRuas
}

function getGerbangByRuas(id_ruas) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getGerbangByRuas/' + id_ruas, { headers: { 'x-access-token': token } })
      .then(response => {
        const gerbang = response.data.data
        dispatch(storeDataGerbang(gerbang));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataGerbang(data) { return { type: gerbangConstants.GET_GERBANG_BY_RUAS, payload: data } }
}