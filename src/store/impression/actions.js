export const IMPRESSION_DETAIL_READ = 'IMPRESSION_DETAIL_READ'
export const IMPRESSION_DETAIL_READ_REQUEST = 'IMPRESSION_DETAIL_READ_REQUEST'
export const IMPRESSION_DETAIL_READ_SUCCESS = 'IMPRESSION_DETAIL_READ_SUCCESS'
export const IMPRESSION_DETAIL_READ_FAILURE = 'IMPRESSION_DETAIL_READ_FAILURE'

export const impressionDetailReadRequest = videoId => ({
  type: IMPRESSION_DETAIL_READ_REQUEST,
  payload: {
    videoId,
  },
  meta: {
    async: IMPRESSION_DETAIL_READ,
  },
})

export const impressionDetailReadSuccess = (detail, key) => ({
  type: IMPRESSION_DETAIL_READ_SUCCESS,
  payload: detail,
  meta: {
    async: { name: IMPRESSION_DETAIL_READ, key },
  },
})

export const impressionDetailReadFailure = (error, key) => ({
  type: IMPRESSION_DETAIL_READ_FAILURE,
  error: true,
  payload: error,
  meta: {
    async: { name: IMPRESSION_DETAIL_READ, key },
  },
})
