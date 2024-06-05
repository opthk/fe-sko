import { dashboardConstant } from '../constants';

const initialState = {
  dailyByRealisasi: [],
}

export function dailyDashboardTransactionTrafficByRealisasi(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_TRANSACTION_TRAFFIC_BY_REALISASI:
      return {
        dailyByRealisasi: action.payload,
      };
    default:
      return state
  }
}