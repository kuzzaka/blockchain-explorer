import { call, put } from 'redux-saga/effects';
import { loadDataSaga } from '../redux/saga';
import fetchBlockData from '../services/api';
import { loadData, loadDataSuccess, failure } from '../redux/actions';
import summaryData from './stubs/summary-data';

describe('test successful search', () => {
  const payload = { query: 'hash' };
  const gen = loadDataSaga(loadData(payload));

  test('api call', () => {
    const actual = gen.next().value;
    const expected = call(fetchBlockData, loadData(payload));
    expect(actual).toEqual(expected);
  });

  test('request to be parsed', () => {
    const actual = gen.next({ code: 200, json: () => summaryData }).value;
    const expected = summaryData;
    expect(actual).toEqual(expected);
  });

  test('call success reducer', () => {
    const actual = gen.next(summaryData).value;
    const expected = put(loadDataSuccess(summaryData));
    expect(actual).toEqual(expected);
    expect(gen.next().done).toEqual(true);
  });
});

describe('test error handling', () => {
  const payload = { query: 'none' };
  const gen = loadDataSaga(loadData(payload));

  test('api call', () => {
    const actual = gen.next().value;
    const expected = call(fetchBlockData, loadData(payload));
    expect(actual).toEqual(expected);
  });

  test('error to be caught', () => {
    const error = new TypeError('res.json is not a function');
    const actual = gen.next(error).value;
    const expected = put(failure(error));
    expect(actual).toEqual(expected);
    expect(gen.next().done).toEqual(true);
  });
});
