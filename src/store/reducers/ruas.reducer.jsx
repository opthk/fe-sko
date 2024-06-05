import { ruasConstants } from '../constants';

const initialState = {
  ruas: [],
}

export function ruas(state = initialState, action) {
  switch (action.type) {
    case ruasConstants.GET_ALL_RUAS:
      return {
        ruas: action.payload
      };
    default:
      return state
  }
}