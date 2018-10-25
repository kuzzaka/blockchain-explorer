import * as actions from '../redux/actions';

test('actions', () => {
  expect(actions.paginate(2)).toEqual({ type: actions.Types.PAGINATE, to: 2 });
  expect(actions.loadData('search')).toEqual({ type: actions.Types.LOAD_DATA, query: 'search' });
  expect(actions.loadDataSuccess({ hash: '123' })).toEqual({ type: actions.Types.LOAD_DATA_SUCCESS, data: { hash: '123' } });
  expect(actions.failure({ error: 'broken', query: 'search' }))
    .toEqual({ type: actions.Types.FAILURE, error: { error: 'broken', query: 'search' } });
});
