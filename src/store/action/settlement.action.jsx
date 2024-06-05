import axios from 'axios';
import { settlementConstant } from "../constants";
import { config } from "../../config/";

export const settlementAction = {
  getSettlementDaily,
  getSettlementMonthly,
  getSettlementKoran,
  getBagiHasil
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
            res['last_settle'] = []
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
              res['last_settle'][i] = []
              for (j = 0; j < results[i].data.data.length; j++) {
                rawdata['rfs']['mandiri'][i].push(results[i].data.data[j].RFSMANDIRI)
                rawdata['rfs']['bca'][i].push(results[i].data.data[j].RFSBCA)
                rawdata['rfs']['bri'][i].push(results[i].data.data[j].RFSBRI)
                rawdata['rfs']['bni'][i].push(results[i].data.data[j].RFSBNI)

                if (results[i].data.data[j].RFSMANDIRI !== 0 || results[i].data.data[j].RFSBCA !== 0 || results[i].data.data[j].RFSBRI !== 0 || results[i].data.data[j].RFSBNI !== 0) {
                  res['last_settle'][i] = results[i].data.data[j].DAY + '-' + results[i].data.data[j].MONTH
                }
              }
            }
            for (k = 1; k <= dd; k++) {
              res['tanggal'].push(k)
            }

            today = new Date()

            let fillingData = today.getDate()

            for(let h = 1;h<=fillingData;h++){
              rawdata['rfs']['mandiri'].forEach((value,index)=>{
                if(value.length!==fillingData){
                  rawdata['rfs']['mandiri'][index].push(0)
                }
              })
              rawdata['rfs']['bca'].forEach((value,index)=>{
                if(value.length!==fillingData){
                  rawdata['rfs']['bca'][index].push(0)
                }
              })
              rawdata['rfs']['bri'].forEach((value,index)=>{
                if(value.length!==fillingData){
                  rawdata['rfs']['bri'][index].push(0)
                }
              })
              rawdata['rfs']['bni'].forEach((value,index)=>{
                if(value.length!==fillingData){
                  rawdata['rfs']['bni'][index].push(0)
                }
              })
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

function getSettlementMonthly() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
      .then(response => {
        var ruas = response.data.data
        var settlementMonthly = []
        var rawdata = []
        var resultAll = []
        ruas.forEach(function (value) {
          settlementMonthly.push(axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getSettlementMonthly/' + value.ID_RUAS, { headers: { 'x-access-token': token } }))
        });
        axios.all(settlementMonthly)
          .then(function (results) {
            var i = 0
            var j = 0
            rawdata['bank'] = []
            rawdata['ruas'] = []
            rawdata['value'] = []
            rawdata['bank']['mandiri'] = []
            rawdata['bank']['bca'] = []
            rawdata['bank']['bri'] = []
            rawdata['bank']['bni'] = []
            rawdata['bank']['tanggal'] = []
            for (i = 0; i < results.length; i++) {
              rawdata['value'][i] = []
              rawdata['value'][i]['fs'] = []
              rawdata['value'][i]['rfs'] = []
              rawdata['value'][i]['ruas'] = ruas[i].RUAS_CODE
              rawdata['bank']['mandiri'][i] = []
              rawdata['bank']['mandiri'][i]['percent'] = []
              rawdata['bank']['mandiri'][i]['ruas'] = ruas[i].RUAS_CODE
              rawdata['bank']['bca'][i] = []
              rawdata['bank']['bca'][i]['percent'] = []
              rawdata['bank']['bca'][i]['ruas'] = ruas[i].RUAS_CODE
              rawdata['bank']['bri'][i] = []
              rawdata['bank']['bri'][i]['percent'] = []
              rawdata['bank']['bri'][i]['ruas'] = ruas[i].RUAS_CODE
              rawdata['bank']['bni'][i] = []
              rawdata['bank']['bni'][i]['percent'] = []
              rawdata['bank']['bni'][i]['ruas'] = ruas[i].RUAS_CODE
              rawdata['ruas'][i] = []
              rawdata['ruas'][i]['mandiri'] = []
              rawdata['ruas'][i]['bca'] = []
              rawdata['ruas'][i]['bri'] = []
              rawdata['ruas'][i]['bni'] = []
              rawdata['ruas'][i]['ruasName'] = ruas[i].RUAS_NAME
              rawdata['ruas'][i]['ruasCode'] = ruas[i].RUAS_CODE
              var result = results[i].data.data
              for (j = 0; j < result.length; j++) {
                rawdata['value'][i]['fs'].push((result[j].FSMANDIRI + result[j].FSBCA + result[j].FSBRI + result[j].FSBNI))
                rawdata['value'][i]['rfs'].push((result[j].RFSMANDIRI + result[j].RFSBCA + result[j].RFSBRI + result[j].RFSBNI))
                rawdata['bank']['tanggal'].push(result[j].MONTH + '-' + result[j].YEAR)
                rawdata['bank']['mandiri'][i]['percent'].push(Math.round(result[j].RFSMANDIRI / result[j].FSMANDIRI * 100))
                rawdata['bank']['bca'][i]['percent'].push(Math.round(result[j].RFSBCA / result[j].FSBCA * 100))
                rawdata['bank']['bri'][i]['percent'].push(Math.round(result[j].RFSBRI / result[j].FSBRI * 100))
                rawdata['bank']['bni'][i]['percent'].push(Math.round(result[j].RFSBNI / result[j].FSBNI * 100))
                rawdata['ruas'][i]['mandiri'].push(Math.round(result[j].RFSMANDIRI / result[j].FSMANDIRI * 100))
                rawdata['ruas'][i]['bca'].push(Math.round(result[j].RFSBCA / result[j].FSBCA * 100))
                rawdata['ruas'][i]['bri'].push(Math.round(result[j].RFSBRI / result[j].FSBRI * 100))
                rawdata['ruas'][i]['bni'].push(Math.round(result[j].RFSBNI / result[j].FSBNI * 100))
              }
            }
            var resRuasPercentage = []
            rawdata.ruas.map((val, index) => {
              resRuasPercentage[index] = []
              resRuasPercentage[index]['achievement'] = ''
              resRuasPercentage[index]['mandiri'] = []
              resRuasPercentage[index]['bca'] = []
              resRuasPercentage[index]['bri'] = []
              resRuasPercentage[index]['bni'] = []
              resRuasPercentage[index]['ruas'] = val.ruasName
              resRuasPercentage[index]['code'] = val.ruasCode
              let dataMDR = val.mandiri
              let sumMDR = dataMDR.reduce((previous, current) => current += previous);
              resRuasPercentage[index]['mandiri'] = sumMDR / dataMDR.length;
              let dataBCA = val.bca
              let sumBCA = dataBCA.reduce((previous, current) => current += previous);
              resRuasPercentage[index]['bca'] = sumBCA / dataBCA.length;
              let dataBRI = val.bri
              let sumBRI = dataBRI.reduce((previous, current) => current += previous);
              resRuasPercentage[index]['bri'] = sumBRI / dataBRI.length;
              let dataBNI = val.bni
              let sumBNI = dataBNI.reduce((previous, current) => current += previous);
              resRuasPercentage[index]['bni'] = sumBNI / dataBNI.length;
              return resRuasPercentage[index]['achievement'] = Math.round((resRuasPercentage[index]['mandiri'] + resRuasPercentage[index]['bca'] + resRuasPercentage[index]['bri'] + resRuasPercentage[index]['bni']) / 4)
            })
            var bankPercentage = []
            var label = []
            bankPercentage['mandiri'] = []
            label['mandiri'] = []
            bankPercentage['bca'] = []
            label['bca'] = []
            bankPercentage['bri'] = []
            label['bri'] = []
            bankPercentage['bni'] = []
            label['bni'] = []
            rawdata.bank.mandiri.map((val, index) => {
              label['mandiri'][index] = []
              val.percent.map((val, idx) => {
                if (isNaN(val)) {
                  val = 0
                }
                label['mandiri'][index].push(val)
                return bankPercentage['mandiri'].push(val)
              })
              return {}
            })

            var sumarize = (r, a) => r.map((b, i) => (a[i] + b) / label['mandiri'].length);
            label['mandiri'] = label['mandiri'].reduce(sumarize)
            rawdata.bank.bca.map((val, index) => {
              val.percent.map((val, index) => {
                if (isNaN(val)) {
                  val = 0
                }
                return bankPercentage['bca'].push(val)
              })
              return {}
            })
            rawdata.bank.bri.map((val, index) => {
              val.percent.map((val, index) => {
                if (isNaN(val)) {
                  val = 0
                }
                return bankPercentage['bri'].push(val)
              })
              return {}
            })
            rawdata.bank.bni.map((val, index) => {
              val.percent.map((val, index) => {
                if (isNaN(val)) {
                  val = 0
                }
                return bankPercentage['bni'].push(val)
              })
              return {}
            })
            let dataMDR = bankPercentage['mandiri']
            let sumMDR = dataMDR.reduce((previous, current) => current += previous);
            let avgMDR = sumMDR / dataMDR.length;
            let dataBCA = bankPercentage['bca']
            let sumBCA = dataBCA.reduce((previous, current) => current += previous);
            let avgBCA = sumBCA / dataBCA.length;
            let dataBRI = bankPercentage['bri']
            let sumBRI = dataBRI.reduce((previous, current) => current += previous);
            let avgBRI = sumBRI / dataBRI.length;
            let dataBNI = bankPercentage['bni']
            let sumBNI = dataBNI.reduce((previous, current) => current += previous);
            let avgBNI = sumBNI / dataBNI.length;
            resultAll = {
              bankList: {
                mandiri: {
                  percentage: avgMDR,
                },
                bca: {
                  percentage: avgBCA,
                },
                bri: {
                  percentage: avgBRI,
                },
                bni: {
                  percentage: avgBNI,
                },
              },
              ruasList: resRuasPercentage,
              ruasValue: rawdata['value']

            }
            dispatch(storeDataSettelment(resultAll))
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      });
  }
  function storeDataSettelment(data) { return { type: settlementConstant.STORE_MONTHLY_SETTLEMENT, payload: data } }
}

function getSettlementKoran(id_branch) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getSettlementKoran/' + id_branch, { headers: { 'x-access-token': token } })
      .then(response => {
        var settlement = response.data.data
        var bankPercentage = []
        var rekeningBulananAllruas = []
        var ruas = []
        var mandiriFS = 0
        var mandiriRP = 0
        var bcaFS = 0
        var bcaRP = 0
        var bniFS = 0
        var bniRP = 0
        var briFS = 0
        var briRP = 0
        var tunaiFS = 0
        var tunaiRP = 0
        var totalFS = 0
        var totalRP = 0
        var d = new Date()
        var month = d.getMonth() + 1
        settlement.forEach(function (value, index) {
          ruas.push(value.RUAS_CODE)
          mandiriFS += value.FSMANDIRI
          mandiriRP += value.RPMANDIRI
          bcaFS += value.FSBCA
          bcaRP += value.RPBCA
          bniFS += value.FSBNI
          bniRP += value.RPBNI
          briFS += value.FSBRI
          briRP += value.RPBRI
          tunaiFS += value.FSTUNAI
          tunaiRP += value.RPTUNAI
          totalFS += value.FSPENDAPATAN
          totalRP += value.RPPENDAPATAN
          rekeningBulananAllruas[index] = []
          rekeningBulananAllruas[index]['fs'] = []
          rekeningBulananAllruas[index]['rp'] = []
          for (var i = 0; i < month; i++) {
            if (value.MONTH === i + 1) {
              rekeningBulananAllruas[i]['date'] = (i + 1)
              rekeningBulananAllruas[i]['fs'].push(value.FSPENDAPATAN)
              rekeningBulananAllruas[i]['rp'].push(value.RPPENDAPATAN)
            }
          }
        })

        bankPercentage = {
          mandiri: Math.round(mandiriRP / mandiriFS * 100) + '%',
          bca: Math.round(bcaRP / bcaFS * 100) + '%',
          bni: Math.round(bniRP / bniFS * 100) + '%',
          bri: Math.round(briRP / briFS * 100) + '%',
          tunai: Math.round(tunaiRP / tunaiFS * 100) + '%'
        }

        let uniqueRuas = [...new Set(ruas)];
        uniqueRuas = uniqueRuas.sort()
        var dataPerRuas = []
        let bankPercentagePerRuas = []
        uniqueRuas.forEach(function (value1, index1) {
          dataPerRuas[index1] = []
          dataPerRuas[index1]['rekap'] = []
          dataPerRuas[index1]['fs'] = []
          dataPerRuas[index1]['rp'] = []
          dataPerRuas[index1]['ruas_code'] = value1
          bankPercentagePerRuas[index1] = []
          bankPercentagePerRuas[index1]['mandiri'] = []
          bankPercentagePerRuas[index1]['mandiri']['fs'] = []
          bankPercentagePerRuas[index1]['mandiri']['rp'] = []
          bankPercentagePerRuas[index1]['bca'] = []
          bankPercentagePerRuas[index1]['bca']['fs'] = []
          bankPercentagePerRuas[index1]['bca']['rp'] = []
          bankPercentagePerRuas[index1]['bri'] = []
          bankPercentagePerRuas[index1]['bri']['fs'] = []
          bankPercentagePerRuas[index1]['bri']['rp'] = []
          bankPercentagePerRuas[index1]['bni'] = []
          bankPercentagePerRuas[index1]['bni']['fs'] = []
          bankPercentagePerRuas[index1]['bni']['rp'] = []
          bankPercentagePerRuas[index1]['ruas_code'] = value1
          settlement.forEach(function (value2, index2) {
            if (value1 === value2.RUAS_CODE) {
              dataPerRuas[index1]['rekap'].push((value2.RPPENDAPATAN / value2.FSPENDAPATAN * 100))
              dataPerRuas[index1]['fs'].push(Math.round(value2.FSPENDAPATAN))
              dataPerRuas[index1]['rp'].push(Math.round(value2.RPPENDAPATAN))
              bankPercentagePerRuas[index1]['mandiri']['fs'].push(value2.FSMANDIRI)
              bankPercentagePerRuas[index1]['mandiri']['rp'].push(value2.RPMANDIRI)
              bankPercentagePerRuas[index1]['bca']['fs'].push(value2.FSBCA)
              bankPercentagePerRuas[index1]['bca']['rp'].push(value2.RPBCA)
              bankPercentagePerRuas[index1]['bri']['fs'].push(value2.FSBRI)
              bankPercentagePerRuas[index1]['bri']['rp'].push(value2.RPBRI)
              bankPercentagePerRuas[index1]['bni']['fs'].push(value2.FSBNI)
              bankPercentagePerRuas[index1]['bni']['rp'].push(value2.RPBNI)
            }
          })
        })

        var rekeningBulanan = []
        rekeningBulanan['fs'] = []
        rekeningBulanan['rp'] = []
        rekeningBulanan['date'] = []
        rekeningBulananAllruas.forEach(function (value, index) {
          value.fs.filter(function (el) {
            if (el !== null) {
              rekeningBulanan['fs'].push(value.fs.reduce((a, b) => a + b, 0))
              rekeningBulanan['rp'].push(value.rp.reduce((a, b) => a + b, 0))
              rekeningBulanan['date'].push(value.date)
            }
          });
        })
        let uniqueRekening = {
          fs: [...new Set(rekeningBulanan.fs)],
          rp: [...new Set(rekeningBulanan.rp)],
          date: [...new Set(rekeningBulanan.date)],
        }

        uniqueRekening['fs'].push(totalFS)
        uniqueRekening['rp'].push(totalRP)
        uniqueRekening['date'].push('Total')

        var rekeningKoran = {
          dataPerRuas: dataPerRuas,
          rekeningBulanan: uniqueRekening,
          bankPercentage: bankPercentage,
          bankPercentagePerRuas: bankPercentagePerRuas
        }
        dispatch(storeDataRekening(rekeningKoran))
      })
      .catch(error => {
        console.log(error)
      });
  }
  function storeDataRekening(data) { return { type: settlementConstant.STORE_REKENING_KORAN, payload: data } }
}


function getBagiHasil(branch_code) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getRealisasiBagiHasil', { headers: { 'x-access-token': token } })
      .then(response => {
        const realisasiBagiHasil = response.data.data
        dispatch(storeDataRuas(realisasiBagiHasil));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataRuas(data) { return { type: settlementConstant.STORE_REKENING_BAGI_HASIL, payload: data } }
}