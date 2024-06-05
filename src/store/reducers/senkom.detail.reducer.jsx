import { senkomConstants } from '../constants';

const initialState = {
  senkom_detail: {
    id_senkom_handling: '',
    id_interference: '',
    branch: '',
    event_time: '',
    shift: '',
    event_clear: '',
    sta: '',
    lane: '',
    id_vehicle: '',
    vehicle_identification: '',
    accident_position: '',
    accident_weather: '',
    accident_type: '',
    accident_cause: '',
    driver_name: '',
    driver_gender: '',
    driver_age: '',
    driver_address: '',
    light_injury: '',
    heavy_injury: '',
    fatality: '',
    chronology: '',
    reporter_name: '',
    information: '',
    vehicle_assistance: []
  }
}

export function senkom_detail(state = initialState, action) {
  switch (action.type) {
    case senkomConstants.DEFAULT:
      return {
        initialState
      };
    case senkomConstants.GET_DATA_SENKOM_BY_ID:
      return {
        senkom_detail: action.payload.detail,
        // senkom_bantuan: action.payload.bantuan,
        // senkom_kecelakaan: action.payload.kecelakaan
      };
    default:
      return state
  }
}