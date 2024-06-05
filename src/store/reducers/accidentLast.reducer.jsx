import { accidentConstants } from '../constants';

const initialState = {
  lastAccident: []
}

export function lastAccident(state = initialState, action) {
  switch (action.type) {
    case accidentConstants.GET_DATA_LAST_ACCIDENT:
      return {
        lastAccident: action.payload
      };
    default:
      return state
  }
}