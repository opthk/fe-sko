import { dashboardConstant } from '../constants';

const initialState = {
  monthlyByRealisasi: [],
}

export function monthlyDashboardTransactionTrafficByRealisasi(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_TRANSACTION_TRAFFIC_MONTHLY_BY_REALISASI:
      return {
        monthlyByRealisasi: action.payload,
      };
    default:
      return state
  }
}