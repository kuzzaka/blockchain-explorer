import {
  call, all, put, takeLatest,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import es6promise from 'es6-promise';
import fetchBlockData from '../services/api';
import { validateQuery } from '../services/utils';

import {
  Types, failure, loadDataSuccess, request,
} from './actions';

es6promise.polyfill();

export function* loadDataSaga(payload) {
  const query = validateQuery(payload.query);
  yield put(request(query));
  yield call(delay, 300);
  try {
    const res = yield call(fetchBlockData, query);
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err, query));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(Types.LOAD_DATA, loadDataSaga),
  ]);
}

export default rootSaga;
