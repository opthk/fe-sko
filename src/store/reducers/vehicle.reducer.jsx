import { vehicleConstants } from '../constants';

const initialState = {
  vehicle: [],
}

export function vehicle(state = initialState, action) {
  switch (action.type) {
    case vehicleConstants.GET_ALL_VEHICLE:
      return {
        vehicle: action.payload
      };
    default:
      return state
  }
}