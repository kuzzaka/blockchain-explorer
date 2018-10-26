import { normalizeDate, formatBTCValue, validateQuery } from '../services/utils';

test('normalizeData', () => {
  expect(normalizeDate(1482006384)).toEqual('Sat Dec 17 2016');
});

test('formatBTCValue', () => {
  expect(formatBTCValue(5000000000)).toEqual(50);
  expect(formatBTCValue(11000000)).toEqual(0.11);
  expect(formatBTCValue(undefined)).toEqual(NaN);
});

test('validateQuery', () => {
  expect(validateQuery('<script>alert(123)</script>')).toEqual('&lt;script&gt;alert(123)&lt;/script&gt;');
});
