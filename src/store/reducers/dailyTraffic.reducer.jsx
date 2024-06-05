import { dashboardConstant } from '../constants';

const initialState = {
  dailyTraffic: [{data:[]}],
}

export function dailyTraffic(state = initialState, action) {
  switch (action.type) {
    case dashboardConstant.STORE_DAILY_TRAFFIC:
      return {
        dailyTraffic:action.payload
      };
    default:
      return state
  }
}