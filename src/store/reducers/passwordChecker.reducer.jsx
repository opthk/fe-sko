import { userConstants } from '../constants';

const initialState = {
  passwordChecker: false,
}

export function passwordChecker(state = initialState, action) {
  switch (action.type) {
    case userConstants.PASSWORD_CORRECTION:
      return {
        passwordChecker: action.payload
      };
    default:
      return state
  }
}