import { accidentConstants } from '../constants';

const initialState = {
  accident: {
    countAccident: { lightInjury: 0, heavyInjury: 0, fatality: 0 },
    ruasAccident: [{ jumlah: 0, ruas: "loading" }]
  }
}

export function accident(state = initialState, action) {
  switch (action.type) {
    case accidentConstants.GET_DATA_ACCIDENT:
      return {
        accident: action.payload,
      };
    default:
      return state
  }
}