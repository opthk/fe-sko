import axios from 'axios';
import { dashboardConstant } from "../constants";
import { config } from "../../config/";

export const dashboardAction = {
  getDashboardTransactionDaily,
  getDashboardTrafficDaily,
  getDashboardTransactionMonthly,
  getDashboardTrafficMonthly,
  getPercentageTransactionTraffic,
  getPercentageTransactionTrafficByRealisasi,
  getPercentageTransactionTrafficDailyByRealisasi,
  getPercentageTransactionTrafficMonthlyByRealisasi,
  getComparisonTransactionMonthly,
  getPercentageTransactionTrafficByEoj,
  getPercentageTransactionTrafficDailyByEoj,
  getPercentageTransactionTrafficMonthlyByEoj,
  getRevenueByBank,
  getLastUpdate
}

function getDashboardTransactionDaily(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {

    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var i = 0
        var j = 0
        var dailyTransaction = []
        var raw = []
        ruas.forEach(function (value) {
          dailyTransaction.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getDataTransactionDaily/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(dailyTransaction)
          .then(function (results) {
            for (i = 0; i < results.length; i++) {
              raw[i] = {}
              raw[i]['data'] = []
              raw[i]['name'] = (ruas[i].RUAS_CODE)
              if (ruas[i].RUAS_CODE !== 'PALINDRA' && ruas[i].RUAS_CODE !== 'BAKTER') { //exception palindra && BAKTER
                for (j = 0; j < results[i].data.data.length; j++) {
                  raw[i]['data'].push(results[i].data.data[j].TOTAL)
                }
              }
            }
            dispatch(storeDailyTransaction(raw));
          })
          .catch(error => {
            console.log(error)
          });
      })
    function storeDailyTransaction(overviewData) { return { type: dashboardConstant.STORE_DAILY_TRANSACTION, payload: overviewData } }
  }
}

function getDashboardTrafficDaily(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var i = 0
        var j = 0
        var dailyTraffic = []
        var raw = []
        ruas.forEach(function (value) {
          dailyTraffic.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getDataTrafficDaily/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(dailyTraffic)
          .then(function (results) {
            for (i = 0; i < results.length; i++) {
              raw[i] = {}
              raw[i]['data'] = []
              raw[i]['name'] = (ruas[i].RUAS_CODE)
              if (ruas[i].RUAS_CODE !== 'PALINDRA') { //exception palindra && BAKTER
                for (j = 0; j < results[i].data.data.length; j++) {
                  raw[i]['data'].push(results[i].data.data[j].TOTAL)
                }
              }
            }
            dispatch(storeDailyTraffic(raw));
          })
          .catch(error => {
            console.log(error)
          });
      })
    function storeDailyTraffic(overviewData) { return { type: dashboardConstant.STORE_DAILY_TRAFFIC, payload: overviewData } }
  }
}

function getDashboardTransactionMonthly(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var i = 0
        var j = 0
        var monthlyTransaction = []
        var raw = []
        ruas.forEach(function (value) {
          monthlyTransaction.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getDataTransactionMonthly/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(monthlyTransaction)
          .then(function (results) {
            for (i = 0; i < results.length; i++) {
              raw[i] = {}
              raw[i]['data'] = []
              raw[i]['name'] = (ruas[i].RUAS_CODE)
              if (ruas[i].RUAS_CODE !== 'PALINDRA' && ruas[i].RUAS_CODE !== 'BAKTER') { //exception palindra && BAKTER
                for (j = 0; j < results[i].data.data.length; j++) {
                  raw[i]['data'].push(results[i].data.data[j].TOTAL)
                }
              }
            }
            dispatch(storeMonthlyTransaction(raw));
          })
          .catch(error => {
            console.log(error)
          });
      })
    function storeMonthlyTransaction(overviewData) { return { type: dashboardConstant.STORE_MONTHLY_TRANSACTION, payload: overviewData } }
  }
}

function getDashboardTrafficMonthly(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var i = 0
        var j = 0
        var monthlyTraffic = []
        var raw = []
        ruas.forEach(function (value) {
          monthlyTraffic.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getDataTrafficMonthly/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(monthlyTraffic)
          .then(function (results) {
            for (i = 0; i < results.length; i++) {
              raw[i] = {}
              raw[i]['data'] = []
              raw[i]['name'] = (ruas[i].RUAS_CODE)
              if (ruas[i].RUAS_CODE !== 'PALINDRA') { //exception palindra && BAKTER
                for (j = 0; j < results[i].data.data.length; j++) {
                  raw[i]['data'].push(results[i].data.data[j].TOTAL)
                }
              }
            }
            dispatch(storeMonthlyTraffic(raw));
          })
          .catch(error => {
            console.log(error)
          });
      })
    function storeMonthlyTraffic(overviewData) { return { type: dashboardConstant.STORE_MONTHLY_TRAFFIC, payload: overviewData } }
  }
}

function getPercentageTransactionTraffic(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    if (typeBranch === 'PUSAT') {
      axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
        .then(response => {
          var ruas = response.data.data
          var i = 0
          var overviewPeriode = []
          ruas.forEach(function (value) {
            overviewPeriode.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getDataTransactionPeriode/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
          });
          axios.all(overviewPeriode)
            .then(function (results) {
              var dataPerRuas = []
              var overviewData = []
              overviewData['monthlyTrans'] = []
              overviewData['yearlyTrans'] = []
              overviewData['monthlyTraf'] = []
              overviewData['yearlyTraf'] = []
              for (i = 0; i < results.length; i++) {
                if (results[i].data.data.branch !== "5") {///////////palindra exception
                  if (results[i].data.data.branch !== "4") {///////////bakter exception
                    overviewData['monthlyTrans'].push(results[i].data.data.transaction_monthly[0].persen)
                    overviewData['yearlyTrans'].push(results[i].data.data.transaction_yearly[0].persen)
                  }
                  overviewData['monthlyTraf'].push(results[i].data.data.transaction_monthly[0].persenLalin)
                  overviewData['yearlyTraf'].push(results[i].data.data.transaction_yearly[0].persenLalin)
                  results[i].data.data.branch = parseInt(results[i].data.data.branch)
                  if (ruas[i].ID_RUAS === results[i].data.data.branch) {
                    dataPerRuas[i] = {
                      month: results[i].data.data.transaction_monthly,
                      year: results[i].data.data.transaction_yearly,
                      ruasName: ruas[i].RUAS_NAME,
                      ruasCode: ruas[i].RUAS_CODE
                    }
                  }
                }
              }
              var monthTotTrans = 0
              var yearTotTrans = 0
              var monthTotTraf = 0
              var yearTotTraf = 0
              monthTotTrans = (overviewData['monthlyTrans'].reduce((a, b) => a + b, 0)) / overviewData['monthlyTrans'].length
              monthTotTraf = (overviewData['monthlyTraf'].reduce((a, b) => a + b, 0)) / overviewData['monthlyTraf'].length
              yearTotTrans = (overviewData['yearlyTrans'].reduce((a, b) => a + b, 0)) / overviewData['yearlyTrans'].length
              yearTotTraf = (overviewData['yearlyTraf'].reduce((a, b) => a + b, 0)) / overviewData['yearlyTraf'].length
              overviewData = {
                monthAvgTrans: monthTotTrans.toFixed(2),
                monthAvgTraf: monthTotTraf.toFixed(2),
                yearAvgTrans: yearTotTrans.toFixed(2),
                yearAvgTraf: yearTotTraf.toFixed(2),
                overViewPerRuas: dataPerRuas
              }
              dispatch(storeDataOverview(overviewData));
            })
            .catch(error => {
              console.log(error)
            });
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      var i = 0
      axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getRuasByCode/' + typeBranch, { headers: { 'x-access-token': token } })
        .then(response1 => {
          var ruas = response1.data.data
          axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getDataTransactionPeriode/' + ruas[0].ID_RUAS, { headers: { 'x-access-token': token } })
            .then(results => {
              var dataPerRuas = []
              var overviewData = []
              overviewData['monthlyTrans'] = []
              overviewData['yearlyTrans'] = []
              overviewData['monthlyTraf'] = []
              overviewData['yearlyTraf'] = []
              for (i = 0; i < results.length; i++) {
                overviewData['monthlyTrans'].push(results[i].data.data.transaction_monthly[0].persen)
                overviewData['yearlyTrans'].push(results[i].data.data.transaction_yearly[0].persen)
                overviewData['monthlyTraf'].push(results[i].data.data.transaction_monthly[0].persenLalin)
                overviewData['yearlyTraf'].push(results[i].data.data.transaction_yearly[0].persenLalin)
                results[i].data.data.branch = parseInt(results[i].data.data.branch)
                if (ruas[i].ID_RUAS === results[i].data.data.branch) {
                  dataPerRuas[i] = {
                    month: results[i].data.data.transaction_monthly,
                    year: results[i].data.data.transaction_yearly,
                    ruasName: ruas[i].RUAS_NAME,
                    ruasCode: ruas[i].RUAS_CODE
                  }
                }
              }
              var monthTotTrans = 0
              var yearTotTrans = 0
              var monthTotTraf = 0
              var yearTotTraf = 0
              for (var x = 0; x < results.length; x++) {
                monthTotTrans += overviewData['monthlyTrans'][x];
                yearTotTrans += overviewData['yearlyTrans'][x];
                monthTotTraf += overviewData['monthlyTraf'][x];
                yearTotTraf += overviewData['yearlyTraf'][x];
              }
              var monthAvgTrans = monthTotTrans / results.length
              var yearAvgTrans = yearTotTrans / results.length
              var monthAvgTraf = monthTotTraf / results.length
              var yearAvgTraf = yearTotTraf / results.length
              overviewData = {
                monthAvgTrans: monthAvgTrans.toFixed(2),
                monthAvgTraf: monthAvgTraf.toFixed(2),
                yearAvgTrans: yearAvgTrans.toFixed(2),
                yearAvgTraf: yearAvgTraf.toFixed(2),
                overViewPerRuas: dataPerRuas
              }
              dispatch(storeDataOverview(overviewData));
            })
        })
    }
  }
  function storeDataOverview(overviewData) { return { type: dashboardConstant.STORE_PERCENTAGE_TRANSACTION_TRAFFIC, payload: overviewData } }
}

function getPercentageTransactionTrafficByRealisasi(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/percentage/bagihasil/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        console.log('tesss');
        console.log(results);
        dispatch(storeDataPercentage(results.data.data));
      })
  }
  function storeDataPercentage(percentage) { return { type: dashboardConstant.STORE_PERCENTAGE_TRANSACTION_TRAFFIC, payload: percentage } }
}

function getPercentageTransactionTrafficByEoj(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/percentage/eoj/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        dispatch(storeDataPercentage(results.data.data));
      })
  }
  function storeDataPercentage(percentage) { return { type: dashboardConstant.STORE_PERCENTAGE_TRANSACTION_TRAFFIC, payload: percentage } }
}

function getPercentageTransactionTrafficDailyByRealisasi(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/daily/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        var raw = {}
        var ruas = []
        results.data.data.forEach((val, index) => {
          ruas.push(results.data.data[index].RUAS_CODE)
        })
        let uniqueRuas = [...new Set(ruas)];
        raw['data_trans'] = []
        raw['data_trafic'] = []
        uniqueRuas.forEach((valRuas, index1) => {
          raw['data_trans'][index1] = {}
          raw['data_trafic'][index1] = {}
          raw['data_trans'][index1]['name'] = valRuas
          raw['data_trafic'][index1]['name'] = valRuas
          raw['data_trans'][index1]['data'] = []
          raw['data_trafic'][index1]['data'] = []
          results.data.data.forEach((valData, index2) => {
            if (valRuas === valData.RUAS_CODE) {
              raw['data_trans'][index1]['data'].push(valData.TRANSACTION_SUMMARY)
              raw['data_trafic'][index1]['data'].push(valData.TRAFFIC_SUMMARY)
            }
          })
        })
        dispatch(storeDataTransactionTrafficByRealisasi(raw));
      })
  }
  function storeDataTransactionTrafficByRealisasi(data) { return { type: dashboardConstant.STORE_TRANSACTION_TRAFFIC_BY_REALISASI, payload: data } }
}

function getPercentageTransactionTrafficDailyByEoj(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/daily/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        var raw = {}
        var ruas = []
        results.data.data.forEach((val, index) => {
          ruas.push(results.data.data[index].RUAS_CODE)
        })
        let uniqueRuas = [...new Set(ruas)];
        raw['data_trans'] = []
        raw['data_trafic'] = []
        uniqueRuas.forEach((valRuas, index1) => {
          raw['data_trans'][index1] = {}
          raw['data_trafic'][index1] = {}
          raw['data_trans'][index1]['name'] = valRuas
          raw['data_trafic'][index1]['name'] = valRuas
          raw['data_trans'][index1]['data'] = []
          raw['data_trafic'][index1]['data'] = []
          results.data.data.forEach((valData, index2) => {
            if (valRuas === valData.RUAS_CODE) {
              raw['data_trans'][index1]['data'].push(valData.TRANSACTION_SUMMARY)
              raw['data_trafic'][index1]['data'].push(valData.TRAFFIC_SUMMARY)
            }
          })
        })
        dispatch(storeDataTransactionTrafficByRealisasi(raw));
      })
  }
  function storeDataTransactionTrafficByRealisasi(data) { return { type: dashboardConstant.STORE_TRANSACTION_TRAFFIC_BY_REALISASI, payload: data } }
}

function getPercentageTransactionTrafficMonthlyByRealisasi(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/monthly/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        var raw = {}
        var ruas = []
        results.data.data.forEach((val, index) => {
          ruas.push(results.data.data[index].RUAS_CODE)
        })
        let uniqueRuas = [...new Set(ruas)];
        raw['data_trans'] = []
        raw['data_trafic'] = []
        uniqueRuas.forEach((valRuas, index1) => {
          raw['data_trans'][index1] = {}
          raw['data_trafic'][index1] = {}
          raw['data_trans'][index1]['name'] = valRuas
          raw['data_trafic'][index1]['name'] = valRuas
          raw['data_trans'][index1]['data'] = []
          raw['data_trafic'][index1]['data'] = []
          results.data.data.forEach((valData, index2) => {
            if (valRuas === valData.RUAS_CODE) {
              raw['data_trans'][index1]['data'].push(valData.TRANSACTION_SUMMARY)
              raw['data_trafic'][index1]['data'].push(valData.TRAFFIC_SUMMARY)
            }
          })
          raw['data_trans'][index1]['data'].push(raw['data_trans'][index1]['data'].reduce((a, b) => a + b, 0))
          raw['data_trafic'][index1]['data'].push(raw['data_trafic'][index1]['data'].reduce((a, b) => a + b, 0))
        })
        dispatch(storeMonthlyDataTransactionTrafficByRealisasi(raw));
      })
  }
  function storeMonthlyDataTransactionTrafficByRealisasi(data) { return { type: dashboardConstant.STORE_TRANSACTION_TRAFFIC_MONTHLY_BY_REALISASI, payload: data } }
}

function getPercentageTransactionTrafficMonthlyByEoj(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/monthly/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        var raw = {}
        var ruas = []
        results.data.data.forEach((val, index) => {
          ruas.push(results.data.data[index].RUAS_CODE)
        })
        let uniqueRuas = [...new Set(ruas)];
        raw['data_trans'] = []
        raw['data_trafic'] = []
        uniqueRuas.forEach((valRuas, index1) => {
          raw['data_trans'][index1] = {}
          raw['data_trafic'][index1] = {}
          raw['data_trans'][index1]['name'] = valRuas
          raw['data_trafic'][index1]['name'] = valRuas
          raw['data_trans'][index1]['data'] = []
          raw['data_trafic'][index1]['data'] = []
          results.data.data.forEach((valData, index2) => {
            if (valRuas === valData.RUAS_CODE) {
              raw['data_trans'][index1]['data'].push(valData.TRANSACTION_SUMMARY)
              raw['data_trafic'][index1]['data'].push(valData.TRAFFIC_SUMMARY)
            }
          })
          raw['data_trans'][index1]['data'].push(raw['data_trans'][index1]['data'].reduce((a, b) => a + b, 0))
          raw['data_trafic'][index1]['data'].push(raw['data_trafic'][index1]['data'].reduce((a, b) => a + b, 0))
        })
        dispatch(storeMonthlyDataTransactionTrafficByRealisasi(raw));
      })
  }
  function storeMonthlyDataTransactionTrafficByRealisasi(data) { return { type: dashboardConstant.STORE_TRANSACTION_TRAFFIC_MONTHLY_BY_REALISASI, payload: data } }
}

function getComparisonTransactionMonthly(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  var raw = {}
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/comparison/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        raw['lalin'] = []
        raw['lalin'][0] = {}
        raw['lalin'][0]['name'] = 'Rencana Lalin'
        raw['lalin'][0]['data'] = []
        raw['lalin'][1] = {}
        raw['lalin'][1]['name'] = 'Realisasi Lalin'
        raw['lalin'][1]['data'] = []
        raw['transaction'] = []
        raw['transaction'][0] = {}
        raw['transaction'][0]['name'] = 'Rencana Transaksi'
        raw['transaction'][0]['data'] = []
        raw['transaction'][1] = {}
        raw['transaction'][1]['name'] = 'Realisasi Transaksi'
        raw['transaction'][1]['data'] = []
        results.data.data.forEach((val, index) => {
          raw['lalin'][0]['data'].push(val.RENCANA_LALIN)
          raw['lalin'][1]['data'].push(val.REALISASI_LALIN)
          raw['transaction'][0]['data'].push(val.RENCANA)
          raw['transaction'][1]['data'].push(val.REALISASI)
        })
        dispatch(storeComparison(raw));
      })
  }
  function storeComparison(data) { return { type: dashboardConstant.STORE_COMPARISON_TRANSACTION_TRAFFIC_MONTHLY_BY_REALISASI, payload: data } }

}


function getRevenueByBank(typeBranch) {
  const token = localStorage.getItem('x-access-token');
  var raw = {}
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/transaction/bank/' + typeBranch, { headers: { 'x-access-token': token } })
      .then(function (results) {
        dispatch(storeBankTransaction(results.data.data));
      })
  }
  function storeBankTransaction(data) { return { type: dashboardConstant.STORE_BANK_TRANSACTION, payload: data } }

}

function getLastUpdate() {
  const token = localStorage.getItem('x-access-token');
  return axios.get(config.HK_DASHBOARD_GLOBAL_API + '/dashboard/lastUpdate', { headers: { 'x-access-token': token } })
    .then(function (results) {
      return results.data.data
    })
}
