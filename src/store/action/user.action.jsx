import axios from 'axios';
import { userConstants } from "../constants";
import { loginActions } from "../action";
import { alertActions } from "../action";
import { config } from "../../config/";
import qs from 'qs'
import { reset } from 'redux-form';

export const userActions = {
  getMyIdentity,
  checkPassword,
  updatePassword
}

function getMyIdentity() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_USER_PORTAL_API + '/user-access', { headers: { 'x-access-token': token } })
      .then(response => {
        const a = response.data.data.access
        var i;
        var j;
        for (i = 0; i < a.length; i++) {
          a[i]['name'] = a[i].menu_name;
          a[i]['url'] = a[i].menu_url;
          a[i]['icon'] = a[i].menu_icon;
          delete a[i].menu_name;
          delete a[i].menu_url;
          delete a[i].menu_icon;
          if (a[i]['children'].length > 0) {
            for (j = 0; j < a[i]['children'].length; j++) {
              a[i]['children'][j]['name'] = a[i]['children'][j].menu_name;
              a[i]['children'][j]['url'] = a[i]['children'][j].menu_url;
              a[i]['children'][j]['icon'] = a[i]['children'][j].menu_icon;
              delete a[i]['children'][j].menu_name;
              delete a[i]['children'][j].menu_url;
              delete a[i]['children'][j].menu_icon;
            }
          } else {
            delete a[i]['children']
          }
        }
        const filtaeredArr = a.reduce((acc, current) => {
          const x = acc.find(item => item.id_menu === current.id_menu);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        const myAccess = {
          items: filtaeredArr
        }
        const myIdentity = response.data.data.identity
        localStorage.setItem('identity', JSON.stringify(myIdentity))
        dispatch(storeAccessIdentity(myIdentity, myAccess));
        if (response.data.data.identity.branch_code === 'PUSAT') {
          dispatch(getAllRuas());
        }

      })
      .catch(error => {
        console.log(error)
        dispatch(loginActions.logout());
      });
  };

  function storeAccessIdentity(myIdentity, myAccess) { return { type: userConstants.USER_STORE_IDENTITY, identity: myIdentity, access: myAccess } }

  function getAllRuas() {
    return dispatch => {
      axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getAllRuas', { headers: { 'x-access-token': token } })
        .then(response => {
          localStorage.setItem('ruas-list', JSON.stringify(response.data.data))
        })
    }
  }
}

function checkPassword(data) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_USER_PORTAL_API + '/user/get-hash-password', qs.stringify(data), { headers: { 'x-access-token': token } })
      .then(response => {
        const correction = response.data.passwordCorrection
        dispatch(storeDataPasswordCorrection(correction));
      })
  };
  function storeDataPasswordCorrection(data) { return { type: userConstants.PASSWORD_CORRECTION, payload: data } }
}


function updatePassword(data) {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.post(config.HK_USER_PORTAL_API + '/user/update-password', qs.stringify(data), { headers: { 'x-access-token': token } })
      .then(response => {
        dispatch(reset('updatePasswordForm'))
        const responseAlert = {
          status: response.data.status,
          message: response.data.message
        }
        dispatch(alertActions.successData(responseAlert));
      })
      .catch(error => {
        const responseAlert = {
          status: error.status,
          message: error.message
        }
        // console.log(responseAlert)
        dispatch(alertActions.errorData(responseAlert));
      });

  };
}