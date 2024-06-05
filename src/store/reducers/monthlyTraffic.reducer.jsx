import { dashboardConstant } from '../constants';

const initialState = []

export function monthlyTraffic(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_MONTHLY_TRAFFIC:
      return {
        monthlyTraffic:action.payload
      };
    default:
      return state
  }
}