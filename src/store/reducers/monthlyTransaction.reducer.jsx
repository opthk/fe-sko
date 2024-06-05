import { dashboardConstant } from '../constants';

const initialState = {
  monthlyTransaction: [{data:[]}],
}

export function monthlyTransaction(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_MONTHLY_TRANSACTION:
      return {
        monthlyTransaction:action.payload
      };
    default:
      return state
  }
}