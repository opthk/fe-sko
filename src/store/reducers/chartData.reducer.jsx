import { chartConstants } from '../constants';

const initialState = {
  chartData:[],
}

export function chartData(state = initialState, action) {
  switch (action.type) {
    case chartConstants.CHART_DATA:
      return {
        chartData:action.payload
      };
    default:
      return state
  }
}