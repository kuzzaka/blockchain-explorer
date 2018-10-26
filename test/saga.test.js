import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { loadDataSaga } from '../redux/saga';
import fetchBlockData from '../services/api';
import {
  loadData, loadDataSuccess, failure, request,
} from '../redux/actions';
import summaryData from './stubs/summary-data';

describe('test successful search', () => {
  const query = 'hash';
  const gen = loadDataSaga(loadData(query));

  test('start request', () => {
    const actual = gen.next().value;
    const expected = put(request(query));
    expect(actual).toEqual(expected);
  });

  test('debounce call', () => {
    const actual = gen.next().value;
    const expected = call(delay, 300);
    expect(actual).toEqual(expected);
  });

  test('api call', () => {
    const actual = gen.next().value;
    const expected = call(fetchBlockData, query);
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
  const query = 'none';
  const gen = loadDataSaga(loadData(query));

  test('start request', () => {
    const actual = gen.next().value;
    const expected = put(request(query));
    expect(actual).toEqual(expected);
  });

  test('debounce call', () => {
    const actual = gen.next().value;
    const expected = call(delay, 300);
    expect(actual).toEqual(expected);
  });

  test('api call', () => {
    const actual = gen.next().value;
    const expected = call(fetchBlockData, query);
    expect(actual).toEqual(expected);
  });

  test('error to be caught', () => {
    const error = new Error('we have an error');
    const actual = gen.throw(error).value;
    const expected = put(failure(error, query));
    expect(actual).toEqual(expected);
    expect(gen.next().done).toEqual(true);
  });
});
