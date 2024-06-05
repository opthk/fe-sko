import { settlementConstant } from '../constants';

const initialState = {
  settlementByBankMonthly: [],
  settlementByRuasMonthly: [],
  settlementByRuasValue: [],
  dataPerRuas: [],
  rekeningBulanan: {
    date: []
  },
  bankPercentage: [],
  bankPercentagePerRuas: []
}

export function monthlySettlement(state = initialState, action) {
  switch (action.type) {
    case settlementConstant.STORE_MONTHLY_SETTLEMENT:
      return {
        settlementByBankMonthly: action.payload.bankList,
        settlementByRuasMonthly: action.payload.ruasList,
        settlementByRuasValue: action.payload.ruasValue,
        dataPerRuas: [],
        rekeningBulanan: {
          date: []
        },
        bankPercentage: [],
        bankPercentagePerRuas: []
      };
    case settlementConstant.STORE_REKENING_KORAN:
      return {
        settlementByBankMonthly: [],
        settlementByRuasMonthly: [],
        settlementByRuasValue: [],
        dataPerRuas: action.payload.dataPerRuas,
        rekeningBulanan: action.payload.rekeningBulanan,
        bankPercentage: action.payload.bankPercentage,
        bankPercentagePerRuas: action.payload.bankPercentagePerRuas,
      };

    default:
      return state
  }
}