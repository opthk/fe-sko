import axios from 'axios';
import qs from 'qs'

import { chartConstants } from "../constants";
import { config } from "../../config";

export const chartActions = {
  getChartData,
  getChartDataGolongan
}

function getChartData(data) {
  const token = localStorage.getItem('x-access-token');
  var title
  var subTitle
  if (data.type === 'date') {
    title = 'Transaction and Traffic Chart'
    subTitle = data.start_date
  } else if (data.type === 'daily') {
    title = 'Transaction and Traffic Chart Daily'
    subTitle = data.start_date + ' till ' + data.end_date
  } else if (data.type === 'monthly') {
    title = 'Transaction and Traffic Chart Monthly'
    subTitle = data.start_date + ' till ' + data.end_date
  } else if (data.type === 'yearly') {
    title = 'Transaction and Traffic Chart Yearly'
    subTitle = ''
  }
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/getTransactionChart', qs.stringify(data), { headers: { 'x-access-token': token } })
      .then(response => {
        var todayChart = []
        todayChart['title'] = title
        todayChart['subtitle'] = subTitle
        todayChart['timestamp'] = []
        todayChart['hours'] = []
        todayChart['cash_revenue'] = []
        todayChart['cash_traffic'] = []
        todayChart['non_cash_revenue'] = []
        todayChart['non_cash_traffic'] = []
        todayChart['total_revenue'] = []
        todayChart['traffic'] = []
        const data = response.data.data
        data.map((val, index) => {
          todayChart['timestamp'].push(val.DATETIME)
          todayChart['hours'].push(val.HOUR)
          todayChart['cash_revenue'].push(val.cash_revenue)
          todayChart['cash_traffic'].push(val.cash_traffic)
          todayChart['non_cash_revenue'].push(val.non_cash_revenue)
          todayChart['non_cash_traffic'].push(val.non_cash_traffic)
          todayChart['total_revenue'].push(val.total_revenue)
          todayChart['traffic'].push(val.traffic)
          return todayChart
        })

        dispatch(storeData(todayChart));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeData(data) { return { type: chartConstants.TODAY_CHART, payload: data } }
}

function getChartDataGolongan(data) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_DASHBOARD_GLOBAL_API + '/getTransactionByGolongan', qs.stringify(data), { headers: { 'x-access-token': token } })
      .then(response => {
        var chartData = response.data.data
        dispatch(storeData(chartData));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeData(data) { return { type: chartConstants.CHART_DATA, payload: data } }
}