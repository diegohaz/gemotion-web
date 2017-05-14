import { initialState } from './selectors'
import { IMPRESSION_DETAIL_READ_SUCCESS } from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case IMPRESSION_DETAIL_READ_SUCCESS:
      return {
        ...state,
        detail: payload,
      }
    default:
      return state
  }
}
