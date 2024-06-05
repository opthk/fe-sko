import { userConstants } from '../constants';

const initialState = {
  action: [],
}

export function action(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_USER_ACTION:
      return {
        action: action.payload
      };
    default:
      return state
  }
}