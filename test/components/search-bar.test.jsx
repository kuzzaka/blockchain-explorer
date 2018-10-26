import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchBar from '../../components/search-bar';
import createStore from '../../redux/store';

const normalState = {
  query: 'hash',
  error: false,
};
const withErrorState = {
  query: 'none',
  error: { error: true },
};

test('SearchBar', () => {
  const store = createStore(normalState);
  const spy = jest.spyOn(store, 'dispatch');
  const wrapper = mount(<SearchBar store={store} />);
  expect(wrapper.find('input')).toExist();
  expect(wrapper.find('input')).toHaveValue('hash');
  wrapper.find('input').simulate('change');
  expect(spy).toHaveBeenCalled();
});

test('normal SearchBar snapshot', () => {
  const wrapper = shallow(<SearchBar store={createStore(normalState)} />);
  expect(wrapper).toMatchSnapshot();
});

test('with error SearchBar snapshot', () => {
  const wrapper = shallow(<SearchBar store={createStore(withErrorState)} />);
  expect(wrapper).toMatchSnapshot();
});
