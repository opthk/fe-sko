import { accidentConstants } from '../constants';

const initialState = {
  rate: [{
    COUNT_ACCIDENT: 0,
    FATALITY: 0,
    HEAVY_INJURY: 0,
    ID_RUAS: 0,
    LIGHT_INJURY: 0,
    RUAS_CODE: "",
    SECTION_LENGTH: 0,
    T_FATALITY: 0,
    T_KECELAKAAN: 0,
  }]
}

export function accidentRate(state = initialState, action) {
  switch (action.type) {
    case accidentConstants.GET_DATA_ACCIDENT_RATE:
      return {
        rate: action.payload,
      };
    default:
      return state
  }
}