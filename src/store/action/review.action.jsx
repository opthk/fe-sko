import axios from 'axios';
import { reviewConstants } from "../constants";
import { config } from "../../config";

export const reviewActions = {
  getDataReview
}

function getDataReview(id_ruas) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var dataReview = []
        ruas.forEach(function (value) {
          dataReview.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getReview/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(dataReview)
          .then(function (results) {
            var i = 0
            var j = 0
            var rawData = []
            for (i = 0; i < results.length; i++) {
              rawData[i] = []
              rawData[i]['desc'] = []
              rawData[i]['review'] = 0
              rawData[i]['ruas_code'] = ruas[i].RUAS_CODE
              rawData[i]['ruas_name'] = ruas[i].RUAS_NAME
              for (j = 0; j < results[i].data.data.length; j++) {
                rawData[i]['desc'][j] = []
                rawData[i]['desc'][j]['question'] = []
                rawData[i]['desc'][j]['rating'] = []
                rawData[i]['desc'][j]['question'] = results[i].data.data[j].question
                rawData[i]['desc'][j]['rating'] = results[i].data.data[j].percent
                rawData[i]['review'] += results[i].data.data[j].rating
              }
              rawData[i]['review'] = (rawData[i]['review'] / results[i].data.data.length).toFixed(2)
            }
            dispatch(storeDataReview(rawData));
          })
          .catch(error => {
            console.log(error)
          });
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataReview(data) { return { type: reviewConstants.GET_DATA_REVIEW, payload: data } }
}