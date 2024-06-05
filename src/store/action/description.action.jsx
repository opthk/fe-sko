import axios from 'axios';
import { settlementConstant } from "../constants";
import { loginActions } from ".";
import { config } from "../../config";

export const descriptionAction = {
  getSettlementDaily,
  getSettlementMonthly
}

function getSettlementDaily() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var settlementDaily = []
        var rawdata = []
        var res = []
        var today = new Date();
        var dd = today.getDate();
        ruas.forEach(function (value) {
          settlementDaily.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getSettlementdaily/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(settlementDaily)
          .then(function (results) {
            var i = 0
            var j = 0
            var k = 1
            var sum = (r, a) => r.map((b, i) => a[i] + b);
            rawdata['rfs'] = []
            res['rfs'] = []
            res['tanggal'] = []
            rawdata['rfs']['mandiri'] = []
            res['rfs']['mandiri'] = []
            rawdata['rfs']['bca'] = []
            res['rfs']['bca'] = []
            rawdata['rfs']['bri'] = []
            res['rfs']['bri'] = []
            rawdata['rfs']['bni'] = []
            res['rfs']['bni'] = []
            for (i = 0; i < results.length; i++) {
              rawdata['rfs']['mandiri'][i] = []
              rawdata['rfs']['bca'][i] = []
              rawdata['rfs']['bri'][i] = []
              rawdata['rfs']['bni'][i] = []
              for (j = 0; j < results[i].data.data.length; j++) {
                rawdata['rfs']['mandiri'][i].push(results[i].data.data[j].RFSMANDIRI)
                rawdata['rfs']['bca'][i].push(results[i].data.data[j].RFSBCA)
                rawdata['rfs']['bri'][i].push(results[i].data.data[j].RFSBRI)
                rawdata['rfs']['bni'][i].push(results[i].data.data[j].RFSBNI)
              }
            }
            for (k = 1; k <= dd; k++) {
              res['tanggal'].push(k)
            }
            res['rfs']['mandiri'] = rawdata['rfs']['mandiri'].reduce(sum)
            res['rfs']['bca'] = rawdata['rfs']['bca'].reduce(sum)
            res['rfs']['bri'] = rawdata['rfs']['bri'].reduce(sum)
            res['rfs']['bni'] = rawdata['rfs']['bni'].reduce(sum)
            dispatch(storeDataSettelment(res))
          })
      })
  }
  function storeDataSettelment(data) { return { type: settlementConstant.STORE_DAILY_SETTLEMENT, payload: data } }

}