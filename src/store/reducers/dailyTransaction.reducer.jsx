import { dashboardConstant } from '../constants';

const initialState = {
  dailyTransaction: [{data:[]}],
}

export function dailyTransaction(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_DAILY_TRANSACTION:
      return {
        dailyTransaction:action.payload
      };
    default:
      return state
  }
}