import { gerbangConstants } from '../constants';

const initialState = []

export function gerbang(state = initialState, action) {
  switch (action.type) {
    case gerbangConstants.GET_GERBANG_BY_RUAS:
      return {
        gerbang:action.payload
      };
    default:
      return state
  }
}