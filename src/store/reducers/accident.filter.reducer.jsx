import { accidentConstants } from '../constants';

const initialState = {
  filter: {},
}

export function accidentFilter(state = initialState, action) {
  switch (action.type) {
    case accidentConstants.GET_DATA_FILTER_ACCIDENT:
      return {
        filter: action.payload
      };
    default:
      return state
  }
}