import { accidentConstants } from '../constants';

const initialState = []

export function accidentReport(state = initialState, action) {
  switch (action.type) {
    case accidentConstants.GET_DATA_REPORT_ACCIDENT:
      return {
        accidentReport: action.payload
      };
    default:
      return state
  }
}