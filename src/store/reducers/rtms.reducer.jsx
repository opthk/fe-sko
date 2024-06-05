import { rtmsConstants } from '../constants';

const initialState = {
  rtms: [
    {
      ruasCode: 'default',
      a: {
        speed: 0, volume: 0, occupancy: 0
      },
      b: {
        speed: 0, volume: 0, occupancy: 0
      }
    }
  ],
}

export function rtms(state = initialState, action) {
  switch (action.type) {
    case rtmsConstants.GET_DATA_LIVE_RTMS:
      return {
        rtms: action.payload
      };
    default:
      return state
  }
}