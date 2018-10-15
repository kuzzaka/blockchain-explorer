import { normalizeDate } from '../services/utils';

test('normalizeData', () => {
  expect(normalizeDate(1482006384)).toEqual('Sat Dec 17 2016');
});
