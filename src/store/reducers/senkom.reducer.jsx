import { senkomConstants } from '../constants';

const initialState = []

export function senkom(state = initialState, action) {
  switch (action.type) {
    case senkomConstants.GET_ALL_DATA_SENKOM:
      return {
        senkom:action.payload
      };
    default:
      return state
  }
}