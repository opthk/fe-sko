import { interferenceConstants } from '../constants';

const initialState = {
  interference: [],
}

export function interference(state = initialState, action) {
  switch (action.type) {
    case interferenceConstants.GET_ALL_INTERFERENCE:
      return {
        interference: action.payload
      };
    default:
      return state
  }
}