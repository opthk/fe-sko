import { accidentConstants } from '../constants';

const initialState = {
  accident_cause: [],
  accident_position: [],
  accident_type: [],
  accident_weather: [],
}

export function accidentOption(state = initialState, action) {
  switch (action.type) {
    case accidentConstants.GET_ACCIDENT_OPTION:
      return {
        accident_cause: action.payload.accident_cause,
        accident_position: action.payload.accident_position,
        accident_type: action.payload.accident_type,
        accident_weather: action.payload.accident_weather,
      };
    default:
      return state
  }
}