import { actions as toastrActions } from 'react-redux-toastr'
import { alertConstants } from '../constants';

export const alertActions = {
	success,
	error,
	clear,
	successData,
	errorData
};

function successData(req) {
	return dispatch => {
		var alertData = {
			type: req.status,
			title: req.status,
			position: 'top-right',
			attention: true,
			message: req.message,
		}
		dispatch(toastrActions.add(alertData));
		dispatch(toastrActions.remove());
	}
}

function errorData(req) {
	return dispatch => {
		var alertData = {
			type: 'error',
			title: req.status,
			position: 'top-right',
			attention: true,
			message: req.message,
		}
		dispatch(toastrActions.add(alertData));
		dispatch(toastrActions.remove());
	}
}


function success(req) {
	const response = {
		message: req.status + ', ' + req.message
	}
	return { type: alertConstants.SUCCESS, response };
}

function error(req) {

	var usernameErr = '';
	var passwordErr = '';
	req.data.map(res => {
		if (res.param === 'username') {
			usernameErr = res.validation_message;
		}
		if (res.param === 'password') {
			passwordErr = res.validation_message;
		}
		return {}
	})
	const response = {
		usernameAlert: usernameErr,
		passwordAlert: passwordErr,
		message: req.status + ', ' + req.message,
	}
	return { type: alertConstants.ERROR, response };
}

function clear() {
	return { type: alertConstants.CLEAR };
}

