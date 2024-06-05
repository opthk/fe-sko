import { dashboardConstant } from '../constants';

const initialState = {
  comparison: {
    lalin: [{
      name: 'Rencana Lalin',
      data: [0]
    }, {
      name: 'Realisasi Lalin',
      data: [0]
    }],
    transaction: [{
      name: 'Rencana Transaksi',
      data: [0]
    }, {
      name: 'Realisasi Transaksi',
      data: [0]
    }],
  }
}
export function comparisonTransaction(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_COMPARISON_TRANSACTION_TRAFFIC_MONTHLY_BY_REALISASI:
      return {
        comparison: action.payload
      };
    default:
      return state
  }
}