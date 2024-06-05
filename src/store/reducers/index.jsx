import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'

import { login } from './login.reducer';
import { alert } from './alert.reducer';
import { user } from './user.reducer';
import { action } from './user.access.reducer';
import { dashboard } from './dashboard.reducer';
import { chart } from './chart.reducer';
import { chartData } from './chartData.reducer';
import { ruas } from './ruas.reducer';
import { gerbang } from './gerbang.reducer';
import { review } from './review.reducer';
import { complain } from './complain.reducer';
import { accident } from './accident.reducer';
import { lastAccident } from './accidentLast.reducer';
import { accidentOption } from './accidentOption.reducer';
import { accidentRate } from './accidentRate.reducer';
import { accidentFilter } from './accident.filter.reducer';
import { accidentReport } from './accident.report.reducer';
import { senkom } from './senkom.reducer';
import { senkom_detail } from './senkom.detail.reducer';
import { senkomFilter } from './senkom.filter.reducer';
import { senkomExcel } from './senkomExcel.reducer';
import { interference } from './interference.reducer';
import { vehicle } from './vehicle.reducer';
import { vehicle_assistance } from './vehicleAssistance.reducer';
import { dailyTransaction } from './dailyTransaction.reducer';
import { dailyTraffic } from './dailyTraffic.reducer';
import { dailySettlement } from './settlementDaily.reducer';
import { dailyDashboardTransactionTrafficByRealisasi } from './dailyDashboardTransactionTraffic.reducer';
import { monthlyDashboardTransactionTrafficByRealisasi } from './monthlyDashboardTransactionTraffic.reducer';
import { monthlyTransaction } from './monthlyTransaction.reducer';
import { monthlyTraffic } from './monthlyTraffic.reducer';
import { monthlySettlement } from './settlementMonthly.reducer';
import { monthlyRevenueBank } from './monthlyRevenueBank.reducer';
import { bagiHasilSettlement } from './settlementBagiHasil.reducer';
import { potholes } from './potholes.reducer';
import { potholes_detail } from './potholesDetail.reducer';
import { passwordChecker } from './passwordChecker.reducer';
import { comparisonTransaction } from './comparisonTransaction.reducer';
import { rtms } from './rtms.reducer';

const rootReducer = combineReducers({
  user,
  action,
  alert,
  login,
  dashboard,
  chart,
  chartData,
  comparisonTransaction,
  ruas,
  gerbang,
  accident,
  accidentOption,
  accidentReport,
  lastAccident,
  accidentRate,
  accidentFilter,
  senkom,
  senkom_detail,
  senkomFilter,
  senkomExcel,
  interference,
  vehicle,
  vehicle_assistance,
  dailyTransaction,
  dailyTraffic,
  dailySettlement,
  dailyDashboardTransactionTrafficByRealisasi,
  monthlyDashboardTransactionTrafficByRealisasi,
  monthlyTransaction,
  monthlyTraffic,
  monthlySettlement,
  monthlyRevenueBank,
  bagiHasilSettlement,
  review,
  complain,
  potholes,
  potholes_detail,
  passwordChecker,
  toastr: toastrReducer,
  form: formReducer,
  rtms
});

export default rootReducer;