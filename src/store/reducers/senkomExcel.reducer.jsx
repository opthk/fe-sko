import { senkomConstants } from '../constants';

const initialState = {
  senkomExcel: [],
}

export function senkomExcel(state = initialState, action) {
  switch (action.type) {
    case senkomConstants.GET_EXCEL_SENKOM:
      return {
        senkomExcel:action.payload
      };
    default:
      return state
  }
}