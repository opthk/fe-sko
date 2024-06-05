import { dashboardConstant } from '../constants';

const initialState = []

export function dashboardDaily(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_DAILY_TRANSACTION_OVERVIEW:
      return {
        overviewDaily: action.daily,
        listRuas: action.ruas,
      };
    default:
      return state
  }
}