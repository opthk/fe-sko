import axios from 'axios';
import { userConstants } from "../constants";
import { config } from "../../config";
import { loginActions } from "../action";

export const accessActions = {
  getAccessByPath
}

function getAccessByPath(pathName, idGroup) {
  const token = localStorage.getItem('x-access-token');
  var query = {
    params: {
      path: pathName,
      idGroup: idGroup
    },
    headers: { 'x-access-token': token },
    'Content-Type': 'application/json'
  }
  return dispatch => {
    axios.get(config.HK_USER_PORTAL_API + '/user-access/pathname', query)
      .then(response => {
        var action = response.data.data
        dispatch(storeAction(action));
      })
      .catch(error => {
        console.log(error)
        dispatch(loginActions.logout());
      });
  };
  function storeAction(data) { return { type: userConstants.GET_USER_ACTION, payload: data } }
}

