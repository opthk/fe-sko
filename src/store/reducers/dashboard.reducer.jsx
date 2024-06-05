import { dashboardConstant } from '../constants';

const initialState = {
  percentage: {
    percentageDivisi: {
      PROSENTASE_LALIN_MONTHLY: '0 %',
      PROSENTASE_LALIN_YEARLY: '0 %',
      PROSENTASE_TRANSAKSI_MONTHLY: '0 %',
      PROSENTASE_TRANSAKSI_YEARLY: '0 %',
    },
    percentageRuas: [{
      RUAS_CODE: 'Loading'
    }]
  }
}
export function dashboard(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_PERCENTAGE_TRANSACTION_TRAFFIC:
      return {
        percentage: action.payload
      };
    default:
      return state
  }
}