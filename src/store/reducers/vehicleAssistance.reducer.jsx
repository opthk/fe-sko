import { vehicleAssistanceConstants } from '../constants';

const initialState = {
  vehicle_assistance: [],
}

export function vehicle_assistance(state = initialState, action) {
  switch (action.type) {
    case vehicleAssistanceConstants.GET_ALL_ASSISTANCE:
      return {
        vehicle_assistance: action.payload
      };
    default:
      return state
  }
}