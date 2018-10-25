import { normalizeDate, formatBTCValue } from '../services/utils';

test('normalizeData', () => {
  expect(normalizeDate(1482006384)).toEqual('Sat Dec 17 2016');
});

test('formatBTCValue', () => {
  expect(formatBTCValue(5000000000)).toEqual(50);
  expect(formatBTCValue(11000000)).toEqual(0.11);
});
