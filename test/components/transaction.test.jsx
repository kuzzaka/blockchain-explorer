import React from 'react';
import { mount, shallow } from 'enzyme';
import Transaction from '../../components/transaction';
import txData from '../stubs/tx-data';

test('Transaction', () => {
  const spy = jest.spyOn(Transaction.prototype, 'toggleWrap');
  const wrapper = mount(<Transaction data={txData[2]} />);
  expect(wrapper.find('article')).toExist();
  expect(wrapper.find('button')).toExist();
  wrapper.find('button').simulate('click');
  expect(spy).toHaveBeenCalled();
});

test('getValueString', () => {
  expect(Transaction.getValueString(txData[2].out[0])).toEqual('0.05640296 BTC');
  expect(Transaction.getValueString({})).toEqual('No value provided in BTC');
});

test('getTotalValueString', () => {
  expect(Transaction.getTotalValueString(txData[2].out)).toEqual('Total transaction value - 0.28269165 BTC');
  expect(Transaction.getTotalValueString([])).toEqual('Total transaction value - 0 BTC');
});

test('with wrapper Transaction snapshot', () => {
  const wrapper = shallow(<Transaction data={txData[2]} />);
  expect(wrapper).toMatchSnapshot();
});

test('without wrapper Transaction snapshot', () => {
  const wrapper = shallow(<Transaction data={txData[0]} />);
  expect(wrapper).toMatchSnapshot();
});
