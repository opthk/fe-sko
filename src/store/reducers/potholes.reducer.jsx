import { potholesConstants } from '../constants';

const initialState = {
  potholes: [],
}

export function potholes(state = initialState, action) {
  switch (action.type) {
    case potholesConstants.GET_POTHOLES:
      return {
        potholes: action.payload
      };
    case potholesConstants.GET_POTHOLES_BY_OVERVIEW:
      return {
        potholes: action.payload
      };
    default:
      return state
  }
}