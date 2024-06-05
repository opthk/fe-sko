import { potholesConstants } from '../constants';

const initialState = {
  potholes_detail: [],
}

export function potholes_detail(state = initialState, action) {
  switch (action.type) {
    case potholesConstants.GET_POTHOLES_BY_ID:
      return {
        potholes_detail:action.payload
      };
    default:
      return state
  }
}