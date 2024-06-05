import { reviewConstants } from '../constants';

const initialState = []

export function review(state = initialState, action) {
  switch (action.type) {
    case reviewConstants.GET_DATA_REVIEW:
      return {
        review:action.payload
      };
    default:
      return state
  }
}