import { senkomConstants } from '../constants';

const initialState = {
  filter: [],
}

export function senkomFilter(state = initialState, action) {
  switch (action.type) {
    case senkomConstants.GET_DATA_FILTER_SENKOM:
      return {
        filter: action.payload
      };
    default:
      return state
  }
}