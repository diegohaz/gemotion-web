import { put, fork, take, call } from 'redux-saga/effects'
import * as actions from './actions'

export function* readImpressionDetail(api, { videoId }, { async }) {
  try {
    const detail = yield call([api, api.get], `/getAllSections/?video_id=${videoId}`)
    yield put(actions.impressionDetailReadSuccess(detail, async.key))
  } catch (e) {
    yield put(actions.impressionDetailReadFailure(e, async.key))
  }
}

export function* watchImpressionDetailReadRequest(api) {
  while (true) {
    const { payload, meta } = yield take(actions.IMPRESSION_DETAIL_READ_REQUEST)
    yield call(readImpressionDetail, api, payload, meta)
  }
}

export default function* ({ api }) {
  yield fork(watchImpressionDetailReadRequest, api)
}
