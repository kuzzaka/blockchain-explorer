import React from 'react';
import { mount, shallow } from 'enzyme';
import TransactionList from '../../components/transaction-list';
import createStore from '../../redux/store';
import txData from '../stubs/tx-data';
import reducer from '../../redux/reducer';
import { loadDataSuccess } from '../../redux/actions';

const normalState = reducer({ currentPage: 1 }, loadDataSuccess({ tx: txData }));

test('TransactionList', () => {
  const store = createStore(normalState);
  const spy = jest.spyOn(store, 'dispatch');
  const wrapper = mount(<TransactionList store={store} />);
  expect(wrapper.find('section')).toExist();
  expect(wrapper.find('.pagination-block')).toExist();
  wrapper.find('.pagination-block button').simulate('click');
  expect(spy).toHaveBeenCalled();
});

test('with next button only TransactionList snapshot', () => {
  const wrapper = shallow(<TransactionList store={createStore(normalState)} />);
  expect(wrapper).toMatchSnapshot();
});

test('with both buttons TransactionList snapshot', () => {
  const store = createStore(reducer({ currentPage: 2 }, loadDataSuccess({ tx: txData })));
  const wrapper = shallow(<TransactionList store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('with only previous button TransactionList snapshot', () => {
  const store = createStore(reducer({ currentPage: 4 }, loadDataSuccess({ tx: txData })));
  const wrapper = shallow(<TransactionList store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('without buttons TransactionList snapshot', () => {
  const store = createStore(reducer({ currentPage: 1 }, loadDataSuccess({ tx: [] })));
  const wrapper = shallow(<TransactionList store={store} />);
  expect(wrapper).toMatchSnapshot();
});
