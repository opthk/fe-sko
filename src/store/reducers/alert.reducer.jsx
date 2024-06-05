import { alertConstants } from '../constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        message: action.response.message
      };
    case alertConstants.ERROR:
      return {
        usernameAlert: action.response.usernameAlert,
        passwordAlert: action.response.passwordAlert,
        message: action.response.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}