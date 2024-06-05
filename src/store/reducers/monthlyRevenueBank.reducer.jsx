import { dashboardConstant } from '../constants';

const initialState = {
  monthlyRevenueBank: [{
    TOTAL_TRANSAKSI_BCA: 0,
    TOTAL_TRANSAKSI_BNI: 0,
    TOTAL_TRANSAKSI_BRI: 0,
    TOTAL_TRANSAKSI_MANDIRI: 0,
    TOTAL_TRANSAKSI_TUNAI: 0
  }]
}

export function monthlyRevenueBank(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_BANK_TRANSACTION:
      return {
        monthlyRevenueBank: action.payload
      };
    default:
      return state
  }
}