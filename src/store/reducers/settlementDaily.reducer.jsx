import { settlementConstant } from '../constants';

const initialState = {
  dailySettlement: {
    last_settle:[],
    rfs:[]
  },
}

export function dailySettlement(state = initialState, action) {
  switch (action.type) {
    case settlementConstant.STORE_DAILY_SETTLEMENT:
      return {
        dailySettlement: action.payload
      };
    default:
      return state
  }
}