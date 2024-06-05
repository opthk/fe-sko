import { chartConstants } from '../constants';

const initialState = {
  timestamp:[],
  hours:[],
  cash_revenue:[],
  cash_traffic:[],
  non_cash_revenue:[],
  non_cash_traffic:[],
  total_revenue:[],
  traffic:[],
  title:[],
  subtitle:[],
}

export function chart(state = initialState, action) {
  switch (action.type) {
    case chartConstants.TODAY_CHART:
      return {
        timestamp:action.payload.timestamp,
        hours:action.payload.hours,
        cash_revenue:action.payload.cash_revenue,
        cash_traffic:action.payload.cash_traffic,
        non_cash_revenue:action.payload.non_cash_revenue,
        non_cash_traffic:action.payload.non_cash_traffic,
        total_revenue:action.payload.total_revenue,
        traffic:action.payload.traffic,
        title:action.payload.title,
        subtitle:action.payload.subtitle,
      };
    default:
      return state
  }
}