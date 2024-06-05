import axios from 'axios';
import qs from 'qs'

import { history } from '../../routes/history';
import { alertActions } from "./alert.action";
import { userConstants } from "../constants";
import { config } from "../../config";

export const loginActions = {
  login,
  logout,
  internalServerError
}

function login(data) {
  return dispatch => {
    axios.post(config.HK_USER_PORTAL_API + '/login', qs.stringify(data))
      .then(response => {
        localStorage.setItem('x-access-token', response.data.token)
        console.log('%c' + response.data.status, 'color:white;background-color:#95B46A', response.data.message)
        dispatch(successLogin(response.data));
      })
      .catch(error => {
        console.log('%c' + error.response.data.status, 'color:white;background-color:#D33F49', error.response.data.message)
        dispatch(alertActions.error(error.response.data));
      });
  };
  function successLogin(data) { return { type: userConstants.LOGIN_SUCCESS, payload: data } }
}

function logout() {
  history.push('/login')
  localStorage.clear();
  window.location.reload();
  return { type: userConstants.LOGOUT }
}

function internalServerError() {
  history.push('/500')
  localStorage.clear();
  window.location.reload();
  return { type: userConstants.LOGOUT }
}