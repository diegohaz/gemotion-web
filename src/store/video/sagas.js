import { put, fork, take, call } from 'redux-saga/effects'
import * as actions from './actions'

export function* readVideoList(api, { async }) {
  try {
    const list = yield call([api, api.get], '/getAllMovies')
    yield put(actions.videoListReadSuccess(list, async.key))
  } catch (e) {
    yield put(actions.videoListReadFailure(e, async.key))
  }
}

export function* watchVideoListReadRequest(api) {
  while (true) {
    const { meta } = yield take(actions.VIDEO_LIST_READ_REQUEST)
    yield call(readVideoList, api, meta)
  }
}

export default function* ({ api }) {
  yield fork(watchVideoListReadRequest, api)
}
