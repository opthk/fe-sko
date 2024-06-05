import axios from 'axios';
import { complainConstants } from "../constants";
import { config } from "../../config";

export const complainActions = {
  getComplainList
}

function getComplainList(id_ruas) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var complainList = []
        var rawData = []
        var sorted
        ruas.forEach(function (value) {
          complainList.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getListComplain/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(complainList)
          .then(response => {
            var i = 0
            var j = 0
            for (i = 0; i < response.length; i++) {
              for (j = 0; j < response[i].data.data.length; j++) {
                rawData.push(response[i].data.data[j])
              }
            }
            sorted = rawData.sort((a, b) => parseFloat(b.event_time) - parseFloat(a.event_time));
            sorted = sorted.slice(Math.max(sorted.length - 5, 1))

            dispatch(storeDataComplain(sorted));
          })
          .catch(error => {
            console.log(error)
            // dispatch(loginActions.logout());
          });
      })
  }
  function storeDataComplain(data) { return { type: complainConstants.GET_COMPLAIN_LIST, payload: data } }
}