import axios from 'axios';
import { vehicleConstants } from "../constants";
import { config } from "../../config";

export const vehicleActions = {
  getAllVehicle
}

function getAllVehicle() {
  const token = localStorage.getItem('x-access-token');
  return dispatch => {
    axios.get(config.HK_DASHBOARD_GLOBAL_API + '/getVehicle', { headers: { 'x-access-token': token } })
      .then(response => {
        const vehicle = response.data.data
        dispatch(storeDataVehicle(vehicle));
      })
      .catch(error => {
        console.log(error)
      });
  };

  function storeDataVehicle(data) { return { type: vehicleConstants.GET_ALL_VEHICLE, payload: data } }
}
