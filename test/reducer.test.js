import * as actions from '../redux/actions';
import reducer, { defaultState } from '../redux/reducer';
import fakeTXData from './stubs/tx-data';


test('reducer', () => {
  expect(reducer(defaultState, actions.failure({ error: true })).error).toEqual({ error: true });
  const stateWithData = reducer(defaultState, actions.loadDataSuccess({ hash: '123asd', tx: fakeTXData }));
  expect(stateWithData.hash).toEqual('123asd');
  expect(stateWithData.tx.length).toEqual(20);
  expect(stateWithData.paginated.length).toEqual(4);
  expect(reducer(stateWithData, actions.paginate(3)).currentPage).toEqual(3);
  expect(reducer(stateWithData, actions.paginate(8)).currentPage).toEqual(1);
  expect(reducer(stateWithData, actions.paginate(-8)).currentPage).toEqual(1);
});

test('XSS escape', () => {
  const stateWithError = reducer(
    defaultState, actions.failure({ error: true }, '<script>alert(123)</script>'),
  );
  expect(stateWithError.hash).toEqual('&lt;script&gt;alert(123)&lt;/script&gt;');
});
