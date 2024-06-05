import { userConstants } from '../constants';

let token = localStorage.getItem('x-access-token');
const initialState = token ? { loggedIn: true } : { loggedIn: false };

export function login(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
      };
    case userConstants.LOGOUT:
      return {
        state: undefined,
        loggedIn: false
      };
    default:
      return state
  }
}