export const Types = {
  FAILURE: 'FAILURE',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  PAGINATE: 'PAGINATE',
};

export function failure(error, query) {
  return {
    type: Types.FAILURE,
    error,
    query,
  };
}

export function loadData(query) {
  return {
    type: Types.LOAD_DATA,
    query,
  };
}

export function loadDataSuccess(data) {
  return {
    type: Types.LOAD_DATA_SUCCESS,
    data,
  };
}

export function paginate(to) {
  return {
    type: Types.PAGINATE,
    to,
  };
}
