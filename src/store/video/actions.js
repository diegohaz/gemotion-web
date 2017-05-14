export const VIDEO_LIST_READ = 'VIDEO_LIST_READ'
export const VIDEO_LIST_READ_REQUEST = 'VIDEO_LIST_READ_REQUEST'
export const VIDEO_LIST_READ_SUCCESS = 'VIDEO_LIST_READ_SUCCESS'
export const VIDEO_LIST_READ_FAILURE = 'VIDEO_LIST_READ_FAILURE'

export const videoListReadRequest = () => ({
  type: VIDEO_LIST_READ_REQUEST,
  meta: {
    async: VIDEO_LIST_READ,
  },
})

export const videoListReadSuccess = (list, key) => ({
  type: VIDEO_LIST_READ_SUCCESS,
  payload: list,
  meta: {
    async: { name: VIDEO_LIST_READ, key },
  },
})

export const videoListReadFailure = (error, key) => ({
  type: VIDEO_LIST_READ_FAILURE,
  error: true,
  payload: error,
  meta: {
    async: { name: VIDEO_LIST_READ, key },
  },
})

export const VIDEO_SELECT = 'VIDEO_SELECT'

export const videoSelect = id => ({
  type: VIDEO_SELECT,
  payload: id,
})
