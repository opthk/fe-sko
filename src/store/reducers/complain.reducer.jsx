import { complainConstants } from '../constants';

const initialState = []

export function complain(state = initialState, action) {
  switch (action.type) {
    case complainConstants.GET_COMPLAIN_LIST:
      return {
        complainList:action.payload
      };
    default:
      return state
  }
}