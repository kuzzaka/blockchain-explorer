import chunk from 'lodash/chunk';
import inRange from 'lodash/inRange';
import { Types } from './actions';

const PER_PAGE = 5;

export const defaultState = {
  hash: '',
  ver: 2,
  prev_block: '',
  mrkl_root: '',
  time: 1432723472,
  bits: 0,
  size: 0,
  mrkl_tree: [],
  next_block: '',
  n_tx: 0,
  tx: [],
  paginated: [],
  currentPage: 1,
  height: 0,
  received_time: 1432723472,
  fee: 0,
  error: false,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case Types.FAILURE:
      return {
        ...state,
        ...{ hash: '' },
        ...{ error: action.error },
      };

    case Types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ error: false },
        ...{ currentPage: 1 },
        ...{ paginated: chunk(action.data.tx, PER_PAGE) },
        ...action.data,
      };

    case Types.PAGINATE:
      return {
        ...state,
        ...{
          currentPage: inRange(action.to - 1, 0, state.paginated.length) ? action.to : 1,
        },
      };
    default:
      return state;
  }
}

export default reducer;
