import { settlementConstant } from '../constants';

const initialState = {
  bagiHasil: []
}

export function bagiHasilSettlement(state = initialState, action) {
  switch (action.type) {
    case settlementConstant.STORE_REKENING_BAGI_HASIL:
      return {
        bagiHasil: action.payload
      };
    default:
      return state
  }
}