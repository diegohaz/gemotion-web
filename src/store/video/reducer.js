import { initialState } from './selectors'
import { VIDEO_LIST_READ_SUCCESS, VIDEO_SELECT } from './actions'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case VIDEO_LIST_READ_SUCCESS:
      return {
        ...state,
        list: payload,
      }
    case VIDEO_SELECT:
      return {
        ...state,
        selected: payload,
      }
    default:
      return state
  }
}
