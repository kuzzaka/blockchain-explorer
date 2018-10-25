import {
  call, all, put, takeLatest,
} from 'redux-saga/effects';
import es6promise from 'es6-promise';
import fetchBlockData from '../services/api';

import { Types, failure, loadDataSuccess } from './actions';

es6promise.polyfill();

export function* loadDataSaga(payload) {
  try {
    const res = yield call(fetchBlockData, payload);
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err, payload.query));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(Types.LOAD_DATA, loadDataSaga),
  ]);
}

export default rootSaga;
