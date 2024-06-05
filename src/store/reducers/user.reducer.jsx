import { userConstants } from '../constants';

const initialState = []

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_ALL_USER:
      return {
        list_all_user: action.payload
      };
    case userConstants.USER_STORE_IDENTITY:
      return {
        myIdentity: action.identity,
        myAccess: action.access,
      };
    default:
      return state
  }
}